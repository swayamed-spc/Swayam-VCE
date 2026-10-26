import os, sys
sys.stdout.reconfigure(encoding='utf-8')

def show(fname):
    p = os.path.join('extracted_reports', fname)
    if not os.path.exists(p):
        print(f"File {fname} not found")
        return
    with open(p, 'r', encoding='utf-8', errors='replace') as f:
        print(f"==================== {fname} ====================")
        print(f.read())

import sys
if len(sys.argv) > 1:
    show(sys.argv[1])
else:
    for f in sorted(os.listdir('extracted_reports')):
        if f.endswith('.txt'):
            show(f)
