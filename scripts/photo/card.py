"""
the link preview card (whatsapp, linkedin, x...). the layout lives in scripts/brand/brand.py.

  python3 scripts/photo/card.py . public/og-card.jpg
"""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "brand"))
import brand  # noqa: E402

out = sys.argv[2] if len(sys.argv) > 2 else os.path.join(brand.ROOT, "public", "og-card.jpg")
brand.hero(1200, 630).convert("RGB").save(out, quality=88, optimize=True, progressive=True)
