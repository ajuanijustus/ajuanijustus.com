"""
builds src/data/books.json from goodreads.

  python3 scripts/data/goodreads.py --csv goodreads_library_export.csv   # full rebuild from an export
  GOODREADS_RSS="<rss link from my shelf page>" python3 scripts/data/goodreads.py   # nightly update

the csv has everything (format, publisher, read count). the rss feed only has
the recent stuff, so it gets merged on top of what's already in books.json.
"""
import argparse
import csv
import html
import json
import os
import re
import time
import xml.etree.ElementTree as ET

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
    try:
        return int(s)
    except (TypeError, ValueError):
        return None


def iso_date(s):
    # csv uses 2025/03/01, rss uses rfc 822 dates
    s = (s or "").strip()
    if not s:
        return ""
    if re.match(r"^\d{4}/\d{2}/\d{2}$", s):
        return s
    try:
        return time.strftime("%Y/%m/%d", time.strptime(s[:16], "%a, %d %b %Y"))
    except ValueError:
        return ""


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


def from_rss(url):
    books, page = [], 1
    while page < 30:
        sep = "&" if "?" in url else "?"
        r = requests.get(f"{url}{sep}shelf=%23ALL%23&page={page}", timeout=20, headers={"User-Agent": "Mozilla/5.0"})
        r.raise_for_status()
        items = ET.fromstring(r.content).findall("./channel/item")
        if not items:
            break
        for it in items:
            g = lambda tag: (it.findtext(tag) or "").strip()
            title, series, num = split_title(g("title"))
            shelves = [s.strip() for s in g("user_shelves").split(",") if s.strip()]
            exclusive = next((s for s in shelves if s in ("to-read", "currently-reading", "before-goodreads", "lost-interest-dnf", "read-in-part")), "read")
            pub = to_int(g("book_published"))
            books.append({
                "id": g("book_id"),
                "title": title,
                "series": series,
                "seriesNum": num,
                "author": g("author_name"),
                "isbn": clean_isbn(g("isbn")),
                "rating": to_int(g("user_rating")) or 0,
                "review": html.unescape(g("user_review")),
                "dateRead": iso_date(g("user_read_at")),
                "dateAdded": iso_date(g("user_date_added")),
                "shelf": exclusive,
                "shelves": [s for s in shelves if s != exclusive],
                "pages": to_int(it.findtext("./book/num_pages")) or 0,
                "pubYear": pub if pub and pub > 0 else None,
                "rssCover": g("book_large_image_url"),
            })
        page += 1
    return books


def merge(existing, fresh, full):
    out = {} if full else dict(existing)
    for b in fresh:
        old = existing.get(b["id"], {})
        merged = {**old, **{k: v for k, v in b.items() if v not in (None, "") or k not in old}}
        # rss doesn't know format or read count, keep what the csv gave
        for k in ("format", "readCount", "pages", "pubYear"):
            if not merged.get(k) and old.get(k):
                merged[k] = old[k]
        merged.setdefault("format", None)
        merged.setdefault("readCount", 1 if merged["shelf"] == "read" else 0)
        merged["coverUrl"] = old.get("coverUrl")
        out[b["id"]] = merged
    return out


def fill_covers(books):
    session = requests.Session()
    for b in books.values():
        rss_cover = b.pop("rssCover", None)
        if b.get("coverUrl") or b["shelf"] not in HAS_COVER:
            continue
        # goodreads placeholder covers have "nophoto" in the url
        if rss_cover and "nophoto" not in rss_cover:
            b["coverUrl"] = rss_cover
            continue
        print(f"cover: {b['title']}")
        b["coverUrl"] = openlibrary_cover(session, b.get("isbn"), b["title"], b["author"])
        time.sleep(0.3)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--csv", help="goodreads library export")
    args = ap.parse_args()

    existing = load_existing()
    if args.csv:
        books = merge(existing, from_csv(args.csv), full=True)
    elif os.environ.get("GOODREADS_RSS"):
        books = merge(existing, from_rss(os.environ["GOODREADS_RSS"]), full=False)
    else:
        print("nothing to do: pass --csv or set GOODREADS_RSS")
        return

    fill_covers(books)
    order = sorted(books.values(), key=lambda b: (b.get("dateRead") or b.get("dateAdded") or ""), reverse=True)
    keys = ["id", "title", "series", "seriesNum", "author", "isbn", "coverUrl", "rating", "review",
            "dateRead", "dateAdded", "shelf", "shelves", "pages", "pubYear", "format", "readCount"]
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump([{k: b.get(k) for k in keys} for b in order], f, indent=1, ensure_ascii=False)
    print(f"wrote {len(order)} books to {OUT}")


if __name__ == "__main__":
    main()
