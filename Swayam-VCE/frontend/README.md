# Swayam E-Cell Website

Public website and event registration platform for **Swayam**, the college Entrepreneurship Cell.
Built with React, Vite, Framer Motion and Lenis smooth scrolling. Red and black theme.

## What is included

| Page | Route | Purpose |
|---|---|---|
| Home | `/` | Hero, live stats, upcoming events, what we do, fonts row, call to action |
| Events | `/events` | Search and filter by category and price |
| Event detail | `/events/:slug` | About, schedule, rules, prizes, seat counter, register button |
| About and team | `/about` | Story timeline and core team |
| Log in, Sign up | `/login`, `/signup` | Student accounts |
| My tickets | `/dashboard` | Student's registrations |
| Ticket | `/ticket/:code` | QR ticket, printable |

There is **no admin interface** in the website. Events, team and club details are managed by the
engineering team in code (see below), and check-in tooling belongs in the backend.

## Documentation

Detailed docs are in the `docs/` folder.

| File | Contents |
|---|---|
| `docs/ARCHITECTURE.md` | Stack, folders, routes, registration flow |
| `docs/DESIGN_SYSTEM.md` | Colours, shapes, motion, logo, accessibility |
| `docs/FONTS.md` | How fonts load, where each is used, licences |
| `docs/BACKGROUND_ENGINE.md` | Galaxy background, scroll force, planets, tuning |
| `docs/CONTENT_GUIDE.md` | How to edit events, team, stats |
| `docs/BACKEND_INTEGRATION.md` | Replacing the mocks with a real API |
| `docs/TROUBLESHOOTING.md` | Common problems and fixes |
| `docs/CHANGELOG.md` | Version history |

## Requirements

- Node.js 18 or newer
- npm 9 or newer

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
npm run preview    # serve the production build locally
```

## Add the fonts

Fonts are not bundled because each has its own licence. Put the downloaded files in
**`src/assets/fonts/`** (`.otf`, `.ttf`, `.woff` or `.woff2`). File names can be anything as long
as they contain the font name (for example `Pillar-Regular.otf` or `MILKER.ttf`). They are
registered automatically. Restart `npm run dev` after adding them.

| Name must contain | Font | Used for |
|---|---|---|
| `pillar` | Pillar Regular | Hero, page titles, logo |
| `milker` | Milker | Section headings, nav links |
| `rush` | Rush Driver Italic | Buttons, taglines, badges |
| `graen` | Graen Metal | Poster placeholders, cards |
| `dystopian` | Dystopian Canticle | Marquee, cards |
| `eroded` | Eroded Personal Use | Stat numbers, cards |
| `dream` | Dream Kudos | Card titles, avatars |

Open the browser console (F12) to see a warning for any font file that was not recognised.
Some of these fonts are personal use only. Check the licence before publishing.

## Background effects

Scrolling flies you through a galaxy: stars streak toward you in proportion to scroll speed, nebulae pass by,
and six pixel planets approach along the page. The mouse steers the view. See `docs/BACKGROUND_ENGINE.md` to tune it.

## Change content

All content is in **`src/data/site.js`**: contact details, stats, events, team, timeline, quotes.
Edit, commit, deploy. To add an event, copy an existing object in `events` and change its fields.
The `slug` becomes the URL and must be unique.

## Project structure

```
swayam-ecell/
├── docs/                    detailed documentation
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx             entry, router, auth provider
    ├── App.jsx              routes, smooth scroll, progress bar
    ├── index.css            design tokens and all styles
    ├── fonts.js             auto-loads fonts from src/assets/fonts
    ├── assets/fonts/        font files go here
    ├── context/auth.jsx     mock login and registrations (localStorage)
    ├── data/site.js         all site content
    ├── assets/logo.png      club logo
    ├── components/          Navbar, Footer, EventCard, RegisterModal, Reveal
    └── pages/               Home, Events, About, Auth, Dashboard
```

## Mock data and the backend

Login, registration and payment are **mocked**. Data lives in the browser's `localStorage`, and
payment always succeeds. To connect a real backend (for example your NestJS API):

1. Replace the functions in `src/context/auth.jsx` with API calls (login, signup, register).
2. Replace the mock step in `src/components/RegisterModal.jsx` with Razorpay checkout.
3. Load `events` from the API instead of `src/data/site.js`.
4. Generate QR payloads on the server (signed) instead of using the plain registration code.

## Design tokens

Black `#0a0a0a`, surface `#131315`, red `#e11d2e`, hover red `#ff2d40`, deep red `#7f0f18`.
All tokens are CSS variables at the top of `src/index.css`.

## Accessibility

Visible focus rings, labelled form fields, and animation is disabled when the user prefers reduced motion.
