"""
pulls my letterboxd diary into src/data/movies.json.

  LETTERBOXD_USER=myname python3 scripts/data/letterboxd.py

the rss feed only has the latest ~50 entries, so new ones are added to what's
already saved and nothing is ever dropped. for the full history, export from
letterboxd (settings > data) and run with --csv diary.csv once.
"""
import argparse
import csv
import json
import os
import re
import xml.etree.ElementTree as ET
from datetime import date

import requests

OUT = "src/data/movies.json"
NS = {"letterboxd": "https://letterboxd.com", "tmdb": "https://themoviedb.org"}


def load():
    if os.path.exists(OUT):
        with open(OUT, encoding="utf-8") as f:
            return json.load(f)
    return {"updated": None, "items": []}


def from_rss(user):
    r = requests.get(f"https://letterboxd.com/{user}/rss/", timeout=20, headers={"User-Agent": "Mozilla/5.0"})
    r.raise_for_status()
    out = []
    for it in ET.fromstring(r.content).findall("./channel/item"):
        guid = it.findtext("guid") or ""
        if not guid.startswith("letterboxd-watch") and not guid.startswith("letterboxd-review"):
            continue
        g = lambda tag: (it.findtext(tag, namespaces=NS) or "").strip()
        poster = re.search(r'<img src="([^"]+)"', it.findtext("description") or "")
        rating = g("letterboxd:memberRating")
        year = g("letterboxd:filmYear")
        out.append({
            "id": guid,
            "title": g("letterboxd:filmTitle"),
            "year": int(year) if year.isdigit() else None,
            "rating": float(rating) if rating else None,
            "watched": g("letterboxd:watchedDate") or None,
            "rewatch": g("letterboxd:rewatch") == "Yes",
            "liked": g("letterboxd:memberLike") == "Yes",
            "poster": poster.group(1) if poster else None,
            "url": (it.findtext("link") or "").strip(),
        })
    return out


def from_csv(path):
    # diary.csv from the letterboxd export. no posters in it, those fill in from the rss over time
    out = []
    with open(path, encoding="utf-8") as f:
        for row in csv.DictReader(f):
            out.append({
                "id": f"csv-{row.get('Letterboxd URI')}-{row.get('Watched Date')}",
                "title": row.get("Name"),
                "year": int(row["Year"]) if (row.get("Year") or "").isdigit() else None,
                "rating": float(row["Rating"]) if row.get("Rating") else None,
                "watched": row.get("Watched Date") or None,
                "rewatch": row.get("Rewatch") == "Yes",
                "liked": False,
                "poster": None,
                "url": row.get("Letterboxd URI"),
            })
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--csv")
    args = ap.parse_args()
    user = os.environ.get("LETTERBOXD_USER")
    if not user and not args.csv:
        print("letterboxd: no LETTERBOXD_USER, skipping")
        return

    data = load()
    items = {m["id"]: m for m in data["items"]}
    fresh = from_csv(args.csv) if args.csv else from_rss(user)
    # same film + same date from the csv and the rss is one watch, prefer the rss one
    seen = {(m["title"], m["watched"]) for m in fresh if not m["id"].startswith("csv-")}
    items = {k: v for k, v in items.items() if not (k.startswith("csv-") and (v["title"], v["watched"]) in seen)}
    for m in fresh:
        if m["id"].startswith("csv-") and (m["title"], m["watched"]) in {(v["title"], v["watched"]) for v in items.values() if not v["id"].startswith("csv-")}:
            continue
        items[m["id"]] = {**items.get(m["id"], {}), **m}

    ordered = sorted(items.values(), key=lambda m: (m.get("watched") or "", m["id"]), reverse=True)
    if ordered != data["items"]:
        data = {"updated": date.today().isoformat(), "items": ordered}
        with open(OUT, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=1, ensure_ascii=False)
    print(f"letterboxd: {len(ordered)} films")


if __name__ == "__main__":
    main()
