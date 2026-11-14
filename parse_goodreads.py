import csv
import json
import re
import time
import os
import requests

def clean_isbn(isbn_str):
    if not isbn_str:
        return None
    cleaned = re.sub(r'[^0-9X]', '', isbn_str)
    return cleaned if len(cleaned) in [10, 13] else None

def check_isbn_cover(session, isbn):
    if not isbn:
        return False
    
    # default=false makes openlibrary 404 instead of returning a blank pixel
    url = f"https://covers.openlibrary.org/b/isbn/{isbn}-L.jpg?default=false"
    try:
        res = session.get(url, timeout=4, allow_redirects=True)
        
        if res.status_code != 200:
            return False
            
        # blank placeholder image is 43 bytes
        if len(res.content) < 100:
            return False
            
        return True
    except Exception:
        return False

def get_fallback_cover_by_search(session, title, author):
    try:
        search_title = re.sub(r'\s*\(.*?\)\s*', '', title).strip()
        url = "https://openlibrary.org/search.json"
        params = {"title": search_title, "author": author, "limit": 1}
        print(f"   no cover, searching openlibrary for '{search_title}'")
        res = session.get(url, params=params, timeout=6)
        if res.status_code == 200:
            docs = res.json().get("docs", [])
            if docs and docs[0].get("cover_i"):
                return f"https://covers.openlibrary.org/b/id/{docs[0]['cover_i']}-L.jpg"
    except Exception as e:
        print(f"   search failed for {title}: {e}")
    return None

def parse_library(file_path, books_json_path, stats_json_path):
    books = []
    
    # reuse covers from the last run so we only look up new books
    cached_covers = {}
    if os.path.exists(books_json_path):
        try:
            with open(books_json_path, 'r', encoding='utf-8') as f:
                old_data = json.load(f)
                for b in old_data:
                    if b.get('id') and b.get('coverUrl'):
                        cached_covers[b['id']] = b['coverUrl']
            print(f"loaded {len(cached_covers)} cached covers")
        except Exception:
            print("could not read books.json, fetching all covers again")

    from collections import defaultdict
    by_year = defaultdict(lambda: {"totalBooks": 0, "totalPages": 0, "ratings": {1:0, 2:0, 3:0, 4:0, 5:0}})
    timeline_stats = defaultdict(lambda: {"booksCount": 0, "pagesCount": 0})
    scatter_data = []
    publisher_data = defaultdict(lambda: {"count": 0, "totalRating": 0, "ratedBooksCount": 0, "totalPages": 0})
    author_data = defaultdict(lambda: {"count": 0, "totalRating": 0, "ratedBooksCount": 0, "totalPages": 0})
    
    longest_book = {"title": None, "pages": 0, "author": None}
    shortest_book = {"title": None, "pages": 999999, "author": None}
    binding_counts = defaultdict(int)

    session = requests.Session()

    with open(file_path, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        
        for row in reader:
            shelf = row.get('Exclusive Shelf', 'read')
            if shelf not in ['read', 'before-goodreads']:
                continue 
                
            book_id = row.get('Book Id')
            title = re.sub(r'\s*\(.*?\)\s*', '', row.get('Title', 'Unknown Title')).strip()
            author = row.get('Author', 'Unknown Author')
            rating = int(row.get('My Rating') or 0)
            pages = int(row.get('Number of Pages') or 0)
            publisher = row.get('Publisher', 'Self-Published/Unknown').strip()
            binding = row.get('Binding', 'Unknown Binding').strip()
            
            pub_year_str = row.get('Original Publication Year') or row.get('Year Published')
            pub_year = int(pub_year_str) if (pub_year_str and pub_year_str.isdigit()) else None
            
            date_read = row.get('Date Read', '').strip()
            date_added = row.get('Date Added', '').strip()
            
            if book_id in cached_covers:
                cover_url = cached_covers[book_id]
            else:
                print(f"new book: '{title}'")
                isbn = clean_isbn(row.get('ISBN13')) or clean_isbn(row.get('ISBN'))
                cover_url = f"https://covers.openlibrary.org/b/isbn/{isbn}-L.jpg" if (isbn and check_isbn_cover(session, isbn)) else None
                if not cover_url:
                    cover_url = get_fallback_cover_by_search(session, title, author)
                    time.sleep(0.4)

            book_obj = {
                'id': book_id,
                'title': title,
                'author': author,
                'isbn': clean_isbn(row.get('ISBN13')) or clean_isbn(row.get('ISBN')),
                'coverUrl': cover_url,
                'rating': rating,
                'review': row.get('My Review', ''),
                'dateRead': date_read,
                'dateAdded': date_added,
                'shelf': shelf
            }
            books.append(book_obj)

            # stats
            year_label = "Before Tracking" if shelf == "before-goodreads" else (date_read[:4] if date_read else "Unknown Year")
            by_year[year_label]["totalBooks"] += 1
            by_year[year_label]["totalPages"] += pages
            if rating in [1, 2, 3, 4, 5]:
                by_year[year_label]["ratings"][rating] += 1

            if shelf == "read" and date_read and len(date_read) >= 7:
                month_year_key = date_read[:7]
                timeline_stats[month_year_key]["booksCount"] += 1
                timeline_stats[month_year_key]["pagesCount"] += pages
                
                if pub_year and pub_year > 1000:
                    scatter_data.append({"x": month_year_key, "y": pub_year, "title": title, "author": author})

            if author:
                author_data[author]["count"] += 1
                author_data[author]["totalPages"] += pages
                if rating > 0:
                    author_data[author]["totalRating"] += rating
                    author_data[author]["ratedBooksCount"] += 1
            if publisher:
                publisher_data[publisher]["count"] += 1
                publisher_data[publisher]["totalPages"] += pages
                if rating > 0:
                    publisher_data[publisher]["totalRating"] += rating
                    publisher_data[publisher]["ratedBooksCount"] += 1

            if pages > 0:
                if pages > longest_book["pages"]:
                    longest_book = {"title": title, "pages": pages, "author": author}
                if pages < shortest_book["pages"]:
                    shortest_book = {"title": title, "pages": pages, "author": author}
            if binding:
                binding_counts[binding] += 1

    session.close()

    sorted_timeline = sorted([{"date": k, **v} for k, v in timeline_stats.items()], key=lambda x: x["date"])
    
    formatted_authors = []
    for k, v in author_data.items():
        avg = round(v["totalRating"] / v["ratedBooksCount"], 2) if v["ratedBooksCount"] > 0 else 0
        formatted_authors.append({"name": k, "count": v["count"], "totalPages": v["totalPages"], "avgRating": avg})
        
    formatted_publishers = []
    for k, v in publisher_data.items():
        avg = round(v["totalRating"] / v["ratedBooksCount"], 2) if v["ratedBooksCount"] > 0 else 0
        formatted_publishers.append({"name": k, "count": v["count"], "totalPages": v["totalPages"], "avgRating": avg})

    stats_matrix = {
        "byYear": dict(by_year),
        "timeline": sorted_timeline,
        "scatterPlot": scatter_data,
        "byAuthor": sorted(formatted_authors, key=lambda x: x["count"], reverse=True)[:15],
        "byPublisher": sorted(formatted_publishers, key=lambda x: x["count"], reverse=True)[:15],
        "funStats": {
            "longestBook": longest_book,
            "shortestBook": shortest_book if shortest_book["title"] else None,
            "bindingDistribution": dict(sorted(binding_counts.items(), key=lambda x: x[1], reverse=True)[:6])
        }
    }

    with open(books_json_path, 'w', encoding='utf-8') as f:
        json.dump(books, f, indent=2, ensure_ascii=False)
    with open(stats_json_path, 'w', encoding='utf-8') as f:
        json.dump(stats_matrix, f, indent=2, ensure_ascii=False)
        
    print(f"wrote {books_json_path} and {stats_json_path}")

if __name__ == "__main__":
    parse_library('goodreads_library_export.csv', 'src/config/books.json', 'src/config/stats.json')