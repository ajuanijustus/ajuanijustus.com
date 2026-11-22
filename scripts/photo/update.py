"""
swap my photo everywhere on the site in one go.

  python3 scripts/photo/update.py path/to/new-photo.png
  python3 scripts/photo/update.py path/to/new-photo.png --as-is
  python3 scripts/photo/update.py path/to/new-photo.png --mute-greens

best: a png cut-out with a transparent background (remove.bg, adobe firefly...). it gets put
on the dark circle with my head breaking out of the top, the way the site has always looked.
add --as-is if the png already has its own circle behind me.
add --mute-greens to grey out green clothing a little so it sits better with the red.
a normal photo works too, it gets cropped to a circle.

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

from PIL import Image, ImageDraw, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
P = lambda *x: os.path.join(ROOT, *x)

ICONS = {
    "favicon": [16, 32, 96],
    "apple-icon": [57, 60, 72, 76, 114, 120, 144, 152, 180],
    "android-icon": [36, 48, 72, 96, 144, 192],
    "ms-icon": [70, 144, 150, 310],
}


def despill(im, mute_greens=False):
    """
    background removal leaves a tint from whatever was behind me (leaves, a wall) on the hair,
    beard and edges. pull green down to the red/blue average on dark pixels and near the edge,
    which takes the tint out without touching skin (skin is never green-heavy).
    mute_greens also greys out green clothing a bit.
    """
    r, g, b, a = [ch.load() for ch in im.split()]
    w, h = im.size
    near_edge = im.getchannel("A").point(lambda v: 255 if v < 250 else 0).filter(ImageFilter.MaxFilter(25)).load()
    out = im.copy()
    px = out.load()
    for y in range(h):
        for x in range(w):
            R, G, B, A = px[x, y]
            if not A:
                continue
            avg = (R + B) / 2
            if G <= avg:
                continue
            lum = (R * 0.3 + G * 0.59 + B * 0.11) / 255
            # full strength on dark hair and the cut-out edge, fading out by mid-tones
            k = 1.0 if near_edge[x, y] else max(0.0, min(1.0, (0.5 - lum) / 0.2))
            if mute_greens:
                k = max(k, 0.75)
            if k:
                px[x, y] = (R, round(G - (G - avg) * k), B, A)
    return out


def choke(im, px=1):
    # pull the cut-out edge in a little, so the leftover halo from the old background goes
    a = im.getchannel("A").filter(ImageFilter.MinFilter(px * 2 + 1)).filter(ImageFilter.GaussianBlur(0.6))
    out = im.copy()
    out.putalpha(a)
    return out


def on_circle(person, size=1200):
    # dark circle at the bottom, me on it, head allowed out of the top
    d = round(size * 0.72)
    cx, cy = size / 2, size - round(size * 0.02) - d / 2
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))

    # the circle: a soft dark grey, lighter towards the top left like a studio backdrop
    disc = Image.new("RGBA", (d, d), (0, 0, 0, 0))
    shade = ImageDraw.Draw(disc)
    for i in range(d // 2, 0, -1):
        t = i / (d / 2)
        g = round(26 + (62 - 26) * (1 - t))
        off = round((1 - t) * d * 0.12)
        shade.ellipse((d / 2 - i - off, d / 2 - i - off, d / 2 + i - off, d / 2 + i - off), fill=(g, g, g, 255))
    ring = Image.new("L", (d * 4, d * 4), 0)
    ImageDraw.Draw(ring).ellipse((0, 0, d * 4, d * 4), fill=255)
    disc.putalpha(ring.resize((d, d), Image.LANCZOS))
    canvas.alpha_composite(disc, (round(cx - d / 2), round(cy - d / 2)))

    # me: big enough that the top of the circle lands around mid forehead, bottom on the circle's bottom
    person = person.crop(person.getbbox())
    w = round(size * 0.93)
    h = round(person.height * w / person.width)
    person = person.resize((w, h), Image.LANCZOS)
    layer = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    layer.alpha_composite(person, (round(cx - w / 2), round(cy + d / 2 - h)))

    # keep everything inside the circle, plus the head and hair above its upper part.
    # shoulders stay clipped to the circle
    keep = Image.new("L", (size * 4, size * 4), 0)
    k = ImageDraw.Draw(keep)
    k.ellipse(((cx - d / 2) * 4, (cy - d / 2) * 4, (cx + d / 2) * 4, (cy + d / 2) * 4), fill=255)
    k.rectangle((0, 0, size * 4, (cy - d * 0.3) * 4), fill=255)
    keep = keep.resize((size, size), Image.LANCZOS)
    a = layer.getchannel("A")
    layer.putalpha(Image.composite(a, Image.new("L", (size, size), 0), keep))
    canvas.alpha_composite(layer)
    return canvas


def prepare(path, as_is=False, mute_greens=False):
    im = Image.open(path)
    if im.mode in ("RGBA", "LA") and im.getchannel("A").getextrema()[0] < 255:
        if not as_is:
            return on_circle(choke(despill(im.convert("RGBA"), mute_greens)))
        # already has its circle: trim the empty space and centre it on a square
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
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    if len(args) != 1:
        raise SystemExit(__doc__)
    im = prepare(args[0], as_is="--as-is" in sys.argv, mute_greens="--mute-greens" in sys.argv)
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
