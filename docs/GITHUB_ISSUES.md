# GitHub issues for the team

Create these labels first (Issues, Labels): `frontend`, `backend`, `content`, `performance`, `payments`, `security`,
`accessibility`, `testing`, `devops`, `design`, `enhancement`, `documentation`, `good first issue`, `help wanted`,
`priority: high`, `priority: medium`, `priority: low`. Then paste each block below as a new issue.

---
## 1. Replace placeholder content with real club information
**Labels:** `content`, `frontend`, `good first issue`, `priority: high`

All text in `src/data/site.js` is sample data (fake names, stats, contact details, dates).

**Tasks**
- [ ] Real email, phone, address and social links in `club`
- [ ] Real numbers in `stats` (events, members, participants, years)
- [ ] Real `team` names, roles and departments
- [ ] Real `timeline` milestones and the About page paragraph
- [ ] Real upcoming events (name, date, venue, fee, capacity, rules, schedule, prizes)

**Done when:** no "Name Surname", `00000` or example email remains anywhere on the site (search the repo for them).

---
## 2. Add team photos and event posters
**Labels:** `content`, `design`, `frontend`, `help wanted`, `priority: medium`

Team cards show an initial letter and event cards show generated art.

**Tasks**
- [ ] Add a `photo` field to team members and a `poster` field to events in `site.js`
- [ ] Render them in `About.jsx`, `EventCard.jsx` and the event detail page, with the current design as a fallback
- [ ] Compress images (WebP, under 150 KB) and add `alt` text

**Done when:** every team member and upcoming event shows a real image on mobile and desktop.

---
## 3. Add the official logo
**Labels:** `design`, `frontend`, `good first issue`, `priority: medium`

The site shows a text wordmark. The logo we had was 100x100 and too blurry to use.

**Tasks**
- [ ] Get an SVG or a 1000px+ transparent PNG (white or red version for dark backgrounds)
- [ ] Use it in the navbar, footer and as the favicon (`public/favicon.png`)
- [ ] Update `docs/DESIGN_SYSTEM.md`

**Done when:** the logo is crisp on retina screens in the navbar, footer and browser tab.

---
## 4. Code optimization and performance audit
**Labels:** `performance`, `frontend`, `priority: medium`

**Tasks**
- [ ] Lazy-load routes with `React.lazy` and `Suspense`
- [ ] Profile `SpaceCanvas.jsx` (hexagon grid, fractals, stars) and reduce work on low-end phones, for example lower resolution or pausing when the tab is hidden
- [ ] Reduce bundle size (currently about 350 KB, 114 KB gzipped) and check unused dependencies
- [ ] Self-host fonts instead of Google Fonts stand-ins, and use `font-display: swap`
- [ ] Run Lighthouse on Home and Events and record scores in the PR

**Done when:** Lighthouse performance is 90+ on desktop and 75+ on mobile, and the canvas holds 50+ fps on a mid-range laptop.

---
## 5. Design and document REST API endpoints
**Labels:** `backend`, `enhancement`, `priority: high`

The frontend needs a backend. `docs/BACKEND_INTEGRATION.md` lists what to replace.

**Tasks**
- [ ] `GET /events`, `GET /events/:slug` (including live seat count)
- [ ] `POST /registrations`, `GET /registrations/me`, `DELETE /registrations/:id`
- [ ] Standard response format `{ success, data, error }`
- [ ] Swagger/OpenAPI documentation and validation on every endpoint

**Done when:** each endpoint is documented and tested, and the frontend reads events from the API instead of `site.js`.

---
## 6. Authentication (replace the mock login)
**Labels:** `backend`, `frontend`, `security`, `priority: high`

Login currently accepts any email with an 8+ character password and stores the user in `localStorage`.

**Tasks**
- [ ] Signup, login, logout, forgot and reset password endpoints (bcrypt, JWT access plus refresh)
- [ ] Use HTTP-only cookies, rate limit login attempts
- [ ] Update `src/context/auth.jsx` and `src/pages/Auth.jsx`; protect `/dashboard` and `/ticket/:code` with real sessions

**Done when:** a wrong password is rejected, sessions survive refresh, and no password or token touches `localStorage`.

---
## 7. Payment integration (Razorpay)
**Labels:** `payments`, `backend`, `frontend`, `security`, `priority: high`

The pay step in `RegisterModal.jsx` always succeeds.

**Tasks**
- [ ] Create order on the server, open Razorpay checkout in the modal
- [ ] Verify the signature server-side and handle the webhook idempotently
- [ ] Handle failed and abandoned payments, and support refunds
- [ ] Test in Razorpay test mode and document keys in `.env.example`

**Done when:** a paid registration is confirmed only after a verified payment, and double webhooks do not create duplicates.

---
## 8. Signed QR tickets and attendance check-in
**Labels:** `backend`, `security`, `enhancement`, `priority: high`

The ticket QR currently encodes a plain registration code, which can be forged. Check-in is handled by the team, not through the public site.

**Tasks**
- [ ] Generate HMAC-signed QR payloads on the server
- [ ] Internal check-in endpoint that rejects invalid or already used tickets and logs each scan
- [ ] Small internal scanner tool or script for event staff (not part of the public website)
- [ ] Show attendance status on the student ticket page

**Done when:** a tampered or reused QR is rejected and a valid scan marks attendance in under 2 seconds.

---
## 9. Email and WhatsApp confirmations, ticket PDF
**Labels:** `backend`, `enhancement`, `priority: medium`

**Tasks**
- [ ] Queue jobs for confirmation email with ticket PDF and a reminder 24 hours before the event
- [ ] Retry failures with backoff and log delivery status
- [ ] Optional WhatsApp message through an approved template

**Done when:** a new registration receives a confirmation within a minute and failures are visible in logs.

---
## 10. Accessibility audit (WCAG AA)
**Labels:** `accessibility`, `frontend`, `priority: medium`

**Tasks**
- [ ] Trap focus in the registration modal and close it on Escape, return focus afterwards
- [ ] Check contrast of muted text on the dark background
- [ ] Test keyboard navigation and a screen reader on all pages
- [ ] Add a visible "pause background animation" control

**Done when:** axe and Lighthouse accessibility report no serious issues and all flows work with the keyboard only.

---
## 11. Tests and CI
**Labels:** `testing`, `devops`, `help wanted`, `priority: medium`

**Tasks**
- [ ] Add Vitest and React Testing Library
- [ ] Test the register flow, route protection, and event status logic (`statusOf`)
- [ ] GitHub Actions: install, lint, test and build on every pull request

**Done when:** the pipeline runs on PRs and blocks merging on failure.

---
## 12. Deployment and environment setup
**Labels:** `devops`, `documentation`, `priority: low`

**Tasks**
- [ ] Deploy to Vercel with preview deployments per PR
- [ ] Add `.env.example`, a production domain and HTTPS
- [ ] Add error tracking (Sentry) and uptime monitoring
- [ ] Document the release and rollback steps in the README

**Done when:** merging to `main` deploys automatically and the steps are documented.
