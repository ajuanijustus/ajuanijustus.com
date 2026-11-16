# ajuanijustus.com

Guide for myself since I'm gonna be just as lost, if not more when I look at this codebase a decade later.

## dev

npm start

## deploy

git push
npm run deploy

(build also runs scripts/postbuild.js which makes a separate index.html for every page, plus sitemap.xml and 404.html, so github pages serves real urls)

## where things live

- content (bio, news, publications, teaching, talks, awards, outreach, service, socials): src/config/portfolio.js
- main pages: home, research (/research), teaching & outreach (/teaching), all news (/news, not in the menu, linked from the home page)
- page titles / descriptions for google: src/config/seo.json
- structured data about me (for google knowledge panel): the ld+json block in public/index.html. update it when portfolio.js changes
- CV: public/cv.pdf (always at ajuanijustus.com/cv.pdf)
- if I add a new page: add the route in App.js AND in seo.json

## secret pages

all the data is in src/data/. pages are in src/pages/secret/ (books ones in src/pages/books/).

### logging, every once in a while

- films + tv: trakt. search and hit "watched": https://trakt.tv/search
  - mark a show as done: add it to my "done" list (create it once, public): https://trakt.tv/users/ajewdor/lists
- anime: https://anilist.co/search/anime
- manga: https://anilist.co/search/manga
- books: goodreads as usual, then export (see below)

then either wait for sunday, or run it now: https://github.com/ajuanijustus/ajuanijustus.com/actions/workflows/update.yml -> run workflow.
it commits "update data" to master, so git pull before pushing.

### books (manual, goodreads dropped rss in oct 2025)

1. export: https://www.goodreads.com/review/import -> "export library", wait, download
2. save it in the repo root as goodreads_library_export.csv (gitignored, has private notes)
3. python3 scripts/data/goodreads.py --csv goodreads_library_export.csv
4. commit, push, npm run deploy

### the automation

.github/workflows/update.yml runs every sunday, or by hand from the actions tab.
- trakt: TRAKT_USER variable, TRAKT_CLIENT_ID secret (from https://trakt.tv/oauth/applications). posters come from trakt; if some films have none, add a free tmdb key as the TMDB_API_KEY secret
- anilist: ANILIST_USER variable
- settings for both: https://github.com/ajuanijustus/ajuanijustus.com/settings/secrets/actions

### by hand, rarely

- travel: src/data/travel.json ({ "country": "Japan", "flag": "🇯🇵", "note": "..." }, names as on the map)
- games: src/data/games.json ({ "title", "steam": app id from the store url, "platform", "year", "hours", "note" }). non steam: image in public/secret/games/ and "cover": "file.jpg"
- videos (shown on the games page): src/data/media.json. youtube: { "id", "title" }. twitch: { "clip": clip slug, "title", "thumb": "file.jpg" in public/secret/games/ }
- plants: src/data/plants.json ({ "name", "species", "since": "2025-04-01", "water": "weekly", "photo": "file.jpg", "note" }), photos in public/secret/plants/
- recipes: one .md file per recipe in src/data/recipes/ (format at the top of scripts/data/recipes.js), photos in public/secret/kitchen/

## broken install

rm -rf node_modules
npm cache clean --force
npm ci

or, if that fails:

rm -rf node_modules package-lock.json
npm install

npm audit warnings are from create-react-app's build tools. the site is static files, so they don't affect the live site.
