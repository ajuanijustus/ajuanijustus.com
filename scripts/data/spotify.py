"""
fills in titles and covers for the live diary playlists in src/data/live.json.

  python3 scripts/data/spotify.py

i only add the link (and a date and note if i want). this uses spotify's public
oembed endpoint, no account or key needed. the playlists have to be public.
"""
import json
import time

import requests

LIVE = "src/data/live.json"


def main():
    with open(LIVE) as f:
        data = json.load(f)
    filled = 0
    for p in data["playlists"]:
        url = p["url"].split("?")[0]
        r = requests.get("https://open.spotify.com/oembed", params={"url": url}, timeout=20)
        if not r.ok:
            print(f"::warning::spotify couldn't find {url} (is the playlist public?)")
            continue
        info = r.json()
        # keep a title i wrote myself, but always refresh the cover in case it changed
        p.setdefault("title", info.get("title"))
        p["cover"] = info.get("thumbnail_url")
        filled += 1
        time.sleep(0.3)
    with open(LIVE, "w") as f:
        json.dump(data, f, indent=1, ensure_ascii=False)
        f.write("\n")
    print(f"spotify: {filled} of {len(data['playlists'])} playlists")


if __name__ == "__main__":
    try:
        main()
    except (Exception, SystemExit) as e:
        # shows up in the run summary, which anyone can read without signing in
        print(f"::warning::spotify failed: {type(e).__name__}: {str(e)[:300]}")
        raise
