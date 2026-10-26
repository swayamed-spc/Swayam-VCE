import re

with open(r'Swayam-VCE/frontend/src/data/events.js', 'r', encoding='utf-8') as f:
    text = f.read()

slugs = re.findall(r"slug:\s*'([^']+)'", text)
print(f"Total slugs found: {len(slugs)}")
for i, s in enumerate(slugs, 1):
    print(f"{i:2d}. {s}")
