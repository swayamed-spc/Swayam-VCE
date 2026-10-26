import os, zipfile, xml.etree.ElementTree as ET
from pypdf import PdfReader
from PIL import Image
import io

os.makedirs('extracted_reports', exist_ok=True)
os.makedirs('extracted_reports/images', exist_ok=True)

def extract_from_docx(docx_path, out_prefix):
    txt_lines = []
    img_count = 0
    try:
        with zipfile.ZipFile(docx_path) as z:
            # text
            xml_content = z.read('word/document.xml')
            tree = ET.fromstring(xml_content)
            for p in tree.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
                p_text = ''.join(node.text for node in p.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if node.text)
                if p_text.strip():
                    txt_lines.append(p_text.strip())
            # images
            for fname in z.namelist():
                if fname.startswith('word/media/'):
                    img_data = z.read(fname)
                    img_ext = os.path.splitext(fname)[1]
                    img_count += 1
                    img_out = os.path.join('extracted_reports/images', f"{out_prefix}_img_{img_count}{img_ext}")
                    with open(img_out, 'wb') as img_f:
                        img_f.write(img_data)
    except Exception as e:
        txt_lines.append(f"Error: {e}")
    
    txt_path = os.path.join('extracted_reports', f"{out_prefix}.txt")
    with open(txt_path, 'w', encoding='utf-8') as f:
        f.write('\n\n'.join(txt_lines))
    return len(txt_lines), img_count

def extract_from_pdf(pdf_path, out_prefix):
    txt_lines = []
    img_count = 0
    try:
        reader = PdfReader(pdf_path)
        for i, page in enumerate(reader.pages):
            t = page.extract_text()
            if t:
                txt_lines.append(f"=== Page {i+1} ===\n" + t)
            # extract images from page
            for img_name, img_obj in page.images.items():
                img_count += 1
                img_ext = os.path.splitext(img_name)[1] or '.png'
                img_out = os.path.join('extracted_reports/images', f"{out_prefix}_img_{img_count}{img_ext}")
                with open(img_out, 'wb') as img_f:
                    img_f.write(img_obj.data)
    except Exception as e:
        txt_lines.append(f"Error: {e}")
    
    txt_path = os.path.join('extracted_reports', f"{out_prefix}.txt")
    with open(txt_path, 'w', encoding='utf-8') as f:
        f.write('\n\n'.join(txt_lines))
    return len(txt_lines), img_count

manifest = []

# 2024-2025
pdf_dir = r"Swayam-VCE/docs/events/2024-2025"
for f in sorted(os.listdir(pdf_dir)):
    if f.endswith('.pdf'):
        p = os.path.join(pdf_dir, f)
        prefix = f"2024-2025_{os.path.splitext(f)[0]}"
        lines, imgs = extract_from_pdf(p, prefix)
        manifest.append(f"{prefix}: {lines} lines, {imgs} images")

# 2018-2020
rep_dir = r"Swayam-VCE/docs/events/2018-2020"
for f in sorted(os.listdir(rep_dir)):
    p = os.path.join(rep_dir, f)
    prefix = f"2018-2020_{f}"
    if f.endswith('.pdf') or 'orientation' in f:
        lines, imgs = extract_from_pdf(p, prefix)
    elif 'internship' not in f:
        lines, imgs = extract_from_docx(p, prefix)
    else:
        continue
    manifest.append(f"{prefix}: {lines} lines, {imgs} images")

# E-Summit 2026 docx
es26_path = r"Swayam-VCE/docs/events/Event Report E-Summit 2026 (1).docx"
if os.path.exists(es26_path):
    lines, imgs = extract_from_docx(es26_path, "2025-2026_esummit2026")
    manifest.append(f"2025-2026_esummit2026: {lines} lines, {imgs} images")

print("MANIFEST OF EXTRACTED REPORTS:")
for m in manifest:
    print(m)
