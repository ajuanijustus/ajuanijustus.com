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
        updatedAt
        completedAt { year month day }
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
          startDate { year }
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
            done = e.get("completedAt") or {}
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
                "completed": f"{done['year']}-{done['month']:02d}-{done['day']:02d}" if done.get("year") and done.get("month") and done.get("day") else None,
                "updatedAt": e["updatedAt"],
            })
    # most recently touched first
    items.sort(key=lambda x: x["updatedAt"] or 0, reverse=True)
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
