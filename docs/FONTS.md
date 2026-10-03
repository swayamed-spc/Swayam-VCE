# Fonts

## Loading
`src/fonts.js` scans `src/assets/fonts/` for `.otf .ttf .woff .woff2` and registers each by matching a keyword in the file name:
`milker`, `pillar`, `rush`, `graen`, `eroded`, `dream` (case and punctuation ignored).
Examples that work: `Pillar-Regular.otf`, `Dream Kudos.otf`. Restart `npm run dev` after adding files.
The console warns if no files are found or a file name is not recognised.

## Fallbacks
Until real files exist, Google Fonts stand-ins (linked in `index.html`) are used: Anton, Archivo Black, Russo One, Metal Mania,
Rubik Distressed, Bungee. The real font always wins when present. Stand-ins need an internet connection.
For production, self-host the fonts and remove the Google link if privacy or speed matters.

## Roles
| Variable | Font | Where it is used |
|---|---|---|
| `--f-hero` | Pillar | Hero title, "Upcoming events", About title, Dashboard greeting, 404, manifesto line 1 |
| `--f-head` | Milker | Nav links, filters, "What we do", footer headings, Speaker card titles, ticket event name, default h2/h3 |
| `--f-accent` | Rush Driver Italic | Buttons, badges, hero tagline, Events page title, stat labels, Competition card titles |
| `--f-gothic` | Graen Metal | Event poster names, pillar cards |
| `--f-grunge` | Eroded Personal Use | Stat numbers, timeline years, "Our journey", manifesto line 2 |
| `--f-fun` | Dream Kudos | "Core team", avatars, Workshop card titles, manifesto line 3 |

To change a role edit the variable list at the top of `src/index.css`, or set `fontFamily: 'var(--f-...)'` inline.

## Licences
Several of these fonts are free for personal use only (Eroded Personal Use is in its name). Buy or confirm a commercial licence
before launching publicly.

Dystopian Canticle was removed from the project (see CHANGELOG v1.5). If its file is still in `src/assets/fonts`, delete it.
