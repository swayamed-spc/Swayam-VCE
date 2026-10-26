import os

report_files = sorted(os.listdir('extracted_reports'))

with open('all_reports_dump.txt', 'w', encoding='utf-8') as out:
    for f in report_files:
        if not f.endswith('.txt'):
            continue
        p = os.path.join('extracted_reports', f)
        with open(p, 'r', encoding='utf-8', errors='replace') as fh:
            text = fh.read()
        out.write("=" * 70 + "\n")
        out.write(f"FILE: {f} ({len(text)} characters)\n")
        out.write("=" * 70 + "\n")
        out.write(text + "\n\n")
        out.write("#" * 70 + "\n\n")
print("Saved all_reports_dump.txt")
