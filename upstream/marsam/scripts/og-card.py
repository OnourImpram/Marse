"""Build the 1200x630 social preview card from the portal artwork the site actually shows.

The source is the continuous portal SVG used on the home page (its marbled band is repaired;
the older approved-portal-960.webp raster still carries the broken first curve). The SVG is
rasterised unchanged in headless Chromium, then placed with a uniform downscale only (no crop,
stretch or recolour) on a paper background sampled from its own outer edge.
Usage: python scripts/og-card.py  ->  public/assets/og-card.jpg  (needs: pip install playwright pillow)
"""
import io
import pathlib
from PIL import Image
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "public/assets/heritage/portal-continuous-v1.svg"
OUT = ROOT / "public/assets/og-card.jpg"
W, H, SIDE, RENDER = 1200, 630, 566, 960

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": RENDER, "height": RENDER})
    page.goto(SRC.as_uri())
    png = page.screenshot(clip={"x": 0, "y": 0, "width": RENDER, "height": RENDER})
    browser.close()

art = Image.open(io.BytesIO(png)).convert("RGB")
edge = [art.getpixel((x, y)) for x in (2, art.width - 3) for y in (2, art.height - 3)]
paper = tuple(sum(c[i] for c in edge) // len(edge) for i in range(3))
card = Image.new("RGB", (W, H), paper)
card.paste(art.resize((SIDE, SIDE), Image.LANCZOS), ((W - SIDE) // 2, (H - SIDE) // 2))
card.save(OUT, "JPEG", quality=88, optimize=True, progressive=True)
print(OUT.relative_to(ROOT), card.size, "paper", paper, "bytes", OUT.stat().st_size)
