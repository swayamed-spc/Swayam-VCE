# Content guide (for the engineering team)

There are two kinds of content:

- **Live events** (open for registration) are created through the API by an admin or event head
  (`POST /api/events`, see `docs/BACKEND.md`). They appear on the site automatically.
- **Everything else** is static data in `frontend/src/data/`. Edit, check, commit, deploy.

After editing, run `npm run check:data` and `npm run check:render` in `frontend/`.

## `src/data/site.js`
| Export | What it drives |
|---|---|
| `club` | Name, tagline, college, vision, mission, about text, `email` and `phone` (the only contact details shown: footer, Partner panel, About), `socials` (links with `u: '#'` are hidden). `address` is kept but not displayed |
| `institutionalBackbone` | Founder, faculty coordinator and institution cards on About |
| `stats` | `{ n, s, l }`: number, suffix, label. Not shown at the moment |
| `pillars` | "What we do" on Home and About |
| `quotes` | Vision and mission on About |
| `lifecycleStages` | "Our Vision in Action" on Home: `stage`, `subtitle`, `description`, and `events` (archive slugs, linked under "Documented in"). `npm run check:render` fails if a slug doesn't exist |
| `industryVoices` | "Voices from the stage" on Home |
| `leadership` | President and vice president, with photos, on About |
| `departments` | The 8 wings: About cards and `/teams/:id` pages (heads with photos, responsibilities, `work` items) |
| `sponsors` | `[{ name, url }]`. The "Backed by" section on Home appears once this has entries |
| `faq` | `[{ q, a }]`. The "Questions" section on Home appears once this has entries |

## `src/data/events.js` (the event archive)
Each event is an object in `pastEvents` (or `upcomingEvents` / `ongoingEvents`, normally empty: upcoming events come
from the API). Required: `slug` (unique, becomes `/events/<slug>`), `name`, `category`, `status`, `academicYear`,
`date` (`YYYY-MM-DD`), `summary`. Everything else is optional and shows on the event page only when present:

`dateDisplay`, `time` / `duration`, `venue`, `mode`, `fee`, `participants`, `poster` (imported image), `about`,
`objectives[]`, `flow[{ day, events }]` (Schedule), `activities[{ name, description }]`, `rules[]`, `highlights[]`,
`speakers[{ name, role }]`, `totalPrizePool`, `winners[{ event, first, firstAmount, second, secondAmount, third,
thirdAmount, pool }]`, `prizeNote`, `outcomes`, `feedback`, `conclusion`, `gallery[{ img, caption }]`,
`jointOrganizers`, `coordinator`, `supervision`, `officialReportUrl`, `photosLink`, `officialWebsiteUrl`,
`externalLinks[{ title, url }]`, `sourceNote`, `aliases[]` (old slugs that should still work).

Categories become the filter chips on the Events page. The About timeline groups events by `academicYear`
automatically.

## Images
Put images in `src/assets/events/` or `src/assets/team/` as `.webp` (keep them under ~250 kB; the conversion scripts
are in `scripts/content/`), import them at the top of the data file, and reference the import. Every gallery photo
needs a `caption`, which is also its alt text.

## Sources
The original reports behind the archive are in `docs/events/`, research notes in `docs/research/`, and the audit of
which facts come from which source in `docs/EVENT_SOURCE_INTEGRITY_AUDIT.md`.
