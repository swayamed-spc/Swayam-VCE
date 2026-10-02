# Design system

Theme: punk, brutalist, space. Red on true black.

## Colours (CSS variables, `src/index.css`)
`--bg #000`, `--surface #060607`, `--line #1c1c21`, `--red #e11d2e`, `--red2 #ff2d40` (hover and accents),
`--deep #7f0f18` (shadows, glows), `--text #f5f5f5`, `--muted #9ca3af`.
Note: `html` carries the black background and `body` is transparent. If `body` gets a background it will hide the galaxy layer.

## Shapes
- Cards: 2px border, hard offset shadow `6px 6px 0 --deep`, red corner brackets (top-left, bottom-right).
  Hover lifts 3px and the shadow turns red.
- Buttons: cut-corner (`--cut` clip-path) with a small hard shadow. Ghost variant has a red outline.
- Headings: large condensed type with a thick red underline (`.h2`).

## Motion
Reveal on scroll (Framer Motion, once), hero glitch every 6s, count-up stats, page fade, scroll progress bar, galaxy.
All disabled for `prefers-reduced-motion`.

## Layout
`.wrap` max 1180px. `.grid` auto-fill 280px columns. `.split` is 2:1 and stacks under 900px. Nav collapses to a drawer under 800px.

## Logo
`src/assets/logo.png` is the supplied logo made transparent: white background removed, dark ink turned white, red ink brightened.
It was a 100x100 source scaled to 400x400, so edges are soft. Replace the file with a vector or high-resolution version for sharper results
(a white-on-transparent PNG or SVG). Used in the navbar, footer, hero and as `public/favicon.png`.

## Accessibility
Visible focus rings, labelled inputs, `role="alert"` errors, dialog semantics on the modal, reduced-motion support.
Known gaps: the registration modal does not trap focus or close on Escape yet.
