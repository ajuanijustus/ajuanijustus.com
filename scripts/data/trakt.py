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
from datetime import date, datetime, timedelta, timezone

import requests

MOVIES = "src/data/movies.json"
TV = "src/data/tv.json"
WATCHING_WINDOW = timedelta(days=60)


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


def get_all(s, url, params):
    out, page = [], 1
    while True:
        r = s.get(url, params={**params, "page": page, "limit": 100}, timeout=30)
        r.raise_for_status()
        out += r.json()
        if page >= int(r.headers.get("X-Pagination-Page-Count", 1)):
            return out
        page += 1


def movies(s, user, posters):
    ratings = {r["movie"]["ids"]["trakt"]: r["rating"] for r in s.get(f"https://api.trakt.tv/users/{user}/ratings/movies", timeout=30).json()}
    history = get_all(s, f"https://api.trakt.tv/users/{user}/history/movies", {"extended": "full,images"})
    history.sort(key=lambda h: h["watched_at"])
    seen = set()
    items = []
    for h in history:
        m = h["movie"]
        tid = m["ids"]["trakt"]
        key, poster = posters.movie(m)
        rating = ratings.get(tid)
        items.append({
            "id": f"trakt-{h['id']}",
            "title": m["title"],
            "year": m.get("year"),
            "rating": rating / 2 if rating else None,
            "watched": h["watched_at"][:10],
            "rewatch": tid in seen,
            "liked": bool(rating and rating >= 9),
            "poster": poster,
            "posterKey": key,
            "url": f"https://trakt.tv/movies/{m['ids'].get('slug')}",
        })
        seen.add(tid)
    items.reverse()
    return items


def shows(s, user, posters):
    ratings = {r["show"]["ids"]["trakt"]: r["rating"] for r in s.get(f"https://api.trakt.tv/users/{user}/ratings/shows", timeout=30).json()}
    watched = s.get(f"https://api.trakt.tv/users/{user}/watched/shows", params={"extended": "full,images"}, timeout=30)
    watched.raise_for_status()
    now = datetime.now(timezone.utc)
    items = []
    for w in watched.json():
        show = w["show"]
        ids = show.get("ids", {})
        seen = sum(len(season.get("episodes", [])) for season in w.get("seasons", []) if season.get("number", 1) > 0)
        aired = show.get("aired_episodes") or 0
        last = w.get("last_watched_at")
        recent = last and now - datetime.fromisoformat(last.replace("Z", "+00:00")) < WATCHING_WINDOW
        if aired and seen >= aired:
            status = "completed"
        else:
            status = "watching" if recent else "paused"
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
            "lastWatched": last[:10] if last else None,
        })
    items.sort(key=lambda x: x["lastWatched"] or "", reverse=True)
    return items


def main():
    user = os.environ.get("TRAKT_USER")
    client = os.environ.get("TRAKT_CLIENT_ID")
    if not user or not client:
        print("trakt: no TRAKT_USER or TRAKT_CLIENT_ID, skipping")
        return

    s = requests.Session()
    s.headers.update({"trakt-api-key": client, "trakt-api-version": "2", "Content-Type": "application/json"})
    posters = Posters(MOVIES, TV)

    film_list = movies(s, user, posters)
    show_list = shows(s, user, posters)
    save(MOVIES, film_list)
    save(TV, show_list)
    print(f"trakt: {len(film_list)} films, {len(show_list)} shows, {sum(1 for x in film_list + show_list if not x['poster'])} without posters")


if __name__ == "__main__":
    main()
