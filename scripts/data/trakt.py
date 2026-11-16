"""
pulls my trakt history into src/data/movies.json (films) and src/data/tv.json (shows).

  TRAKT_USER=myname TRAKT_CLIENT_ID=xxx python3 scripts/data/trakt.py

client id: trakt.tv > settings > your api apps > new application
(redirect uri can be urn:ietf:wg:oauth:2.0:oob). the profile must be public.

posters come from trakt itself. if trakt doesn't have one, shows fall back to
tvmaze (no key needed) and films to tmdb if TMDB_API_KEY is set.
"""
import json
import os
import time
from datetime import date

import requests

MOVIES = "src/data/movies.json"
TV = "src/data/tv.json"


def load(path):
    if os.path.exists(path):
        with open(path, encoding="utf-8") as f:
            return json.load(f)
    return {"updated": None, "items": []}


def save(path, items):
    if items != load(path)["items"]:
        with open(path, "w", encoding="utf-8") as f:
            json.dump({"updated": date.today().isoformat(), "items": items}, f, indent=1, ensure_ascii=False)


def trakt_poster(media):
    posters = (media.get("images") or {}).get("poster") or []
    if not posters:
        return None
    url = posters[0]
    return url if url.startswith("http") else f"https://{url}"


class Posters:
    # remembers lookups between runs so tvmaze/tmdb only get asked about new things
    def __init__(self, *paths):
        self.cache = {}
        for p in paths:
            for x in load(p)["items"]:
                if x.get("posterKey") and x.get("poster"):
                    self.cache[x["posterKey"]] = x["poster"]
        self.http = requests.Session()
        self.tmdb_key = os.environ.get("TMDB_API_KEY")

    def show(self, show):
        ids = show.get("ids", {})
        key = f"show-{ids.get('trakt')}"
        if key not in self.cache:
            url = trakt_poster(show)
            if not url:
                try:
                    params = {"imdb": ids["imdb"]} if ids.get("imdb") else {"thetvdb": ids.get("tvdb")}
                    r = self.http.get("https://api.tvmaze.com/lookup/shows", params=params, timeout=10)
                    url = ((r.json() or {}).get("image") or {}).get("medium") if r.ok else None
                    time.sleep(0.6)
                except (requests.RequestException, ValueError):
                    url = None
            self.cache[key] = url
        return key, self.cache[key]

    def movie(self, movie):
        ids = movie.get("ids", {})
        key = f"movie-{ids.get('trakt')}"
        if key not in self.cache:
            url = trakt_poster(movie)
            if not url and self.tmdb_key and ids.get("tmdb"):
                try:
                    r = self.http.get(f"https://api.themoviedb.org/3/movie/{ids['tmdb']}", params={"api_key": self.tmdb_key}, timeout=10)
                    path = r.json().get("poster_path") if r.ok else None
                    url = f"https://image.tmdb.org/t/p/w342{path}" if path else None
                except (requests.RequestException, ValueError):
                    url = None
            self.cache[key] = url
        return key, self.cache[key]


def movies(s, user, posters):
    # one entry per film. when i watched it isn't kept, i backlog stuff whenever and the dates mean nothing
    ratings = {r["movie"]["ids"]["trakt"]: r["rating"] for r in s.get(f"https://api.trakt.tv/users/{user}/ratings/movies", timeout=30).json()}
    watched = s.get(f"https://api.trakt.tv/users/{user}/watched/movies", params={"extended": "full,images"}, timeout=30)
    watched.raise_for_status()
    items = []
    for w in watched.json():
        m = w["movie"]
        tid = m["ids"]["trakt"]
        key, poster = posters.movie(m)
        rating = ratings.get(tid)
        items.append({
            "id": f"trakt-{tid}",
            "title": m["title"],
            "year": m.get("year"),
            "released": m.get("released"),
            "rating": rating / 2 if rating else None,
            "rewatch": (w.get("plays") or 1) > 1,
            "liked": bool(rating and rating >= 9),
            "poster": poster,
            "posterKey": key,
            "url": f"https://trakt.tv/movies/{m['ids'].get('slug')}",
        })
    items.sort(key=lambda x: (x["released"] or str(x["year"] or ""), x["title"]), reverse=True)
    return items


def shows(s, user, posters):
    ratings = {r["show"]["ids"]["trakt"]: r["rating"] for r in s.get(f"https://api.trakt.tv/users/{user}/ratings/shows", timeout=30).json()}
    watched = s.get(f"https://api.trakt.tv/users/{user}/watched/shows", params={"extended": "full,images"}, timeout=30)
    watched.raise_for_status()
    items = []
    for w in watched.json():
        show = w["show"]
        ids = show.get("ids", {})
        seen = sum(len(season.get("episodes", [])) for season in w.get("seasons", []) if season.get("number", 1) > 0)
        aired = show.get("aired_episodes") or 0
        status = "completed" if aired and seen >= aired else "watching"
        key, poster = posters.show(show)
        items.append({
            "title": show["title"],
            "year": show.get("year"),
            "poster": poster,
            "posterKey": key,
            "url": f"https://trakt.tv/shows/{ids.get('slug')}",
            "status": status,
            "progress": seen,
            "total": aired or None,
            "minutes": seen * (show.get("runtime") or 0),
            "score": ratings.get(ids.get("trakt")),
            "released": (show.get("first_aired") or "")[:10] or None,
        })
    items.sort(key=lambda x: (x["released"] or str(x["year"] or ""), x["title"]), reverse=True)
    return items


def main():
    user = os.environ.get("TRAKT_USER")
    client = os.environ.get("TRAKT_CLIENT_ID")
    if not user or not client:
        missing = " and ".join(n for n, v in (("TRAKT_USER variable", user), ("TRAKT_CLIENT_ID secret", client)) if not v)
        print(f"::warning::trakt skipped, the {missing} isn't set in the repo settings")
        return

    s = requests.Session()
    s.headers.update({"trakt-api-key": client, "trakt-api-version": "2", "Content-Type": "application/json"})
    posters = Posters(MOVIES, TV)

    check = s.get(f"https://api.trakt.tv/users/{user}", timeout=30)
    if check.status_code in (401, 403):
        raise SystemExit(f"trakt said {check.status_code}: either the TRAKT_CLIENT_ID secret is wrong (it should be the client id, not the client secret) or the profile is private")
    if check.status_code == 404:
        raise SystemExit(f"trakt said 404: no user called {user}, or the profile is set to private")
    check.raise_for_status()

    film_list = movies(s, user, posters)
    show_list = shows(s, user, posters)
    save(MOVIES, film_list)
    save(TV, show_list)
    print(f"trakt: {len(film_list)} films, {len(show_list)} shows, {sum(1 for x in film_list + show_list if not x['poster'])} without posters")


if __name__ == "__main__":
    main()
