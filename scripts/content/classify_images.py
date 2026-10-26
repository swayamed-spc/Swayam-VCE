import os
from PIL import Image

def analyze(im_name):
    p = os.path.join('extracted_reports/images', im_name)
    im = Image.open(p)
    im_rgb = im.convert('RGB')
    stat = im_rgb.resize((50, 50))
    pixels = list(stat.getdata())
    diff = sum(abs(r-g) + abs(g-b) for r,g,b in pixels) / len(pixels)
    return diff, im.size

for prefix in ['2024-2025_01', '2024-2025_02', '2024-2025_03', '2024-2025_04', '2024-2025_05', '2024-2025_06', '2024-2025_07', '2024-2025_08', '2024-2025_11', '2018-2020_design_thinking_2019', '2018-2020_tie_idea_coach_2019']:
    print(f'=== {prefix} ===')
    for f in sorted(os.listdir('extracted_reports/images')):
        if f.startswith(prefix):
            diff, size = analyze(f)
            label = "PHOTO" if (diff > 12 and size[0] >= 300 and size[1] >= 200 and max(size)/min(size) < 2.5) else "DOC/ICON/OTHER"
            print(f'  {f:40s} | {size[0]:4d}x{size[1]:4d} | diff={diff:5.1f} | {label}')
