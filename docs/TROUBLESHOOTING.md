# Troubleshooting

| Symptom | Cause and fix |
|---|---|
| Site shows "Live events couldn't be loaded" | The backend isn't running or isn't on port 4000. Start it (`cd backend && npm run dev`). The event archive still works without it |
| Login says "Could not reach the server" | Same as above. In development the site calls `/api`, which Vite forwards to `http://localhost:4000` |
| Logged in, but refreshing logs you out | The cookie isn't reaching the API. In development, open the site at `http://localhost:5173` (not `127.0.0.1`) and keep using the Vite proxy (leave `VITE_API_URL` empty). In production the site and API must be on the same site, or the cookie needs `sameSite: 'none'` plus CSRF protection |
| "CAPTCHA verification failed" on every login | The Turnstile site key (frontend) and secret (backend) don't belong together. Locally use the test pair: site key `1x00000000000000000000AA`, secret `1x0000000000000000000000000000000AA` |
| Security check box never appears | Turnstile loads from `challenges.cloudflare.com`; check the network or an ad blocker |
| "Sign in with Google" is greyed out | The Firebase web config is missing from `frontend/.env.local` (see `frontend/.env.example`) |
| Google sign-in answers "not configured on this server" | `FIREBASE_PROJECT_ID` is missing from `backend/.env` |
| Google popup closes with an error | The site's domain isn't in Firebase → Authentication → Settings → Authorized domains |
| No password reset email | Emails aren't sent yet: the reset link is printed in the backend terminal (`[password reset] ...`) |
| "Too many requests" | Rate limits: login/register/Google share 10 per 15 minutes per IP; forgot/reset password allow 5. Wait, or restart the backend in development |
| Seat bars missing | `GET /api/events/availability` failed; the rest of the event still shows |
| Photos missing on an event | The image must be imported in `src/data/events.js` and exist in `src/assets/events/`. Run `npm run check:data` |
| `npm audit` warnings | Mostly dev tooling. Check with `npm audit --omit=dev`. Avoid `--force` |
