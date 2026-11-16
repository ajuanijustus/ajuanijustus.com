"""
pulls my trakt history into src/data/movies.json (films) and src/data/tv.json (shows).

  TRAKT_USER=myname TRAKT_CLIENT_ID=xxx python3 scripts/data/trakt.py

client id: trakt.tv > settings > your api apps > new application
(redirect uri can be urn:ietf:wg:oauth:2.0:oob). the profile must be public.

posters come from trakt itself. if trakt doesn't have one, shows fall back to
tvmaze (no key needed) and films to tmdb if TMDB_API_KEY is set.

shows sort themselves, like anilist:
  still watching  episodes left to see, or on my watchlist and not started yet
  caught up       seen everything aired, more on the way
  completed       seen everything and the show has ended or been cancelled,
                  or on my public trakt list called "done" (counts as all watched, whatever's logged)
  dropped         on my public trakt list called "dropped". shows how far i got if episodes are logged
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
            "liked": bool(rating and rating >= 9),
            "genres": m.get("genres") or [],
            "language": m.get("language"),
            "country": m.get("country"),
            "runtime": m.get("runtime"),
            "poster": poster,
            "posterKey": key,
        })
    items.sort(key=lambda x: (x["released"] or str(x["year"] or ""), x["title"]), reverse=True)
    return items


ENDED = {"ended", "canceled"}


def list_shows(s, user, slug):
    # {trakt id: show} for one of my public lists
    r = s.get(f"https://api.trakt.tv/users/{user}/lists/{slug}/items/shows", params={"extended": "full,images"}, timeout=30)
    if r.status_code == 404:
        return {}
    if r.status_code in (401, 403):
        # the list exists but isn't public, so the site can't see it. carry on without it
        print(f"::warning::trakt list \"{slug}\" is private, set it to public or delete it")
        return {}
    r.raise_for_status()
    return {x["show"]["ids"]["trakt"]: x["show"] for x in r.json() if x.get("show")}


def shows(s, user, posters):
    ratings = {r["show"]["ids"]["trakt"]: r["rating"] for r in s.get(f"https://api.trakt.tv/users/{user}/ratings/shows", timeout=30).json()}
    dropped = list_shows(s, user, "dropped")
    done = list_shows(s, user, "done")
    watched = s.get(f"https://api.trakt.tv/users/{user}/watched/shows", params={"extended": "full,images"}, timeout=30)
    watched.raise_for_status()

    entries = [(w["show"], {season["number"]: len(season.get("episodes", [])) for season in w.get("seasons", [])}) for w in watched.json()]
    seen_ids = {show["ids"]["trakt"] for show, _ in entries}
    # shows on my lists with nothing logged still belong on the site
    for tid, show in {**dropped, **done}.items():
        if tid not in seen_ids:
            entries.append((show, {}))
            seen_ids.add(tid)
    # watchlist shows i haven't started count as "still watching", the same way anilist does it
    wl = s.get(f"https://api.trakt.tv/users/{user}/watchlist/shows", params={"extended": "full,images"}, timeout=30)
    if wl.ok:
        entries += [(x["show"], {}) for x in wl.json() if x.get("show") and x["show"]["ids"]["trakt"] not in seen_ids]

    items = []
    for show, seen_by_season in entries:
        ids = show.get("ids", {})

        r = s.get(f"https://api.trakt.tv/shows/{ids['trakt']}/seasons", params={"extended": "full"}, timeout=30)
        aired_by_season = {x["number"]: x.get("aired_episodes") or 0 for x in (r.json() if r.ok else [])}
        time.sleep(0.2)

        seasons = [
            {"n": n, "watched": min(seen_by_season.get(n, 0), aired), "aired": aired}
            for n, aired in sorted(aired_by_season.items())
            if n > 0 and aired > 0
        ]
        if ids.get("trakt") in done and ids.get("trakt") not in dropped:
            # i've seen all of it, i just didn't log every episode
            seasons = [dict(x, watched=x["aired"]) for x in seasons]
        seen = sum(x["watched"] for x in seasons) or sum(v for k, v in seen_by_season.items() if k > 0)
        aired = sum(x["aired"] for x in seasons) or show.get("aired_episodes") or 0
        if ids.get("trakt") in dropped:
            status = "dropped"
        elif ids.get("trakt") in done:
            status = "completed"
            seen = aired
        elif aired and seen >= aired:
            status = "completed" if show.get("status") in ENDED else "caught up"
        else:
            status = "watching"
        key, poster = posters.show(show)
        items.append({
            "title": show["title"],
            "year": show.get("year"),
            "poster": poster,
            "posterKey": key,
            "status": status,
            "showStatus": show.get("status"),
            "seasons": seasons,
            "progress": seen,
            "total": aired or None,
            "minutes": seen * (show.get("runtime") or 0),
            "score": ratings.get(ids.get("trakt")),
            "genres": show.get("genres") or [],
            "language": show.get("language"),
            "network": show.get("network"),
            "released": (show.get("first_aired") or "")[:10] or None,
        })
    items.sort(key=lambda x: (x["released"] or str(x["year"] or ""), x["title"]), reverse=True)
    return items


def main():
    user = (os.environ.get("TRAKT_USER") or "").strip().lstrip("@")
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
    try:
        main()
    except (Exception, SystemExit) as e:
        # shows up in the run summary, which anyone can read without signing in
        print(f"::warning::trakt failed: {type(e).__name__}: {str(e)[:300]}")
        raise
