// ALL SITE CONTENT LIVES HERE. Edit this file to change events, team, stats etc.
export const club = {
  name: 'Swayam', tagline: 'Ideas that start with you.',
  email: 'ecell@yourcollege.edu', phone: '+91 00000 00000', address: 'Your College, City, State',
  socials: [{ n: 'Instagram', u: '#' }, { n: 'LinkedIn', u: '#' }, { n: 'X', u: '#' }],
}
export const stats = [
  { n: 40, s: '+', l: 'Events hosted' }, { n: 600, s: '+', l: 'Members' },
  { n: 5000, s: '+', l: 'Participants' }, { n: 6, s: '', l: 'Years running' },
]
export const pillars = [
  { t: 'Pitch competitions', d: 'Present your startup idea to founders and investors.' },
  { t: 'Workshops', d: 'Hands-on sessions on product, marketing and finance.' },
  { t: 'Mentorship', d: 'One-to-one guidance from people who have built companies.' },
  { t: 'Speaker sessions', d: 'Founders and operators share what worked and what failed.' },
  { t: 'Incubation', d: 'Support for student teams turning ideas into ventures.' },
  { t: 'Networking', d: 'Meet builders, alumni and investors in one room.' },
]
export const quotes = [
  { q: 'The best way to predict the future is to build it.', a: 'Swayam E-Cell' },
  { q: 'Start where you are. Use what you have.', a: 'Arthur Ashe' },
  { q: 'Ideas are easy. Execution is everything.', a: 'Swayam E-Cell' },
]
export const events = [
  { slug: 'pitch-fest-2026', name: 'Pitch Fest 2026', category: 'Competition', date: '2026-11-14', time: '10:00 AM', venue: 'Main Auditorium', fee: 0, capacity: 100, filled: 42,
    about: 'Our flagship pitch competition. Teams get five minutes to pitch to a panel of founders and investors.',
    rules: ['Teams of 1 to 4 members', 'Five minute pitch, three minute Q&A', 'Decks must be submitted a day before'],
    schedule: [{ t: '10:00', e: 'Check-in' }, { t: '11:00', e: 'Pitch rounds' }, { t: '15:00', e: 'Finals' }, { t: '17:00', e: 'Prizes' }], prizes: 'Prize pool of ₹50,000 and incubation support.' },
  { slug: 'startup-workshop', name: 'Startup 101 Workshop', category: 'Workshop', date: '2026-10-25', time: '2:00 PM', venue: 'Seminar Hall B', fee: 199, capacity: 80, filled: 71,
    about: 'A practical workshop on validating ideas, building an MVP and finding first customers.',
    rules: ['Bring a laptop', 'Limited seats, first come first served'],
    schedule: [{ t: '14:00', e: 'Idea validation' }, { t: '15:30', e: 'MVP building' }, { t: '16:30', e: 'Q&A' }], prizes: 'Certificate for every attendee.' },
  { slug: 'founders-talk', name: 'Founders Talk', category: 'Speaker', date: '2026-12-05', time: '4:00 PM', venue: 'Open Air Theatre', fee: 0, capacity: 300, filled: 120,
    about: 'Three founders talk about their first year, their mistakes and what they would do differently.',
    rules: ['Entry with registration ticket', 'Gates close 15 minutes after start'],
    schedule: [{ t: '16:00', e: 'Talks' }, { t: '17:30', e: 'Panel' }, { t: '18:00', e: 'Networking' }], prizes: 'No prizes. Plenty of connections.' },
  { slug: 'ideathon', name: 'Ideathon', category: 'Competition', date: '2026-09-10', time: '9:00 AM', venue: 'Innovation Lab', fee: 99, capacity: 60, filled: 60,
    about: 'A 12 hour sprint from problem to prototype.', rules: ['Teams of 2 to 3'], schedule: [{ t: '09:00', e: 'Kickoff' }, { t: '21:00', e: 'Demos' }], prizes: 'Cash prizes for the top three.' },
]
export const team = [
  { name: 'Name Surname', role: 'President', dept: 'CSE' }, { name: 'Name Surname', role: 'Vice President', dept: 'ECE' },
  { name: 'Name Surname', role: 'Events Head', dept: 'ME' }, { name: 'Name Surname', role: 'Design Head', dept: 'IT' },
]
export const timeline = [
  { y: '2020', t: 'Swayam founded', d: 'A small group of students starts the E-Cell.' },
  { y: '2022', t: 'First Pitch Fest', d: 'Our first flagship competition with 200 participants.' },
  { y: '2024', t: 'Incubation begins', d: 'The first student teams receive mentoring and seed support.' },
  { y: '2026', t: 'Going digital', d: 'Registration, tickets and check-in move online.' },
]
export const inr = (n) => (n === 0 ? 'Free' : `₹${n}`)
export const fmt = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
export const statusOf = (e) => e.filled >= e.capacity ? 'Sold out' : new Date(e.date) < new Date() ? 'Closed' : e.filled / e.capacity > .8 ? 'Closing soon' : 'Open'
