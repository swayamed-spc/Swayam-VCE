# Design system

Black and amber, editorial and calm: large display type, thin divider lines, generous spacing, very little motion.
Reference mock-up: `docs/design/swayam-ecell-design.html` (open it in a browser). Every style lives in
`frontend/src/index.css`, in numbered sections; pages use its classes, never inline styles (the only exceptions are
computed values such as a seat bar's width).

## Colours (CSS variables at the top of `index.css`)
| Token | Value | Use |
|---|---|---|
| `--bg` | `#000` | Page background |
| `--surface` | `#0a0a0a` | Cards |
| `--fg` | `#f4f4f2` | Text |
| `--mute` | `#8c8c8c` | Secondary text (6.6:1 on black) |
| `--line` / `--line-strong` | `#262626` / `#3a3a3a` | Dividers, borders, inputs |
| `--a` | `#ff9f1c` | Accent (amber): buttons, active states, numbers, highlights |
| `--ab` | `#000` | Text on the accent |
| `--danger` / `--ok` | `#ff6b6b` / `#4ade80` | Errors and confirmations only |

To try another accent, change `--a` (and `--ab` if the new colour is dark: use `#fff`). The design file has a colour
picker for previewing options.

## Typography
Two Google Fonts, loaded in `frontend/index.html`: **Bricolage Grotesque** (600, 700) for headings and numbers
(`--d`), and **DM Sans** (400, 500, 700) for everything else (`--b`, 17px base). Details: `docs/FONTS.md`.
Headings use tight letter-spacing (−0.02em to −0.045em at hero size). Numbers use tabular figures.

## Layout and spacing
- Container `.w`: 1120px wide with 24px side gutters (16px under 480px).
- Sections `.sec`: 80px vertical padding, separated by a 1px line. Pages `.page`: 64px top, 96px bottom.
- `.split` (2:1 main and side panel) and `.two` stack into one column under 900px. The navigation turns into a
  Menu button under 820px.
- Lists are rows separated by lines (`.rows`, `.ticket-list`, `.timeline`, `.voices`) rather than boxed cards;
  cards (`.card`, `.panel`) are used for side panels, wings and faculty.

## Components
- **Buttons** `.btn` (amber pill), `.btn--ghost` (outline), `.btn--sm`, `.btn--block`, `.btn--google`.
- **Chips** `.chip` with `aria-pressed` for filters; **tabs** `.tab` with `aria-current="page"`.
- **Pills** `.pill` (`--accent`, `--ok`, `--danger`) for statuses such as Open, Confirmed, Refund due.
- **Event row** (`EventRow.jsx`): date, title, price and status; click to expand details and actions. A 2px amber
  seat bar under live events.
- **Event card** (`EventFrame.jsx`): photo, big date, title; used in the home page strip.
- **Dialog** `Modal` in `ui.jsx`: closes with Escape or a backdrop click, returns focus afterwards.
- **Alerts** `.alert--error`, `--ok`, `--info`; **empty states** `.empty` with a next step, never a dead end.

## Motion
Kept deliberately small: a soft amber light and dot grid that follow the pointer (`Spotlight.jsx`, mouse only), a
short fade-up on the hero, and the expanding event rows. Everything is switched off with `prefers-reduced-motion`.
The home page "Our Vision in Action" section is a static, archive-style record (`.record`): one row per stage, with
the events that document it linked on the right.

## Logo
The navbar and footer use the text wordmark "Swayam E-Cell", as in the design. The red bulb logo
(`src/assets/swayam-logo.png`) is used for the favicon only, because its red clashes with the amber accent. See issue
"Add the official logo" in `docs/GITHUB_ISSUES.md` if a recoloured version is made.

## Accessibility
Skip link, visible focus rings, labelled inputs, `role="alert"` errors, breadcrumbs, `aria-expanded` on expandable
rows, dialog semantics, alt text on photos, keyboard-scrollable strip, and sufficient contrast for muted text.
Checked at 1440px and 390px with no sideways scrolling.
