"""
pulls the tv shows i've watched on trakt into src/data/tv.json.

  TRAKT_USER=myname TRAKT_CLIENT_ID=xxx python3 scripts/data/trakt.py

client id: trakt.tv > settings > your api apps > new application
(redirect uri can be urn:ietf:wg:oauth:2.0:oob). the profile must be public.
posters come from tvmaze, which needs no key.
"""
import json
import os
import time
from datetime import date, datetime, timedelta, timezone

import requests

OUT = "src/data/tv.json"
WATCHING_WINDOW = timedelta(days=60)


def poster_for(session, ids, cache):
    key = ids.get("imdb") or f"tvdb{ids.get('tvdb')}"
    if key in cache:
        return cache[key]
    url = None
    try:
        if ids.get("imdb"):
            r = session.get("https://api.tvmaze.com/lookup/shows", params={"imdb": ids["imdb"]}, timeout=10)
        else:
            r = session.get("https://api.tvmaze.com/lookup/shows", params={"thetvdb": ids.get("tvdb")}, timeout=10)
        if r.ok:
            url = ((r.json() or {}).get("image") or {}).get("medium")
        time.sleep(0.6)
    except (requests.RequestException, ValueError):
        pass
    cache[key] = url
    return url


def main():
    user = os.environ.get("TRAKT_USER")
    client = os.environ.get("TRAKT_CLIENT_ID")
    if not user or not client:
        print("trakt: no TRAKT_USER or TRAKT_CLIENT_ID, skipping")
        return

    old = {"items": []}
    if os.path.exists(OUT):
        with open(OUT, encoding="utf-8") as f:
            old = json.load(f)
    cache = {x.get("cacheKey"): x.get("poster") for x in old["items"] if x.get("cacheKey")}

    s = requests.Session()
    s.headers.update({"trakt-api-key": client, "trakt-api-version": "2", "Content-Type": "application/json"})
    r = s.get(f"https://api.trakt.tv/users/{user}/watched/shows", params={"extended": "full"}, timeout=30)
    r.raise_for_status()

    now = datetime.now(timezone.utc)
    items = []
    tvmaze = requests.Session()
    for w in r.json():
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
        items.append({
            "title": show["title"],
            "year": show.get("year"),
            "poster": poster_for(tvmaze, ids, cache),
            "cacheKey": ids.get("imdb") or f"tvdb{ids.get('tvdb')}",
            "url": f"https://trakt.tv/shows/{ids.get('slug')}",
            "status": status,
            "progress": seen,
            "total": aired or None,
            "minutes": seen * (show.get("runtime") or 0),
            "lastWatched": last[:10] if last else None,
        })
    items.sort(key=lambda x: x["lastWatched"] or "", reverse=True)

    if items != old["items"]:
        with open(OUT, "w", encoding="utf-8") as f:
            json.dump({"updated": date.today().isoformat(), "items": items}, f, indent=1, ensure_ascii=False)
    print(f"trakt: {len(items)} shows")


if __name__ == "__main__":
    main()
