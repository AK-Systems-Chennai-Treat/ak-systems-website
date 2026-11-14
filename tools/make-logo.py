"""Makes the website logo files from the master logo PNG (dark background).

Usage: python3 tools/make-logo.py brand/ak-systems-logo.png
Needs: pip install pillow numpy scipy
Writes into src/assets: logo-mark.(png|webp), logo-full.(png|webp), favicon-32.png,
icon-192.png, icon-512.png, apple-touch-icon.png, og-image.jpg.
"""
import sys
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage

SRC = sys.argv[1]
A = 'src/assets/'
o = Image.open(SRC).convert('RGB')
a = np.asarray(o).astype(float)

# Remove the dark background: alpha from brightness above the background colour.
bg = np.median(np.concatenate([a[:40].reshape(-1, 3), a[-40:].reshape(-1, 3)]), axis=0)
alpha = np.clip((np.clip(a - bg, 0, None).max(axis=2) - 6) / 90, 0, 1)
col = np.clip(np.where(alpha[..., None] > 0.02, (a - bg * (1 - alpha[..., None])) / np.maximum(alpha[..., None], 1e-3), 0), 0, 255)
im = Image.fromarray(np.dstack([col, alpha * 255]).astype(np.uint8), 'RGBA')

# Full lockup (letters, swoosh and SYSTEMS), trimmed.
bb = Image.fromarray((alpha > 0.3).astype(np.uint8) * 255).getbbox()
full = im.crop((bb[0] - 12, bb[1] - 12, bb[2] + 12, bb[3] + 12))

# "AK" letters only: crop the letter area and keep only the big shapes (drops swoosh bits).
# The box is for the 1536x1024 master; adjust it if the master changes.
m = np.asarray(im.crop((350, 272, 1205, 625))).copy()
lab, n = ndimage.label(m[..., 3] > 110)
sizes = ndimage.sum(np.ones_like(lab), lab, range(1, n + 1))
keep = ndimage.binary_dilation(np.isin(lab, [i + 1 for i in range(n) if sizes[i] > 3000]), iterations=6)
m[~keep, 3] = 0
mark = Image.fromarray(m, 'RGBA')
mark = mark.crop(mark.getbbox())


def save(img, name):
    img.save(A + name + '.png', optimize=True)
    img.save(A + name + '.webp', 'WEBP', quality=90)


save(mark.resize((round(mark.width * 96 / mark.height), 96), Image.LANCZOS), 'logo-mark')
save(full.resize((600, round(full.height * 600 / full.width)), Image.LANCZOS), 'logo-full')


def icon(size, radius):
    c = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    ImageDraw.Draw(c).rounded_rectangle((0, 0, size - 1, size - 1), radius=radius, fill='#0B1230')
    w = int(size * 0.84)
    mm = mark.resize((w, round(mark.height * w / mark.width)), Image.LANCZOS)
    c.alpha_composite(mm, ((size - mm.width) // 2, (size - mm.height) // 2))
    return c


icon(512, 96).save(A + 'icon-512.png', optimize=True)
icon(192, 36).save(A + 'icon-192.png', optimize=True)
icon(32, 6).save(A + 'favicon-32.png', optimize=True)
icon(180, 0).convert('RGB').save(A + 'apple-touch-icon.png', optimize=True)

# Link preview image, 1200x630, from the middle of the master.
h = round(o.width * 630 / 1200)
top = (o.height - h) // 2
o.crop((0, top, o.width, top + h)).resize((1200, 630), Image.LANCZOS).save(A + 'og-image.jpg', quality=86)
print('done')
