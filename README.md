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

films + tv on trakt, anime + manga on anilist, books on goodreads. the site sorts everything by release date, not by when i logged it, so backlogging old stuff is fine.

#### anilist (anime + manga)

- add: https://anilist.co/search/anime or https://anilist.co/search/manga
- set the status on each entry:
  - watching / reading: what i'm on now, or about to start following
  - completed: finished
  - paused: shown as "on hold"
  - dropped: shown as "dropped", with how far i got. no progress logged shows "not logged"
  - planning: kept off the site
- update progress: the "+" next to the episode/chapter count on my list, or the entry's edit box
- list: https://anilist.co/user/ajewdor/animelist

#### trakt (films + tv)

trakt has no status buttons, so the site works the status out from what's logged:

| site section | how it gets there on trakt |
|---|---|
| still watching | episodes left to watch, or on my watchlist and not started |
| caught up | every aired episode watched, show still running |
| completed | every aired episode watched and the show has ended, or on my public list called "done" (counts as all watched, whatever's logged) |
| dropped | on my public list called "dropped". shows how far i got from logged episodes, or "not logged" |

- films: search, hit "watched": https://trakt.tv/search. rating is optional
- shows i'm on: tick episodes as i go, or "mark as watched" on a whole season to catch up in one go
- shows i'm about to start: add to the watchlist (bookmark icon on the show page)
- dropping a show: show page -> lists -> "dropped". log episodes up to where i stopped if i remember, otherwise leave it. taking it off the list puts it back
- finished a show long ago and can't be bothered logging every episode: show page -> lists -> "done"
- lists: https://trakt.tv/users/ajewdor/lists. two of them, "dropped" and "done", both public and named exactly that. shows on them appear even with nothing logged
- trakt's own "drop show" button doesn't work for the site, it's private and the update only reads the public profile

then either wait for sunday, or run it now: https://github.com/ajuanijustus/ajuanijustus.com/actions/workflows/update.yml -> run workflow.
it commits "update data" to master, so git pull before pushing.

#### live diary (spotify)

my LIVE DIARY folder isn't visible to spotify's api, so each playlist gets added once by hand:
1. spotify -> the playlist -> share -> copy link. the playlist has to be public
2. add it to src/data/live.json: { "url": "https://open.spotify.com/playlist/...", "date": "2025-06", "note": "optional line" }
   name the playlist "[LIVE Diary] Artist – City, Mon YYYY". the site drops the "[LIVE Diary]" and the date from the title, and uses "date" instead
   my public playlists: https://open.spotify.com/user/5m6qysxxgn7vz6uhrzolm6dto/playlists
3. the sunday update fills in the title and cover, or run python3 scripts/data/spotify.py now

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

### booking link (contact page)

shows "book a chat · coming soon" until it's switched on.
1. google calendar -> create -> appointment schedule. 20 min, add buffer time and a max bookings per day
2. open the booking page, copy its link (calendar.app.google/...)
3. src/config/portfolio.js -> contactPageData.contactSection.booking: paste it as url, set live: true
4. commit, push, npm run deploy

### new photo

1. get a photo, 1000px or more, and remove the background (remove.bg, adobe firefly). a normal photo works too, it gets cropped to a circle.
2. python3 scripts/photo/update.py path/to/photo.png --mute-greens
   puts me on the dark circle with my head breaking out of the top, cleans the leftover tint from the old background off the hair and edges, and (with --mute-greens) greys out green clothing so it sits with the red. --as-is if the png already has its own circle
   rebuilds every copy: home and contact page photo, public/profile.png, the browser tab and home screen icons (the footer easter egg uses one), the link preview card public/og-card.jpg, and the banners and profile picture in brand/assets/
3. npm start, check the home page, contact page and the tab icon
4. commit, push, npm run deploy
5. elsewhere, same photo everywhere so google ties them together (brand/assets/profile-picture.png, and the banners from brand/README.md):
   - google scholar, orcid, linkedin, github, researchgate, semantic scholar
   - university pure profile and school staff/phd page
   - x, bluesky, instagram, youtube, twitch, substack, goodreads, trakt, anilist
   - google account photo (shows in the knowledge panel once it's claimed)
   - cv, if it has a photo

### brand

colours, fonts, bios, writing style, banners and post images for linkedin, github and the rest: brand/README.md

### link previews (whatsapp, linkedin, x...)

public/og-card.jpg, 1200x630. scripts/photo/card.py draws it with the layout in scripts/brand/brand.py. after changing the name, title or research line there:

python3 scripts/photo/card.py . public/og-card.jpg

apps cache previews for days. to see a new one straight away, share the link with ?v=2 on the end, or refresh it with https://www.linkedin.com/post-inspector/ and https://developers.facebook.com/tools/debug/ (whatsapp uses facebook's cache).

## broken install

rm -rf node_modules
npm cache clean --force
npm ci

or, if that fails:

rm -rf node_modules package-lock.json
npm install

npm audit warnings are from create-react-app's build tools. the site is static files, so they don't affect the live site.
the "overrides" in package.json pin patched versions of some of those tools. what's left (webpack-dev-server, svgo, jest) can only go by moving off react-scripts.
