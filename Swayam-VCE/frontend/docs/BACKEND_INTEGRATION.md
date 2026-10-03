# Connecting a backend

The app is mocked end to end. Replace these in order.

1. **Auth** (`src/context/auth.jsx`): `login` and signup in `src/pages/Auth.jsx` currently accept any valid-looking email and an 8+ character password.
   Call `POST /auth/login` and `/auth/signup`, store tokens in HTTP-only cookies, load the user on start.
2. **Events** (`src/data/site.js`): replace the `events` export with `GET /events` and `GET /events/:slug` (React Query or `useEffect`).
   Seat counts should come from the server.
3. **Registration** (`register()` in `auth.jsx`): call `POST /registrations { eventId }`. The server returns the registration code and, for paid events, a gateway order.
4. **Payment** (`src/components/RegisterModal.jsx`, step `pay`): open Razorpay checkout with the order, then confirm via webhook (server) and `POST /payments/verify`.
5. **QR payload**: the ticket QR currently encodes the plain code. Use a server-signed token (HMAC) so tickets cannot be forged.
6. **Check-in** is done by the engineering team or a separate internal tool. There is no admin or scanner in this website.

The earlier planning PDF (E-Cell Event Platform) describes a NestJS, Prisma, PostgreSQL design that fits these endpoints.
Keep the response shapes close to the objects in `site.js` to avoid touching components.
