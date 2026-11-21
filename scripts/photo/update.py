"""
swap my photo everywhere on the site in one go.

  python3 scripts/photo/update.py path/to/new-photo.png

best: a square png with a transparent background (a cut-out, like the current one where
my head pops out of the circle). a normal photo works too, it gets cropped to a circle.

writes:
  public/profile.png                                  link previews fallback, structured data, wikidata-style uses
  src/assets/images/linkedin_dp_overlay_round_repos.png   the photo on home and contact pages
  public/favicon-*, apple-icon-*, android-icon-*, ms-icon-*   browser tab, home screen icons, footer easter egg
  public/og-card.jpg                                  the whatsapp/linkedin/x preview card
  brand/assets/                                       banners, profile picture, post templates
"""
import os
import subprocess
import sys

from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
P = lambda *x: os.path.join(ROOT, *x)

ICONS = {
    "favicon": [16, 32, 96],
    "apple-icon": [57, 60, 72, 76, 114, 120, 144, 152, 180],
    "android-icon": [36, 48, 72, 96, 144, 192],
    "ms-icon": [70, 144, 150, 310],
}


def prepare(path):
    im = Image.open(path)
    if im.mode in ("RGBA", "LA") and im.getchannel("A").getextrema()[0] < 255:
        # already cut out: trim the empty space and centre it on a square
        im = im.convert("RGBA")
        im = im.crop(im.getbbox())
        side = max(im.size)
        sq = Image.new("RGBA", (side, side), (0, 0, 0, 0))
        sq.paste(im, ((side - im.width) // 2, (side - im.height) // 2), im)
        return sq
    # plain photo: centre square, round mask
    im = im.convert("RGB")
    side = min(im.size)
    im = im.crop(((im.width - side) // 2, (im.height - side) // 2, (im.width + side) // 2, (im.height + side) // 2)).convert("RGBA")
    mask = Image.new("L", (side * 4, side * 4), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, side * 4, side * 4), fill=255)
    im.putalpha(mask.resize((side, side), Image.LANCZOS))
    return im


def save(im, size, path):
    im.resize((size, size), Image.LANCZOS).save(path, optimize=True)
    print("  ", os.path.relpath(path, ROOT))


def main():
    if len(sys.argv) != 2:
        raise SystemExit(__doc__)
    im = prepare(sys.argv[1])
    if im.width < 600:
        print(f"warning: the photo is only {im.width}px across, 600px or more looks sharper")
    save(im, 600, P("public", "profile.png"))
    save(im, 480, P("src", "assets", "images", "linkedin_dp_overlay_round_repos.png"))
    for name, sizes in ICONS.items():
        for n in sizes:
            save(im, n, P("public", f"{name}-{n}x{n}.png"))
    save(im, 192, P("public", "apple-icon.png"))
    save(im, 192, P("public", "apple-icon-precomposed.png"))
    subprocess.run([sys.executable, P("scripts", "photo", "card.py"), ROOT, P("public", "og-card.jpg")], check=True)
    print("   public/og-card.jpg")
    subprocess.run([sys.executable, P("scripts", "brand", "make.py")], check=True)


if __name__ == "__main__":
    main()
