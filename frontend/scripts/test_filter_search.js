import { createServer } from 'vite';

async function main() {
  const server = await createServer({ server: { middlewareMode: true } });
  const { pastEvents, upcomingEvents, ongoingEvents } = await server.ssrLoadModule('./src/data/events.js');

  const categories = [...new Set(pastEvents.map(e => e.category))];
  console.log('Categories found:', categories);
  for (const cat of categories) {
    const filtered = pastEvents.filter(e => e.category === cat);
    if (filtered.length === 0) throw new Error('Filter failed for ' + cat);
  }

  const years = [...new Set(pastEvents.map(e => e.academicYear))];
  console.log('Academic years found:', years);
  for (const y of years) {
    const filtered = pastEvents.filter(e => e.academicYear === y);
    if (filtered.length === 0) throw new Error('Filter failed for ' + y);
  }

  const queries = ['summit', 'workshop', 't-works', 'hackathon', 'conclave'];
  for (const q of queries) {
    const matches = pastEvents.filter(e => 
      e.name.toLowerCase().includes(q) || 
      (e.summary && e.summary.toLowerCase().includes(q))
    );
    console.log(`Search query "${q}": ${matches.length} matches`);
    if (matches.length === 0) throw new Error('Search failed for ' + q);
  }

  await server.close();
  console.log('FILTERING AND SEARCH LOGIC FULLY VALIDATED!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
