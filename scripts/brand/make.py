"""
banners, profile picture and post images, all in the site's look. writes to brand/assets/.

  python3 scripts/brand/make.py                     everything
  python3 scripts/brand/make.py post "title"        a 1080x1350 post image (linkedin, instagram)
  python3 scripts/brand/make.py post "title" wide   a 1200x627 one (linkedin link posts, x)
  python3 scripts/brand/make.py post "title" wide "kicker"   with a small red line above the title

posts land in brand/assets/posts/, named after the title.
"""
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import brand  # noqa: E402

OUT = os.path.join(brand.ROOT, "brand", "assets")
P = lambda *x: os.path.join(OUT, *x)


def linkedin_banner():
    # linkedin puts the profile picture over the bottom left, so the text starts past it
    return brand.strip(1584, 396, left=560, right=1500)


def x_banner():
    # x and bluesky are both 3:1 and also cover the bottom left with the picture
    return brand.strip(3000, 1000, left=1060, right=2860)


def youtube_banner():
    # youtube crops to a 1546x423 middle strip on phones, so everything goes in there
    top = (1440 - 423) // 2
    return brand.strip(2560, 1440, left=577, right=1983, top=top, bottom=top + 423)


def github_header():
    # top of the github profile readme. github already shows my picture next to it
    return brand.strip(1280, 320, left=70, right=1210)


def slug(title):
    return re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")[:60] or "post"


def everything():
    print("brand/assets:")
    brand.save(brand.avatar(800), P("profile-picture.png"))
    brand.save(brand.portrait(800), P("profile-picture-plain.png"))
    brand.save(linkedin_banner(), P("linkedin-banner.png"))
    brand.save(x_banner(), P("x-bluesky-banner.png"))
    brand.save(youtube_banner(), P("youtube-banner.png"))
    brand.save(github_header(), P("github-header.png"))
    brand.save(brand.hero(1280, 640), P("github-social-preview.png"))
    brand.save(brand.hero(1200, 630), P("share-card.png"))
    brand.save(brand.post(1080, 1350, "your title here, it shrinks to fit about six lines", "kicker"), P("post-template.png"))
    brand.save(brand.post(1200, 627, "your title here, it shrinks to fit about four lines", "kicker"), P("post-template-wide.png"))


def main():
    args = sys.argv[1:]
    if not args:
        return everything()
    if args[0] == "post" and len(args) >= 2:
        title = args[1]
        wide = len(args) > 2 and args[2] == "wide"
        kicker = args[3] if wide and len(args) > 3 else (args[2] if not wide and len(args) > 2 else None)
        w, h = (1200, 627) if wide else (1080, 1350)
        brand.save(brand.post(w, h, title, kicker), P("posts", f"{slug(title)}{'-wide' if wide else ''}.png"))
        return
    raise SystemExit(__doc__)


if __name__ == "__main__":
    main()
