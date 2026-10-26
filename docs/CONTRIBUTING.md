# Contributing guidelines

Read this before you start working. It keeps the code, the history and the design consistent.

## 1. Set up
1. Install Node.js 18 or newer and Git.
2. Clone the repo: `git clone https://github.com/swayamed-spc/Swayam-VCE.git`
3. `cd Swayam-VCE/frontend`, then `npm install` and `npm run dev`.
4. Add the font files to `frontend/src/assets/fonts/` (see `docs/FONTS.md`). Never commit them: several are personal use only.
5. Read `README.md`, then `docs/ARCHITECTURE.md`.

## 2. Pick work
- Choose an issue from the Issues tab. Comment "I'll take this" and ask a maintainer to assign it to you.
- One person per issue. If you stop, say so in the issue so someone else can pick it up.
- Check the "Depends on" line in the issue. Do not start work that needs unfinished work.
- New idea or bug? Open an issue first. Titles start with the area: `[Frontend]`, `[Backend]`, `[Content]`, `[Design]`, `[DevOps]`. Put priority and estimate on the first line of the description.

## 3. Branches
Never commit directly to `main`. Branch from an up-to-date `main`:
```
git checkout main
git pull
git checkout -b feature/short-name
```
Prefixes: `feature/`, `fix/`, `docs/`, `chore/`. Example: `feature/razorpay-checkout`. Keep branches short-lived.

## 4. Commits
Small commits with a message that says what and why, in the form `type: summary`:
`feat: add event poster support`, `fix: stop modal closing on inner click`, `docs: update font table`, `refactor:`, `chore:`, `test:`.
- Present tense, under 72 characters, no full stop.
- One logical change per commit. Do not mix formatting changes with logic changes.

## 5. Pull requests
1. Push your branch and open a pull request into `main`.
2. Title like the commit. In the description write what changed, why, how to test it, and `Closes #<issue number>`.
3. For visual changes attach before and after screenshots, and for animation changes a short recording.
4. Make sure `npm run build` passes (and tests and lint once they exist).
5. Ask for at least one review. Do not merge your own pull request.
6. Reply to every review comment, then push fixes to the same branch.
7. Merge with "Squash and merge" so history stays readable. Delete the branch afterwards.
Keep pull requests under about 400 changed lines. Split big work.

## 6. Where things go
| What | Where |
|---|---|
| Website code | `frontend/src/` |
| API code | `backend/` |
| Content (events, team, stats) | `frontend/src/data/site.js` only |
| Documentation | `docs/` (the only README is the root one) |
| Images and logos | `frontend/src/assets/` |
Do not add new top-level folders without agreeing it in an issue. Do not leave unused files, copies of folders, `.zip` files or backups in the repo.

## 7. Code style
- React function components and hooks. One component per file, file name in PascalCase (`EventCard.jsx`).
- Components in `components/`, one file per route in `pages/`, shared data and helpers outside components.
- No hard-coded colours or font names in components: use the CSS variables in `frontend/src/index.css`.
- No inline copies of content. Content comes from `site.js`.
- Remove `console.log` and dead code before opening a pull request.
- Keep functions short and give things clear names. Add a comment only when the reason is not obvious.

## 8. Design rules
- Theme: red and black. Colours and fonts come from the tokens listed in `docs/DESIGN_SYSTEM.md` and `docs/FONTS.md`.
- Keep the page professional: the animated background must stay faint and must never reduce readability.
- Every animation must respect `prefers-reduced-motion`.
- Mobile first. Check every change at phone width (about 375px) and desktop width.
- New UI follows the existing card, button and heading styles instead of inventing new ones.

## 9. Accessibility checklist
- Every image has `alt` text, every input has a label.
- All actions work with the keyboard and focus is always visible.
- Text contrast is at least 4.5:1.
- Dialogs trap focus and close on Escape.

## 10. Security rules
- Never commit secrets: API keys, tokens, passwords, `.env` files. Use environment variables and a `.env.example` with names only.
- If a secret is ever committed, tell a maintainer at once and rotate it. Deleting the commit is not enough.
- Never trust the client: payment, seat limits and attendance are decided on the server.
- Validate all input on the server.
- Do not add dependencies casually. Say why in the pull request and check the package is maintained.

## 11. Documentation
Change code that affects behaviour, setup or content? Update the matching file in `docs/` in the same pull request and add a line to `docs/CHANGELOG.md`.

## 12. Definition of done
- [ ] It does what the issue asks and meets its acceptance criteria
- [ ] Builds without errors and has no console errors
- [ ] Works on mobile and desktop
- [ ] Accessible by keyboard
- [ ] No secrets, no unused files, no committed fonts
- [ ] Docs and changelog updated
- [ ] Pull request reviewed and approved

## 13. Communication
Ask early when stuck. Post progress in the issue. Be kind and specific in reviews: comment on the code, not the person.
