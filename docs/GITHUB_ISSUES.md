# GitHub issues

Copy the title, the labels and the description of each issue into **Issues, New issue**.
Only GitHub's default labels are used (`enhancement`, `documentation`, `accessibility`, `help wanted`, `good first issue`),
so no custom labels are needed. The area is in the title prefix and the priority is at the top of each description.
If `good first issue` does not exist in your repo, use `help wanted` instead.

Before starting any issue, read `docs/CONTRIBUTING.md`.

| # | Title | Labels |
|---|---|---|
| 1 | [Content] Replace placeholder content with real club information | good first issue, help wanted |
| 2 | [Content] Add team photos and event posters | help wanted, enhancement |
| 3 | [Design] Add the official logo | good first issue, enhancement |
| 4 | [Frontend] Code optimization and performance audit | enhancement |
| 5 | [Backend] Design and document REST API endpoints | enhancement |
| 6 | [Backend] Authentication: replace the mock login | enhancement |
| 7 | [Backend] Payment integration (Razorpay) | enhancement |
| 8 | [Backend] Signed QR tickets and attendance check-in | enhancement |
| 9 | [Backend] Email and WhatsApp confirmations with ticket PDF | enhancement |
| 10 | [Frontend] Accessibility audit (WCAG AA) | accessibility |
| 11 | [DevOps] Add tests and a CI pipeline | help wanted, enhancement |
| 12 | [DevOps] Deployment and environment setup | documentation, enhancement |

---

## 1
**Title:** `[Content] Replace placeholder content with real club information`
**Labels:** `good first issue`, `help wanted`

```
**Priority:** High | **Area:** Content | **Estimate:** 0.5 to 1 day | **Skills:** none, only careful editing

## Summary
Every piece of text on the website comes from sample data. Before the site is shown to anyone, all of it must be replaced with real, verified information.

## Background
All content lives in one file, `frontend/src/data/site.js`. It currently contains fake names ("Name Surname"), a fake email and phone number (`ecell@yourcollege.edu`, `+91 00000 00000`), sample stats and sample events. The About page paragraph is in `frontend/src/pages/About.jsx`.

## Tasks
- [ ] `club`: real email, phone, address and social media links
- [ ] `stats`: real numbers for events hosted, members, participants and years running (get them from the core team and keep a source)
- [ ] `team`: real names, roles and departments
- [ ] `timeline`: real milestones with correct years
- [ ] `events`: real upcoming events with name, category, date, time, venue, fee, capacity, about, rules, schedule and prizes
- [ ] Rewrite the About page paragraph in `About.jsx`
- [ ] Remove or update the sample events that have already passed

## Out of scope
Images (see the team photos and posters issue) and any change to layout or design.

## How to test
1. Run `cd frontend && npm install && npm run dev`.
2. Click through Home, Events, an event page, About and the footer. Check every name, date and number.
3. Search the whole repo for `Name Surname`, `00000` and `yourcollege`. There should be no results.

## Acceptance criteria
- No placeholder text remains anywhere on the site.
- Event dates and fees match the official announcements.
- The pull request lists where each number came from.
```

---

## 2
**Title:** `[Content] Add team photos and event posters`
**Labels:** `help wanted`, `enhancement`

```
**Priority:** Medium | **Area:** Content and Frontend | **Estimate:** 1 to 2 days | **Skills:** React basics, image handling

## Summary
Team cards currently show a letter in a circle and event cards show generated art. Replace them with real photos and posters, keeping the current look as a fallback.

## Background
Event cards use the `.poster` block in `frontend/src/components/EventCard.jsx`. Team cards are in `frontend/src/pages/About.jsx`. Event data is in `frontend/src/data/site.js`.

## Tasks
- [ ] Add an optional `photo` field to each team member and an optional `poster` field to each event in `site.js`
- [ ] Show the image when present, otherwise show the current fallback
- [ ] Use the poster on the event detail page and the cards (poster ratio 4:5)
- [ ] Convert images to WebP, keep each under 150 KB, and store them in `frontend/src/assets/`
- [ ] Add meaningful `alt` text and set `loading="lazy"` on images below the fold
- [ ] Make sure the card layout does not jump while images load (set width and height or an aspect ratio)

## Out of scope
An image upload interface. Images are added by committing files.

## How to test
Open Home, Events, an event page and About on a phone-sized window and a desktop window. Throttle the network in browser dev tools to check for layout jumps.

## Acceptance criteria
- Every team member and upcoming event shows a real image.
- Entries without an image still render correctly.
- No image is over 150 KB and every image has alt text.
```

---

## 3
**Title:** `[Design] Add the official logo`
**Labels:** `good first issue`, `enhancement`

```
**Priority:** Medium | **Area:** Design and Frontend | **Estimate:** 0.5 day

## Summary
The site shows a plain text wordmark (SWAYAM). Add the official Swayam logo in the navbar, footer and browser tab.

## Background
An earlier attempt used a 100x100 image with a white background. After removing the background it was blurry and uneven, so it was dropped. We need a proper file first.

## Tasks
- [ ] Obtain the logo as an SVG, or a transparent PNG of at least 1000px width, in a version that works on a black background (white or red)
- [ ] Add it to `frontend/src/assets/` and use it in `Navbar.jsx` and `Footer.jsx`, replacing the `.logo` text
- [ ] Create a favicon (32x32 and 180x180) in `frontend/public/` and link it in `frontend/index.html`
- [ ] Keep the logo height at about 40 to 48px in the navbar and give it descriptive `alt` text
- [ ] Update the logo section of `docs/DESIGN_SYSTEM.md`

## Out of scope
Redesigning the logo.

## Acceptance criteria
- The logo is sharp on high-resolution screens in the navbar, footer and tab.
- It is readable on the black background and on mobile.
```

---

## 4
**Title:** `[Frontend] Code optimization and performance audit`
**Labels:** `enhancement`

```
**Priority:** Medium | **Area:** Frontend | **Estimate:** 2 to 3 days | **Skills:** React, browser dev tools

## Summary
Measure the site's performance and fix the biggest problems. The animated background is the most expensive part.

## Background
The production bundle is about 350 KB (114 KB gzipped). The background in `frontend/src/components/SpaceCanvas.jsx` redraws about 700 hexagons, two fractals and 560 stars every frame. Fonts currently load from Google Fonts as stand-ins.

## Tasks
- [ ] Record a baseline: Lighthouse scores for Home and Events (mobile and desktop) and the frame rate of the background on a mid-range laptop
- [ ] Lazy-load routes with `React.lazy` and `Suspense`
- [ ] Reduce background cost: pause the animation when the tab is hidden, use a lower resolution on small screens, and cache the hexagon grid where possible
- [ ] Remove unused dependencies and check the bundle with a visualizer
- [ ] Self-host the fonts and use `font-display: swap`
- [ ] Re-measure and put before and after numbers in the pull request

## Out of scope
Changing how the site looks.

## Acceptance criteria
- Lighthouse performance is at least 90 on desktop and 75 on mobile.
- The background stays at 50 fps or more on a mid-range laptop.
- No visible change in design or behaviour.
```

---

## 5
**Title:** `[Backend] Design and document REST API endpoints`
**Labels:** `enhancement`

```
**Priority:** High | **Area:** Backend | **Estimate:** 1 to 2 weeks | **Skills:** NestJS or Node, PostgreSQL, API design

## Summary
Build the first set of API endpoints so the frontend can stop using mock data.

## Background
The frontend reads events from `frontend/src/data/site.js` and stores registrations in the browser. `docs/BACKEND_INTEGRATION.md` lists what has to be replaced and `docs/PROJECT_PLAN.md` describes the intended stack (NestJS, Prisma, PostgreSQL).

## Tasks
- [ ] Set up the project in `backend/` with the folder layout from `docs/PROJECT_PLAN.md`
- [ ] Models for users, events and registrations with a unique constraint on (user, event)
- [ ] `GET /events` and `GET /events/:slug`, including the live seat count
- [ ] `POST /registrations`, `GET /registrations/me`, `DELETE /registrations/:id`
- [ ] Standard responses: `{ success, data, meta }` and `{ success, error: { code, message } }`
- [ ] Validation of all inputs, CORS for the frontend origin, and rate limiting
- [ ] Swagger/OpenAPI docs
- [ ] A seed script that loads the current events from `site.js`

## Out of scope
Authentication, payments, QR and notifications. They have their own issues.

## Acceptance criteria
- Every endpoint is documented in Swagger and has automated tests.
- Registering twice for the same event is rejected, and a full event cannot be registered for.
- The frontend can read events from the API in place of `site.js`.
```

---

## 6
**Title:** `[Backend] Authentication: replace the mock login`
**Labels:** `enhancement`

```
**Priority:** High | **Area:** Backend and Frontend | **Estimate:** 1 week | **Skills:** authentication, security basics
**Depends on:** the REST API issue

## Summary
Login currently accepts any email with a password of 8 or more characters and keeps the user in `localStorage`. Replace it with real authentication.

## Background
The mock is in `frontend/src/context/auth.jsx` and the forms are in `frontend/src/pages/Auth.jsx`.

## Tasks
- [ ] Endpoints: sign up, log in, log out, refresh, forgot password, reset password, `GET /auth/me`
- [ ] Hash passwords with bcrypt and never log or return them
- [ ] Short-lived access token plus rotating refresh token in HTTP-only, secure, SameSite cookies
- [ ] Rate limit login and reset requests and lock accounts after repeated failures
- [ ] Email verification for new accounts
- [ ] Update `auth.jsx` and `Auth.jsx` to call the API and show server errors
- [ ] Load the current user on page start so a refresh keeps the session

## Out of scope
Social login and an admin role.

## Acceptance criteria
- A wrong password is rejected and the error message does not reveal whether the email exists.
- Sessions survive a refresh and end on logout.
- No password or token is stored in `localStorage`.
- Protected pages redirect to login when there is no session.
```

---

## 7
**Title:** `[Backend] Payment integration (Razorpay)`
**Labels:** `enhancement`

```
**Priority:** High | **Area:** Backend and Frontend | **Estimate:** 1 to 2 weeks | **Skills:** payments, webhooks, security
**Depends on:** the REST API and authentication issues

## Summary
The payment step is a fake button that always succeeds. Connect real payments so a paid registration is only confirmed after verified payment.

## Background
The mock step is in `frontend/src/components/RegisterModal.jsx` (step `pay`). The design for orders, signature checks and webhooks is in `docs/PROJECT_PLAN.md`.

## Tasks
- [ ] Create a Razorpay order on the server when a paid registration starts (status PENDING)
- [ ] Open Razorpay checkout from the modal using the order id
- [ ] Verify the payment signature on the server
- [ ] Webhook endpoint that verifies the webhook signature and is idempotent (store each event id and ignore repeats)
- [ ] Update payment and registration inside one database transaction
- [ ] Handle failed, cancelled and abandoned payments, and expire stale PENDING registrations
- [ ] Refund support
- [ ] Keys only in environment variables, with a documented `.env.example`

## Out of scope
Invoices and GST handling.

## How to test
Use Razorpay test mode: a successful card, a failed card, closing the checkout window, and sending the same webhook twice.

## Acceptance criteria
- A registration becomes CONFIRMED only after a verified payment.
- Duplicate webhooks never create duplicate registrations or payments.
- No secret key is present in the frontend code or the repository.
```

---

## 8
**Title:** `[Backend] Signed QR tickets and attendance check-in`
**Labels:** `enhancement`

```
**Priority:** High | **Area:** Backend | **Estimate:** 1 week | **Skills:** security, Node
**Depends on:** the REST API and payments issues

## Summary
Tickets carry a QR code that currently contains the plain registration code, which anyone could guess or copy. Make the QR tamper-proof and add a check-in process for event staff.

## Background
The QR is created with `qrcode.react` in `frontend/src/pages/Dashboard.jsx` and `RegisterModal.jsx`. Check-in is deliberately not part of the public website. Staff use an internal tool.

## Tasks
- [ ] Generate a signed payload on the server: base64 of the registration id, a dot, then an HMAC-SHA256 signature with a secret from the environment
- [ ] Return the payload with the registration so the frontend only renders it
- [ ] Internal endpoint that verifies the signature, checks the registration is confirmed and not already attended, marks attendance with a timestamp, and writes an audit log entry
- [ ] A small internal scanner (script or page that is not linked from the public site) for event staff, with a manual code entry fallback
- [ ] Show attendance status on the student's ticket page

## Out of scope
Certificates.

## Acceptance criteria
- A modified or forged QR is rejected.
- A second scan of the same ticket is rejected with a clear message.
- A valid scan completes in under 2 seconds.
- Every scan is recorded in the audit log.
```

---

## 9
**Title:** `[Backend] Email and WhatsApp confirmations with ticket PDF`
**Labels:** `enhancement`

```
**Priority:** Medium | **Area:** Backend | **Estimate:** 1 week | **Skills:** queues, email APIs
**Depends on:** the REST API and payments issues

## Summary
Send a confirmation with the ticket after registration and a reminder before the event.

## Tasks
- [ ] Background job queue (BullMQ with Redis) so sending never slows down the registration request
- [ ] Confirmation email with the ticket attached as a PDF generated from an HTML template
- [ ] Reminder job 24 hours before each event
- [ ] Retry failed jobs with exponential backoff (3 attempts) and record delivery status
- [ ] Optional WhatsApp message through an approved template (Twilio or Meta Cloud API)
- [ ] Email templates that look correct in common mail clients

## Out of scope
Marketing or bulk newsletters.

## Acceptance criteria
- A new registration receives a confirmation within one minute.
- Failures are logged and visible, and retried.
- The PDF shows the event, the student name, the registration code and a working QR code.
```

---

## 10
**Title:** `[Frontend] Accessibility audit (WCAG AA)`
**Labels:** `accessibility`

```
**Priority:** Medium | **Area:** Frontend | **Estimate:** 2 to 3 days | **Skills:** HTML, ARIA, keyboard and screen reader testing

## Summary
Check the whole site against WCAG 2.1 AA and fix what fails.

## Background
The site already has focus outlines, labelled form fields and reduced-motion support. Known gaps: the registration modal does not trap focus or close with Escape, and the muted grey text on the dark background may be too low in contrast.

## Tasks
- [ ] Trap focus in the registration modal, close it on Escape, and return focus to the button that opened it
- [ ] Check text contrast everywhere (4.5:1 for normal text, 3:1 for large text) and adjust colours in `frontend/src/index.css`
- [ ] Use only the keyboard to complete a full registration and fix anything that cannot be reached
- [ ] Test with a screen reader (NVDA or VoiceOver) and fix unclear labels
- [ ] Make sure form errors are announced
- [ ] Add a visible control to pause the background animation
- [ ] Run axe DevTools and Lighthouse and attach the reports

## Acceptance criteria
- axe reports no serious or critical issues on any page.
- Every flow works with the keyboard alone.
- The background can be paused, and it stays off for users who prefer reduced motion.
```

---

## 11
**Title:** `[DevOps] Add tests and a CI pipeline`
**Labels:** `help wanted`, `enhancement`

```
**Priority:** Medium | **Area:** Frontend and DevOps | **Estimate:** 2 to 3 days | **Skills:** Vitest, React Testing Library, GitHub Actions

## Summary
There are no automated tests yet. Add tests for the most important behaviour and run them on every pull request.

## Tasks
- [ ] Add Vitest and React Testing Library to `frontend/`
- [ ] Unit tests for `statusOf`, `inr` and `fmt` in `frontend/src/data/site.js`
- [ ] Component tests: the events filter, the register flow (confirm, pay, success) and protected routes redirecting to login
- [ ] Add ESLint and a `lint` script
- [ ] GitHub Actions workflow in `.github/workflows/ci.yml` that runs install, lint, test and build for pull requests into `main`
- [ ] Turn on branch protection so `main` requires the checks to pass

## Acceptance criteria
- `npm test` passes locally and in CI.
- A pull request with a failing test cannot be merged.
- The README or CONTRIBUTING guide explains how to run the tests.
```

---

## 12
**Title:** `[DevOps] Deployment and environment setup`
**Labels:** `documentation`, `enhancement`

```
**Priority:** Low | **Area:** DevOps | **Estimate:** 1 to 2 days | **Skills:** Vercel or similar hosting, DNS

## Summary
Publish the site and document how releases work.

## Tasks
- [ ] Deploy the frontend to Vercel with the root directory set to `frontend` and the build command `npm run build`
- [ ] Preview deployment for every pull request
- [ ] Production domain with HTTPS
- [ ] Add `.env.example` files for the frontend and backend (names only, never values)
- [ ] Error tracking (Sentry) and uptime monitoring
- [ ] Write the release and rollback steps in `docs/` and link them from the README
- [ ] Check that the font files are handled correctly in production (they are not committed because of their licences)

## Acceptance criteria
- Merging into `main` deploys automatically.
- Anyone on the team can roll back using the documented steps.
- No secrets are present in the repository.
```
