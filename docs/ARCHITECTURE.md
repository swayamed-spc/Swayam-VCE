# Architecture

## Overview
A single-page React app (Vite) with client-side routing. There is no backend yet: data lives in
`src/data/site.js` and browser `localStorage`. The design intentionally keeps every integration point
(auth, registration, payment, events) in one or two files so a backend can replace them without touching pages.

## Stack
React 18, Vite 5, React Router 6, Framer Motion 11 (scroll reveals, page fades, count-up), Lenis (smooth scroll),
qrcode.react (QR tickets). Plain CSS, no Tailwind: all styles are in `src/index.css`.

## Folder map
| Path | Responsibility |
|---|---|
| `src/main.jsx` | Entry. Loads fonts, mounts Router and AuthProvider |
| `src/App.jsx` | Routes, Lenis smooth scroll, scroll progress bar, page fade, scroll reset on navigation |
| `src/fonts.js` | Auto-registers font files from `src/assets/fonts` by name match |
| `src/index.css` | Design tokens and every style |
| `src/data/site.js` | All content: club info, stats, events, team, timeline |
| `src/context/auth.jsx` | Mock login and registrations (localStorage) |
| `src/components/SpaceCanvas.jsx` | Star and pattern background, see BACKGROUND_ENGINE.md |
| `src/components/` | Navbar, Footer, EventCard, RegisterModal, Reveal |
| `src/pages/` | Home, Events (list + detail), About, Auth (login + signup), Dashboard (tickets) |
| `src/assets/fonts/` | Font files (not committed) |

## Routes
`/` Home, `/events`, `/events/:slug`, `/about`, `/login`, `/signup`, `/dashboard` (protected), `/ticket/:code` (protected), `*` 404.
Protected routes redirect to `/login` when no user is stored.

## Registration flow
Event page, Register, `RegisterModal`: confirm, mock payment (skipped if fee is 0), success with QR.
`register()` in `auth.jsx` creates `SWAYAM-2026-0001` style codes and saves them. The QR encodes that code.

## Deliberate omissions
No admin UI, leaderboard, or contact form. Admin work is done by engineers: edit `site.js`, or the backend.

## Page transitions and scroll
Every route change re-keys `<motion.main>` (fade) and calls `lenis.scrollTo(0, {immediate:true})` then `lenis.resize()`.
Without the resize, Lenis keeps the previous page height and the new page seems frozen until refresh.
