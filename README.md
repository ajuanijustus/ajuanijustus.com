# ajuanijustus.com

Guide for myself since I'm gonna be just as lost, if not more when I look at this codebase a decade later.

## dev

npm start

## deploy

git push
npm run deploy

(build also runs scripts/postbuild.js which makes a separate index.html for every page, plus sitemap.xml and 404.html, so github pages serves real urls)

## where things live

- content (bio, news, publications, teaching, socials): src/config/portfolio.js
- page titles / descriptions for google: src/config/seo.json
- structured data about me (for google knowledge panel): the ld+json block in public/index.html. update it when portfolio.js changes
- CV: public/cv.pdf (always at ajuanijustus.com/cv.pdf)
- if I add a new page: add the route in App.js AND in seo.json

## secret pages

all the data is in src/data/. pages are in src/pages/secret/ (books ones in src/pages/books/).

updates itself every night (.github/workflows/update.yml), or run it by hand from the actions tab:
- anime + manga: anilist. ANILIST_USER variable
- films + tv: trakt. TRAKT_USER variable, TRAKT_CLIENT_ID secret. posters come from trakt; if some films have none, add a free tmdb key as the TMDB_API_KEY secret
the action commits "update data" to master, so git pull before pushing.

by hand, rarely:
- travel: src/data/travel.json ({ "country": "Japan", "year": 2027, "note": "..." }, names as on the map)
- games: src/data/games.json ({ "title", "steam": app id from the store url, "platform", "year", "hours", "note" }). non steam: image in public/secret/games/ and "cover": "file.jpg"
- plants: src/data/plants.json ({ "name", "species", "since": "2025-04-01", "water": "weekly", "photo": "file.jpg", "note" }), photos in public/secret/plants/
- recipes: one .md file per recipe in src/data/recipes/ (format at the top of scripts/data/recipes.js), photos in public/secret/kitchen/
- videos/photos: src/data/media.json. youtube: { "id", "title" }. twitch: { "clip": clip slug, "title", "thumb": "file.jpg" in public/secret/videos/ }. photos: { "file" in public/secret/photos/, "link": instagram post url, "alt" }

books (goodreads dropped rss in oct 2025, so this one stays manual): my books > import and export > export library -> save as goodreads_library_export.csv in the repo root (gitignored, has private notes) -> python3 scripts/data/goodreads.py --csv goodreads_library_export.csv -> commit, push, deploy

## broken install

rm -rf node_modules
npm cache clean --force
npm ci

or, if that fails:

rm -rf node_modules package-lock.json
npm install

npm audit warnings are from create-react-app's build tools. the site is static files, so they don't affect the live site.

## skip commit hooks

git commit -m "message" --no-verify
