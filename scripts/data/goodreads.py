"""
builds src/data/books.json from a goodreads library export
(my books > import and export > export library).

  python3 scripts/data/goodreads.py --csv goodreads_library_export.csv

goodreads dropped rss in oct 2025, so this is the only way to get the data out.
covers already in books.json are reused, so only new books get looked up.
"""
import argparse
import csv
import json
import os
import re
import time

import requests

OUT = "src/data/books.json"
HAS_COVER = {"read", "before-goodreads", "currently-reading"}
SERIES = re.compile(r"\s*\(([^()]*?),?\s*#(\d+(?:\.\d+)?)[^()]*\)\s*$")


def split_title(raw):
    raw = raw.strip()
    m = SERIES.search(raw)
    if m:
        num = float(m.group(2))
        return raw[: m.start()].strip(), m.group(1).strip(), int(num) if num.is_integer() else num
    return re.sub(r"\s*\(.*?\)\s*$", "", raw).strip(), None, None


def clean_isbn(s):
    s = re.sub(r"[^0-9X]", "", s or "")
    return s if len(s) in (10, 13) else None


def to_int(s):
    # newer exports write ratings as "5.0"
    try:
        return int(float(s))
    except (TypeError, ValueError):
        return None


def iso_date(s):
    s = (s or "").strip()
    return s if re.match(r"^\d{4}/\d{2}/\d{2}$", s) else ""


def openlibrary_cover(session, isbn, title, author):
    if isbn:
        try:
            r = session.get(f"https://covers.openlibrary.org/b/isbn/{isbn}-L.jpg?default=false", timeout=5)
            if r.status_code == 200 and len(r.content) > 100:
                return f"https://covers.openlibrary.org/b/isbn/{isbn}-L.jpg"
        except requests.RequestException:
            pass
    try:
        r = session.get(
            "https://openlibrary.org/search.json",
            params={"title": title, "author": author, "limit": 1},
            timeout=8,
        )
        docs = r.json().get("docs", []) if r.ok else []
        if docs and docs[0].get("cover_i"):
            return f"https://covers.openlibrary.org/b/id/{docs[0]['cover_i']}-L.jpg"
    except (requests.RequestException, ValueError):
        pass
    return None


def load_existing():
    if not os.path.exists(OUT):
        return {}
    with open(OUT, encoding="utf-8") as f:
        return {b["id"]: b for b in json.load(f)}


def from_csv(path):
    books = []
    with open(path, encoding="utf-8-sig") as f:
        for row in csv.DictReader(f):
            title, series, num = split_title(row.get("Title", ""))
            pub = to_int(row.get("Original Publication Year")) or to_int(row.get("Year Published"))
            books.append({
                "id": row["Book Id"],
                "title": title,
                "series": series,
                "seriesNum": num,
                "author": row.get("Author", "").strip(),
                "isbn": clean_isbn(row.get("ISBN13")) or clean_isbn(row.get("ISBN")),
                "rating": to_int(row.get("My Rating")) or 0,
                "review": row.get("My Review", ""),
                "dateRead": iso_date(row.get("Date Read")),
                "dateAdded": iso_date(row.get("Date Added")),
                "shelf": row.get("Exclusive Shelf", "read"),
                "shelves": [s.strip() for s in row.get("Bookshelves", "").split(",") if s.strip()],
                "pages": to_int(row.get("Number of Pages")) or 0,
                "pubYear": pub if pub and pub > 0 else None,
                "format": row.get("Binding", "").strip() or None,
                "readCount": to_int(row.get("Read Count")) or 0,
            })
    return books


def merge(existing, fresh):
    out = {}
    for b in fresh:
        old = existing.get(b["id"], {})
        merged = {**old, **{k: v for k, v in b.items() if v not in (None, "") or k not in old}}
        merged["coverUrl"] = old.get("coverUrl")
        out[b["id"]] = merged
    return out


def fill_covers(books):
    session = requests.Session()
    for b in books.values():
        if b.get("coverUrl") or b["shelf"] not in HAS_COVER:
            continue
        print(f"cover: {b['title']}")
        b["coverUrl"] = openlibrary_cover(session, b.get("isbn"), b["title"], b["author"])
        time.sleep(0.3)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--csv", required=True, help="goodreads library export")
    args = ap.parse_args()

    books = merge(load_existing(), from_csv(args.csv))

    fill_covers(books)
    order = sorted(books.values(), key=lambda b: (b.get("dateRead") or b.get("dateAdded") or ""), reverse=True)
    keys = ["id", "title", "series", "seriesNum", "author", "isbn", "coverUrl", "rating", "review",
            "dateRead", "dateAdded", "shelf", "shelves", "pages", "pubYear", "format", "readCount"]
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump([{k: b.get(k) for k in keys} for b in order], f, indent=1, ensure_ascii=False)
    print(f"wrote {len(order)} books to {OUT}")


if __name__ == "__main__":
    main()
