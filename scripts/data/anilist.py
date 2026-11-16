"""
pulls my anilist anime and manga lists into src/data/anime.json and manga.json.

  ANILIST_USER=myname python3 scripts/data/anilist.py

the profile needs to be public (it is by default).
"""
import json
import os
from datetime import date

import requests

QUERY = """
query ($user: String, $type: MediaType) {
  MediaListCollection(userName: $user, type: $type) {
    lists {
      entries {
        status
        progress
        score(format: POINT_10)
        media {
          id
          siteUrl
          title { english romaji }
          coverImage { large }
          episodes
          chapters
          duration
          format
          seasonYear
          startDate { year month day }
          genres
        }
      }
    }
  }
}
"""

STATUS = {
    "ANIME": {"CURRENT": "watching", "REPEATING": "watching", "COMPLETED": "completed", "PAUSED": "paused", "DROPPED": "dropped", "PLANNING": "planning"},
    "MANGA": {"CURRENT": "reading", "REPEATING": "reading", "COMPLETED": "completed", "PAUSED": "paused", "DROPPED": "dropped", "PLANNING": "planning"},
}


def release_date(d):
    d = d or {}
    if not d.get("year"):
        return None
    return "-".join(f"{v:02d}" if i else str(v) for i, v in enumerate([d["year"], d.get("month"), d.get("day")]) if v)


def fetch(user, kind):
    r = requests.post(
        "https://graphql.anilist.co",
        json={"query": QUERY, "variables": {"user": user, "type": kind}},
        timeout=30,
    )
    r.raise_for_status()
    body = r.json()
    if body.get("errors"):
        raise SystemExit(f"anilist: {body['errors'][0]['message']}")
    items = []
    for lst in body["data"]["MediaListCollection"]["lists"]:
        for e in lst["entries"]:
            m = e["media"]
            items.append({
                "id": m["id"],
                "title": m["title"]["english"] or m["title"]["romaji"],
                "poster": m["coverImage"]["large"],
                "url": m["siteUrl"],
                "status": STATUS[kind].get(e["status"], e["status"].lower()),
                "progress": e["progress"] or 0,
                "total": m["episodes"] if kind == "ANIME" else m["chapters"],
                "minutes": (e["progress"] or 0) * (m["duration"] or 0) if kind == "ANIME" else 0,
                "score": e["score"] or None,
                "year": m["seasonYear"] or (m["startDate"] or {}).get("year"),
                "format": m["format"],
                "genres": m["genres"],
                "released": release_date(m.get("startDate")),
            })
    # newest release first. when i watched or read something isn't kept, i backlog stuff whenever
    items.sort(key=lambda x: (x["released"] or str(x["year"] or ""), x["title"]), reverse=True)
    return items


def write(path, items):
    old = None
    if os.path.exists(path):
        with open(path, encoding="utf-8") as f:
            old = json.load(f)
    if old and old.get("items") == items:
        return
    with open(path, "w", encoding="utf-8") as f:
        json.dump({"updated": date.today().isoformat(), "items": items}, f, indent=1, ensure_ascii=False)


def main():
    user = os.environ.get("ANILIST_USER")
    if not user:
        print("anilist: no ANILIST_USER, skipping")
        return
    anime = fetch(user, "ANIME")
    manga = fetch(user, "MANGA")
    write("src/data/anime.json", anime)
    write("src/data/manga.json", manga)
    print(f"anilist: {len(anime)} anime, {len(manga)} manga")


if __name__ == "__main__":
    main()
