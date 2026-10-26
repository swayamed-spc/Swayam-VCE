import os
from PIL import Image

def get_images_for(prefix):
    res = []
    for f in sorted(os.listdir('extracted_reports/images')):
        if f.startswith(prefix):
            p = os.path.join('extracted_reports/images', f)
            try:
                with Image.open(p) as img:
                    w, h = img.size
                    if w >= 300 and h >= 200:
                        res.append((f, w, h, os.path.getsize(p)/1024))
            except Exception:
                pass
    return res

events = [
    ('future-4-conclave', '2024-2025_01'),
    ('thalir-innovation-fest', '2024-2025_02'),
    ('trailblazer-talk', '2024-2025_03'),
    ('civeng-hackathon', '2024-2025_06'),
    ('patangotsav', '2024-2025_07'),
    ('venture-visit-t-works', '2024-2025_08'),
    ('esummit-2025', '2024-2025_11'),
    ('tie-idea-coach', '2018-2020_tie_idea_coach_2019'),
    ('design-thinking', '2018-2020_design_thinking_2019')
]

for ev_name, pfx in events:
    imgs = get_images_for(pfx)
    print(f"\n=== {ev_name} ({len(imgs)} candidate photos) ===")
    for im, w, h, kb in imgs:
        print(f"  {im:42s} | {w:4d}x{h:4d} | {kb:5.1f} KB")
