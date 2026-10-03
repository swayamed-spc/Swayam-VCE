# Swayam-VCE

Website and event registration platform for **Swayam**, the college Entrepreneurship Cell. Students browse events, register,
pay and get QR tickets. Built with React, Vite, Framer Motion and Lenis smooth scrolling, in a red and black space-punk theme.

There is **no admin interface** in the website. Events, team and club details are edited in code by the engineering team,
and check-in tooling belongs in the backend.

## Status

| Part | State |
|---|---|
| `frontend/` | Working site on mock data (login, registration, payment and tickets are simulated) |
| `backend/` | Not started |

## Repository layout

```
Swayam-VCE/
├── README.md
├── .gitignore
├── docs/                      all documentation (see table below)
├── backend/                   empty, reserved for the API
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── public/
    └── src/
        ├── main.jsx           entry: router, auth provider
        ├── App.jsx            routes, smooth scroll, progress bar
        ├── index.css          design tokens and all styles
        ├── fonts.js           auto-loads fonts from assets/fonts
        ├── assets/fonts/      put font files here
        ├── context/auth.jsx   mock login and registrations (localStorage)
        ├── data/site.js       all site content
        ├── components/        Navbar, Footer, EventCard, RegisterModal, Reveal, SpaceCanvas
        └── pages/             Home, Events, About, Auth, Dashboard
```
Paths starting with `src/` in the docs refer to `frontend/src/`.

## Run it

Requires Node.js 18+ and npm 9+.

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in frontend/dist
npm run preview    # serve the production build locally
```

## Pages

| Page | Route | Purpose |
|---|---|---|
| Home | `/` | Hero, stats, upcoming events, what we do, manifesto, call to action |
| Events | `/events` | Search and filter by category and price |
| Event detail | `/events/:slug` | About, schedule, rules, prizes, seat counter, register button |
| About and team | `/about` | Story timeline and core team |
| Log in, Sign up | `/login`, `/signup` | Student accounts |
| My tickets | `/dashboard` | Registrations (protected) |
| Ticket | `/ticket/:code` | Printable QR ticket (protected) |

## Fonts

Font files are not committed because each has its own licence (some are personal use only). Download them and put them in
`frontend/src/assets/fonts/` as `.otf`, `.ttf`, `.woff` or `.woff2`. File names can be anything that contains the font name
(for example `Pillar-Regular.otf`). They load automatically; restart `npm run dev` after adding them. Until then, Google Fonts
stand-ins are used.

| Name must contain | Font | Used for |
|---|---|---|
| `pillar` | Pillar Regular | Hero, page titles |
| `milker` | Milker | Headings, nav links |
| `rush` | Rush Driver Italic | Buttons, taglines, badges |
| `graen` | Graen Metal | Poster names, cards |
| `eroded` | Eroded Personal Use | Stat numbers, timeline years |
| `dream` | Dream Kudos | Card titles, avatars |

## Editing content

Everything lives in `frontend/src/data/site.js`: club details, stats, events, team and timeline. To add an event, copy an
existing object in `events` and change its fields. The `slug` becomes the URL and must be unique.

## Background

Drifting stars that streak in proportion to scroll speed, red sparks that follow the mouse, and two faint animated
mathematical patterns (a hexagonal tessellation and Sierpinski fractals). All motion respects reduced-motion settings.

## Documentation

| File | Contents |
|---|---|
| `docs/ARCHITECTURE.md` | Stack, folders, routes, registration flow |
| `docs/DESIGN_SYSTEM.md` | Colours, shapes, motion, accessibility |
| `docs/FONTS.md` | Font loading, where each font is used, licences |
| `docs/BACKGROUND_ENGINE.md` | Stars, patterns, scroll force, tuning |
| `docs/CONTENT_GUIDE.md` | How to edit events, team and stats |
| `docs/BACKEND_INTEGRATION.md` | Replacing the mocks with a real API |
| `docs/TROUBLESHOOTING.md` | Common problems and fixes |
| `docs/GITHUB_ISSUES.md` | Ready-to-paste issues with labels |
| `docs/PROJECT_PLAN.md` | Original full-platform design (Next.js + NestJS) |
| `docs/CHANGELOG.md` | Version history |

## Contributing

1. Branch from `main`: `git checkout -b feature/short-name`
2. Keep changes in the right folder (`frontend/` or `backend/`)
3. Open a pull request and link the issue it closes
