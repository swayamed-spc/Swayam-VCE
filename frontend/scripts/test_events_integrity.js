// Node script using Vite to test all event data and routes
import { createServer } from 'vite';

async function run() {
  const server = await createServer({
    server: { middlewareMode: true }
  });

  const { pastEvents, upcomingEvents, ongoingEvents, allEvents } = await server.ssrLoadModule('./src/data/events.js');

  console.log('--- 1. Testing Event Collections ---');
  console.log('Upcoming count:', upcomingEvents.length, '(expected 0)');
  console.log('Ongoing count:', ongoingEvents.length, '(expected 0)');
  console.log('Past count:', pastEvents.length, '(expected 28)');
  console.log('All count:', allEvents.length, '(expected 28)');

  if (upcomingEvents.length !== 0) throw new Error('upcomingEvents must be empty');
  if (ongoingEvents.length !== 0) throw new Error('ongoingEvents must be empty');
  if (pastEvents.length !== 28) throw new Error(`pastEvents must have exactly 28 events, got ${pastEvents.length}`);

  console.log('\n--- 2. Checking E-Summit 2026 Preservation ---');
  const es26 = pastEvents.find(e => e.slug === 'e-summit-2026');
  if (!es26) throw new Error('E-Summit 2026 missing!');
  console.log('E-Summit 2026 found. Prize pool:', es26.totalPrizePool, 'Winners:', es26.winners?.length, 'Gallery:', es26.gallery?.length);
  if (!es26.gallery || es26.gallery.length !== 6) throw new Error('E-Summit 2026 gallery downgraded');

  console.log('\n--- 3. Checking All 28 Event Slugs & Details ---');
  pastEvents.forEach((e, idx) => {
    console.log(`[${idx+1}/28] ${e.slug} | "${e.name}" | Year: ${e.academicYear} | Mode: ${e.mode} | Venue: ${e.venue?.substring(0, 35)}`);
    if (!e.slug) throw new Error(`Missing slug for index ${idx}`);
    if (!e.name) throw new Error(`Missing name for ${e.slug}`);
    if (!e.summary) throw new Error(`Missing summary for ${e.slug}`);
    if (!e.academicYear) throw new Error(`Missing academicYear for ${e.slug}`);
    if (!e.date) throw new Error(`Missing date for ${e.slug}`);

    if (e.gallery) {
      console.log(`     -> Gallery: ${e.gallery.length} photos`);
      e.gallery.forEach((g, gi) => {
        if (!g.img || !g.caption) throw new Error(`Invalid gallery item ${gi} in ${e.slug}`);
      });
    }
  });

  console.log('\nALL 28 EVENTS VALIDATED SUCCESSFULLY!');
  await server.close();
  process.exit(0);
}

run().catch(err => {
  console.error('Integrity check failed:', err);
  process.exit(1);
});
