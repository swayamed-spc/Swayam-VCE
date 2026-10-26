import re
with open(r'Swayam-VCE/docs/events/2018-2020/internship_drive_2019', 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()
print('Title:', re.findall(r'<title>(.*?)</title>', html))
print('Any download links:')
for m in re.finditer(r'href="([^"]+)"', html):
    link = m.group(1)
    if 'download' in link or 'drive' in link:
        print(link)
