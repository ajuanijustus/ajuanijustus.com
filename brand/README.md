# brand

how i look and sound online. the site is the reference, everything else copies it: linkedin, github, x, bluesky, youtube, slides, posters.

the point is that someone who sees my linkedin banner, then my github, then the site, knows it's the same person without reading the name.

## who

**Aju Ani Justus**, doctoral researcher at the University of Birmingham. multi-agent reinforcement learning, agent communication, human-agent teaming.

the name is always written in full, "Aju Ani Justus". "Aju Justus" only where space forces it. handle everywhere is `ajuanijustus` (`ajewdor` for gaming, twitch, trakt, anilist).

## bio

one line (x, bluesky, github, instagram):
> doctoral researcher at the University of Birmingham. multi-agent RL, agent communication, human-agent teaming.

headline (linkedin):
> Doctoral Researcher, University of Birmingham | Multi-Agent Reinforcement Learning, Agent Communication, Human-Agent Teaming

short (talk intros, conference pages, about sections):
> Aju Ani Justus is a doctoral researcher at the University of Birmingham working on heterogeneous-agent reinforcement learning, agent communication and human-agent teaming. Before the PhD, Aju spent three years as a machine learning engineer at Accenture Applied Intelligence. Aju also organises MAS@B, a multi-agent systems interest group, and is an event manager for Pint of Science Birmingham.

long: the home page bio, as is.

when something changes (new role, graduation) change it on the site first, then here, then everywhere else. the site's structured data (public/index.html) and wikidata follow the site too.

## colours

| | hex | use |
|---|---|---|
| background | `#121212` | almost everything sits on this. not pure black |
| text | `#E0E0E0` | headings, names, body text. not pure white |
| muted | `#969696` | second lines, places, research areas, captions |
| red | `#B30000` | the accent, used small: one short rule above a heading, a kicker word, links on the site |
| dark red | `#7D0C0C` | the thin ring round the profile picture |
| glow | `#2C0A0A` | a faint blurred patch behind the text, so the background isn't flat. barely there |

red is a highlight, not a background. the url and other secondary text are grey, not red. if you notice the red before the name, there's too much of it.

light version (the site has a light theme): swap background and text, keep red and muted.

## type

- **Google Sans** for everything. bold for names and titles, medium for roles and labels, regular for the rest. it's on Google Fonts under the open font licence, so it's fine for anything public. the files are in `src/assets/fonts/`
- **Agustina** is only for the handwritten "AjuAniJustus" signature (top left of the site). it's a logo, not a font for sentences
- sentence case or lowercase. no ALL CAPS headings, no Title Case For Every Word except the name and proper nouns

## photo

- one photo, used everywhere at the same time. when it changes, it changes on every profile in the same week
- the photo is for profile pictures and the site. banners, cards and posts are text only: the profile picture already sits next to them, and two faces side by side looks cluttered
- the cut-out style: me on a dark round background, head allowed to break out of the circle
- always on the dark background, never on white or busy colours
- to swap it everywhere on the site and regenerate every asset here: `python3 scripts/photo/update.py path/to/photo.png` (see the main README, "new photo")

## layouts

all built on the share card (`assets/share-card.png`): a short red rule, the name big, role and place under it, the research areas in muted grey, the url in grey at the bottom, a faint glow behind the text. the signature can sit quietly in a corner when there's room.

- left aligned, lots of empty space, one idea per image
- banners: text sits on the side the profile picture doesn't cover
- posts: red rule, optional small red kicker ("new paper", "conference notes"), the title big, my name and the url along the bottom
- no photos outside the profile picture, no stock images, emoji, icons-as-decoration, gradients beyond the one glow, drop shadows or rounded boxes around text

## writing

how the site already talks, so posts and bios should too.

- plain and specific. say what happened, where, and what it was about
- first person, short sentences, british spelling (organise, colour)
- the secret pages and casual stuff are lowercase and a bit dry. professional stuff (bio, papers, linkedin headline) uses normal capitals
- numbers over adjectives: "3 community science events" not "several exciting events"

do:
> Presented "Grounded Communication Policies in Heterogeneous Agent Reinforcement Learning" at AAMAS 2026 in Paphos.

don't:
> Thrilled and humbled to share that I had the incredible opportunity to present my groundbreaking research at the prestigious AAMAS 2026! 🚀✨

avoid: thrilled, humbled, excited to announce, delighted, journey, passionate about (once is enough, it's already in the bio), leverage, cutting-edge, game-changer, hashtag walls. two or three hashtags at most on linkedin, none elsewhere.

## assets

all in `assets/`, made by `scripts/brand/make.py`.

| file | size | where |
|---|---|---|
| `profile-picture.png` | 800×800 | every profile picture: linkedin, github, x, bluesky, scholar, orcid, slack, teams. the only assets with the photo |
| `profile-picture-no-ring.png` | 800×800 | the same without the red ring, for places that want something plainer (university pages, conference badges, speaker bios) |
| `linkedin-banner.png` | 1584×396 | linkedin background photo |
| `x-bluesky-banner.png` | 3000×1000 | x header and bluesky banner (same 3:1 shape) |
| `youtube-banner.png` | 2560×1440 | youtube banner. the text sits in the 1546×423 middle strip that phones show |
| `github-header.png` | 1280×320 | top of the github profile readme (`ajuanijustus/ajuanijustus` repo) |
| `github-social-preview.png` | 1280×640 | repo settings -> social preview, for repos that don't have their own |
| `share-card.png` | 1200×630 | same as the site's link preview (whatsapp, linkedin, x), for slides or anywhere a wide card fits |
| `post-template.png` | 1080×1350 | what a tall post looks like (linkedin, instagram) |
| `post-template-wide.png` | 1200×627 | what a wide post looks like (linkedin link posts, x) |

github profile readme, at the top:

```md
![Aju Ani Justus](https://raw.githubusercontent.com/ajuanijustus/ajuanijustus.com/master/brand/assets/github-header.png)
```

## making a post image

```
python3 scripts/brand/make.py post "what i learned presenting at AAMAS 2026" "conference notes"
python3 scripts/brand/make.py post "new paper on grounded communication" wide "new paper"
```

the first is tall (1080×1350), `wide` makes a 1200×627 one. the last argument is the small red kicker and can be left out. the title shrinks to fit. files go in `assets/posts/`, which git ignores.

## changing the look

the colours, fonts, name, role and research areas are at the top of `scripts/brand/brand.py`. change them there, then:

```
python3 scripts/brand/make.py
python3 scripts/photo/card.py . public/og-card.jpg
```

colours also live in `src/config/theme.js` for the site itself, keep the two the same.
