# Content pipeline scripts

One-off Python scripts that were used to build the event archive (`frontend/src/data/events.js`) from the official
reports in `docs/events/`: extracting text and images from the PDFs and Word files, cataloguing and classifying photos,
converting them to `.webp`, generating and fixing `events.js`, and checking slugs.

They are kept for reference and for repeating the process. They were written for the folder layout of the original
working copy, so check the input and output paths at the top of each script before running one. Their raw outputs
(`extracted_reports/`, `all_reports_dump.txt`) were moved to `Desktop/swayam-archive/content-extraction/`.

| Script | Purpose |
|---|---|
| `extract_all_reports.py` | Extract text and images from the report PDFs and documents |
| `analyze_reports.py`, `show_report.py` | Inspect extracted report text |
| `catalog_images.py`, `classify_images.py` | List and sort extracted photos |
| `convert_images.py` | Convert photos to compressed `.webp` |
| `generate_events_js.py`, `fix_events_js.py` | Generate and patch `frontend/src/data/events.js` |
| `verify_slugs.py` | Check event slugs are unique and valid |
| `inspect_drive.py` | Inspect the shared Drive export |
