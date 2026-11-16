import sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter
root, out = sys.argv[1], sys.argv[2]  # python3 scripts/photo/card.py . public/og-card.jpg
F = root + "/src/assets/fonts/"
W, H = 1200, 630
BG, TEXT, MUTED, RED = (18, 18, 18), (224, 224, 224), (150, 150, 150), (179, 0, 0)
card = Image.new("RGB", (W, H), BG)

# soft red glow behind the photo
glow = Image.new("RGB", (W, H), BG)
gd = ImageDraw.Draw(glow)
gd.ellipse((790, 90, 1170, 470), fill=(70, 8, 8))
card = Image.blend(card, glow.filter(ImageFilter.GaussianBlur(90)), 1.0)

photo = Image.open(root + "/public/profile.png").convert("RGBA")
photo = photo.crop(photo.getbbox())
ph = 470
photo = photo.resize((round(photo.width * ph / photo.height), ph), Image.LANCZOS)
card.paste(photo, (W - photo.width - 70, (H - ph) // 2 + 10), photo)

d = ImageDraw.Draw(card)
bold = lambda s: ImageFont.truetype(F + "GoogleSans-Bold.ttf", s)
reg = lambda s: ImageFont.truetype(F + "GoogleSans-Regular.ttf", s)
med = lambda s: ImageFont.truetype(F + "GoogleSans-Medium.ttf", s)
x = 80
d.rectangle((x, 150, x + 64, 156), fill=RED)
d.text((x, 180), "Aju Ani Justus", font=bold(76), fill=TEXT)
d.text((x, 285), "Doctoral Researcher", font=med(36), fill=TEXT)
d.text((x, 332), "University of Birmingham", font=reg(34), fill=MUTED)
d.text((x, 420), "multi-agent reinforcement learning", font=reg(27), fill=MUTED)
d.text((x, 456), "agent communication · human-agent teaming", font=reg(27), fill=MUTED)
d.text((x, 540), "ajuanijustus.com", font=med(28), fill=RED)
card.save(out, quality=88, optimize=True, progressive=True)
