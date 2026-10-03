# Fonts

## Loading
`src/fonts.js` scans `src/assets/fonts/` for `.otf .ttf .woff .woff2` and registers each by matching a keyword in the file name:
`milker`, `pillar`, `rush`, `graen`, `dystopian`, `eroded`, `dream` (case and punctuation ignored).
Examples that work: `Pillar-Regular.otf`, `DystopianCanticle.ttf`, `Dream Kudos.otf`. Restart `npm run dev` after adding files.
The console warns if no files are found or a file name is not recognised.

## Fallbacks
Until real files exist, Google Fonts stand-ins (linked in `index.html`) are used: Anton, Archivo Black, Russo One, Metal Mania,
Pirata One, Rubik Distressed, Bungee. The real font always wins when present. Stand-ins need an internet connection.
For production, self-host the fonts and remove the Google link if privacy or speed matters.

## Roles
| Variable | Font | Where it is used |
|---|---|---|
| `--f-hero` | Pillar | Hero title, "Upcoming events", Dashboard greeting, 404, manifesto line 1 |
| `--f-head` | Milker | Nav links, filters, default card titles, most h2/h3 |
| `--f-accent` | Rush Driver Italic | Buttons, badges, Events page title, stat labels, Competition card titles |
| `--f-gothic` | Graen Metal | About page title, event poster names, pillar cards |
| `--f-canticle` | Dystopian Canticle | Hero tagline, "What we do", footer headings, ticket event name, Speaker card titles |
| `--f-grunge` | Eroded Personal Use | Stat numbers, timeline years, "Our journey", manifesto line 2 |
| `--f-fun` | Dream Kudos | "Core team", avatars, Workshop card titles, manifesto line 3 |

To change a role edit the variable list at the top of `src/index.css`, or set `fontFamily: 'var(--f-...)'` inline.

## Licences
Several of these fonts are free for personal use only (Eroded Personal Use is in its name). Buy or confirm a commercial licence
before launching publicly.
