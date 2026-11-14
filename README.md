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

## books

export library from goodreads -> save as goodreads_library_export.csv in the repo root (it's gitignored, has private notes) -> python3 parse_goodreads.py

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
