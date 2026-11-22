"""
the look, in one place. colours and fonts match the site (src/config/theme.js, src/assets/fonts).
used by scripts/brand/make.py (banners, posts, profile picture) and scripts/photo/card.py (link preview).
only the profile picture uses my photo, everything else is text.
"""
import os

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
FONTS = os.path.join(ROOT, "src", "assets", "fonts")
PHOTO = os.path.join(ROOT, "public", "profile.png")

BG = (18, 18, 18)  # #121212
TEXT = (224, 224, 224)  # #E0E0E0
MUTED = (150, 150, 150)  # #969696
RED = (179, 0, 0)  # #b30000, the site's accent. used small: the rule, a kicker, a ring
GLOW = (44, 10, 10)  # the soft patch behind the text, kept faint
RING = (125, 12, 12)  # darker red for the profile picture ring

NAME = "Aju Ani Justus"
ROLE = "Doctoral Researcher"
PLACE = "University of Birmingham"
AREAS = ["multi-agent reinforcement learning", "agent communication · human-agent teaming"]
URL = "ajuanijustus.com"


def font(weight, size):
    files = {"bold": "GoogleSans-Bold.ttf", "medium": "GoogleSans-Medium.ttf", "regular": "GoogleSans-Regular.ttf", "sign": "Agustina.woff"}
    return ImageFont.truetype(os.path.join(FONTS, files[weight]), size)


def canvas(w, h, glow=None, blur=90):
    # dark background, optionally with a soft red glow (an ellipse box) behind something
    img = Image.new("RGB", (w, h), BG)
    if glow:
        g = Image.new("RGB", (w, h), BG)
        ImageDraw.Draw(g).ellipse(glow, fill=GLOW)
        img = Image.blend(img, g.filter(ImageFilter.GaussianBlur(blur)), 1.0)
    return img


def cutout(height):
    # my photo with the empty space trimmed off, scaled to a height
    p = Image.open(PHOTO).convert("RGBA")
    p = p.crop(p.getbbox())
    return p.resize((round(p.width * height / p.height), height), Image.LANCZOS)


def rule(d, x, y, s=1.0):
    # the short red line above a heading
    d.rectangle((x, y, x + round(64 * s), y + max(3, round(6 * s))), fill=RED)


def wrap(text, f, width):
    # break text into lines that fit a pixel width
    words, lines, line = text.split(), [], ""
    for w in words:
        test = f"{line} {w}".strip()
        if f.getlength(test) <= width or not line:
            line = test
        else:
            lines.append(line)
            line = w
    if line:
        lines.append(line)
    return lines


def hero(w=1200, h=630, photo=False):
    """
    the main layout: red rule, name, role, place, research areas, url, with a faint glow
    behind the text and the signature in the corner. at 1200x630 this is the link preview card.
    photo=True puts the cut-out on the right instead of the signature.
    """
    s = h / 630
    px = lambda v: round(v * s)
    img = canvas(w, h, (-px(260), px(60), px(820), px(620)), blur=px(160))
    if photo:
        ph = px(470)
        p = cutout(ph)
        img.paste(p, (w - p.width - px(70), (h - ph) // 2 + px(10)), p)
    d = ImageDraw.Draw(img)
    x = px(80)
    rule(d, x, px(150), s)
    d.text((x, px(180)), NAME, font=font("bold", px(76)), fill=TEXT)
    d.text((x, px(285)), ROLE, font=font("medium", px(36)), fill=TEXT)
    d.text((x, px(332)), PLACE, font=font("regular", px(34)), fill=MUTED)
    d.text((x, px(420)), AREAS[0], font=font("regular", px(27)), fill=MUTED)
    d.text((x, px(456)), AREAS[1], font=font("regular", px(27)), fill=MUTED)
    d.text((x, px(540)), URL, font=font("medium", px(28)), fill=MUTED)
    if not photo:
        f = font("sign", px(64))
        signature(img, (w - px(80) - f.getlength("AjuAniJustus"), h - px(130)), px(64), fill=(70, 70, 70))
    return img


def strip(w, h, left, right=None, top=None, glow=None, bottom=None):
    """
    a wide, short banner. the text block sits between `left` and `right` (pixels),
    vertically centred in the band from `top` to `bottom` (default the full height).
    the glow sits behind the text.
    """
    right = right or w - round(h * 0.2)
    top = top or 0
    band = (bottom or h) - top
    s = band / 396
    px = lambda v: round(v * s)
    img = canvas(w, h, glow or (left - px(240), top + px(10), left + px(760), top + band - px(10)), blur=px(130))
    d = ImageDraw.Draw(img)
    name_f, role_f, area_f, url_f = font("bold", px(64)), font("medium", px(28)), font("regular", px(22)), font("medium", px(22))
    block_h = px(64 + 18 + 28 + 26 + 22 + 8 + 22)
    y = top + (band - block_h) // 2
    rule(d, left, y - px(22), s * 0.8)
    d.text((left, y), NAME, font=name_f, fill=TEXT)
    y += px(64 + 18)
    d.text((left, y), f"{ROLE} · {PLACE}", font=role_f, fill=TEXT)
    y += px(28 + 26)
    d.text((left, y), AREAS[0], font=area_f, fill=MUTED)
    y += px(22 + 8)
    d.text((left, y), AREAS[1], font=area_f, fill=MUTED)
    d.text((right - url_f.getlength(URL), top + band - px(48)), URL, font=url_f, fill=MUTED)
    return img


def post(w, h, title, kicker=None):
    """
    a post image: optional small kicker, a big title, my name and url at the bottom.
    no photo, the profile picture is already next to every post.
    """
    s = w / 1080
    px = lambda v: round(v * s)
    x, maxw = px(90), w - px(180)
    size = px(84) if h > w else px(64)
    title_f = font("bold", size)
    lines = wrap(title, title_f, maxw)
    while len(lines) > (6 if h > w else 4) and size > px(40):
        size -= px(4)
        title_f = font("bold", size)
        lines = wrap(title, title_f, maxw)
    line_h = round(size * 1.18)
    # centre the rule, kicker and title in the space above the footer
    block = px(48) + (px(62) if kicker else 0) + line_h * len(lines)
    space = h - px(150)
    y = max(px(90), (space - block) // 2)
    img = canvas(w, h, (-px(240), y - px(140), x + maxw * 0.8, y + block + px(140)), blur=px(150))
    d = ImageDraw.Draw(img)
    rule(d, x, y, s)
    y += px(48)
    if kicker:
        d.text((x, y), kicker.lower(), font=font("medium", px(30)), fill=RED)
        y += px(62)
    for line in lines:
        d.text((x, y), line, font=title_f, fill=TEXT)
        y += line_h
    foot_y = h - px(120)
    d.line((x, foot_y - px(30), w - x, foot_y - px(30)), fill=(48, 48, 48), width=max(1, px(2)))
    d.text((x, foot_y), NAME, font=font("medium", px(28)), fill=TEXT)
    url_f = font("regular", px(26))
    d.text((w - x - url_f.getlength(URL), foot_y + px(2)), URL, font=url_f, fill=MUTED)
    return img


def avatar(size=800):
    # profile picture: the photo on the dark background with a thin dark-red ring round the circle
    img = canvas(size, size)
    p = cutout(round(size * 0.86))
    x, y = (size - p.width) // 2, size - p.height - round(size * 0.04)
    # the circle in the cut-out is as wide as the image and sits at its bottom
    r = p.width / 2
    cx, cy = x + r, y + p.height - r
    d = ImageDraw.Draw(img)
    pad = round(size * 0.016)
    d.ellipse((cx - r - pad, cy - r - pad, cx + r + pad, cy + r + pad), outline=RING, width=max(2, round(size * 0.005)))
    img.paste(p, (x, y), p)
    return img


def signature(img, xy, size, fill=TEXT):
    # the handwritten "AjuAniJustus" logo from the site header
    ImageDraw.Draw(img).text(xy, "AjuAniJustus", font=font("sign", size), fill=fill)
    return img


def save(img, path):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    if path.endswith(".jpg"):
        img.convert("RGB").save(path, quality=88, optimize=True, progressive=True)
    else:
        img.save(path, optimize=True)
    print("  ", os.path.relpath(path, ROOT), f"{img.width}x{img.height}")

