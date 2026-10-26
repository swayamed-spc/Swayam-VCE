# Fonts

The site uses **two Google Fonts**, both under the SIL Open Font License (free for commercial use):

| Font | Weights | CSS variable | Used for |
|---|---|---|---|
| Bricolage Grotesque | 600, 700 | `--d` | Headings, the wordmark, big numbers (stats, dates, countdown, prices) |
| DM Sans | 400, 500, 700 | `--b` | Body text, buttons, forms, navigation |

They are loaded by one `<link>` in `frontend/index.html` (with `display=swap`, so text shows immediately in a fallback
font). Fallbacks: `'Helvetica Neue', Arial, sans-serif` for headings and `system-ui` for body text.

No font files are kept in the repository. The earlier six display fonts and the custom-font loader (`fonts.js`) were
removed with the redesign; the loader is kept in `Desktop/swayam-archive/unused-frontend-files/fonts/`.

To self-host instead of using Google's servers (faster, no third-party request), install `@fontsource/bricolage-grotesque`
and `@fontsource/dm-sans`, import them in `src/main.jsx`, and remove the Google Fonts link.
