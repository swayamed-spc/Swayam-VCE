# Content guide (for the engineering team)

Everything editable lives in `src/data/site.js`. Edit, commit, deploy.

## Club
`club.email`, `phone`, `address`, `socials` (footer). `tagline` is the hero line.

## Stats
`{ n: number, s: suffix, l: label }`. Counts up when scrolled into view.

## Events
```js
{ slug: 'pitch-fest-2026',   // unique, becomes the URL /events/pitch-fest-2026
  name, category,            // Competition | Workshop | Speaker (category sets the card title font)
  date: '2026-11-14', time: '10:00 AM', venue,
  fee: 0,                    // 0 means Free
  capacity: 100, filled: 42, // seat bar and status
  about, rules: [], schedule: [{ t: '10:00', e: 'Check-in' }], prizes }
```
Status is automatic: Sold out when filled >= capacity, Closed when the date has passed, Closing soon above 80%, otherwise Open.
Upcoming events on Home are future-dated events, first three.
To add a category font, extend `FF` in `src/components/EventCard.jsx`.

## Team, timeline, pillars
Arrays `team`, `timeline`, `pillars` in the same file. Team photos are not supported yet (initial letter avatars).

## Images
Poster images are not implemented; posters are generated art with the event name. To use real posters add a `poster` field and render it in `EventCard` and the event page.
