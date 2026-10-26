# Generator for enriched events.js
import os

events_js_content = '''// Official Swayam Events Data Store
// Source of truth: VCE Official Swayam Webpage (https://vce.ac.in/campus-life/swayam.php)
// and official event report documents/PDFs.

// Existing posters & E-Summit 2026 assets
import future4ConclaveImg from '../assets/events/future-4-conclave.webp'
import thalirFestImg from '../assets/events/thalir-innovation-fest.webp'
import trailblazerTalkImg from '../assets/events/trailblazer-talk.webp'
import marketInsightsImg from '../assets/events/market-insights-webinar.webp'
import brandBlendImg from '../assets/events/brand-blend.webp'
import civengHackathonImg from '../assets/events/civeng-hackathon.webp'
import patangotsavImg from '../assets/events/patangotsav.webp'
import ventureVisitImg from '../assets/events/venture-visit-t-works.webp'
import esummit2025Img from '../assets/events/esummit-2025.webp'
import designThinkingImg from '../assets/events/design-thinking-workshop.webp'
import tieIdeaCoachImg from '../assets/events/tie-idea-coach.webp'
import esummit2026Img from '../assets/events/esummit-2026.webp'
import esummit2026LaunchImg from '../assets/events/esummit-2026-launch.webp'
import esummit2026IplAuctionImg from '../assets/events/esummit-2026-ipl-auction.webp'
import esummit2026DebateImg from '../assets/events/esummit-2026-debate.webp'
import esummit2026PitchPlayProfitImg from '../assets/events/esummit-2026-pitch-play-profit.webp'
import esummit2026AudienceImg from '../assets/events/esummit-2026-audience.webp'

// Authentic extracted event photos for past events
// E-Summit 2025:
import esummit2025OpeningImg from '../assets/events/esummit-2025-opening.webp'
import esummit2025IplAuctionImg from '../assets/events/esummit-2025-ipl-auction.webp'
import esummit2025DebateImg from '../assets/events/esummit-2025-debate.webp'
import esummit2025HackathonImg from '../assets/events/esummit-2025-hackathon.webp'
import esummit2025MasterclassImg from '../assets/events/esummit-2025-masterclass.webp'
import esummit2025ClosingImg from '../assets/events/esummit-2025-closing.webp'

// Venture Visit to T-Works:
import ventureVisitPrototypingImg from '../assets/events/venture-visit-prototyping.webp'
import ventureVisitFabricationImg from '../assets/events/venture-visit-fabrication.webp'
import ventureVisit3dPrintingImg from '../assets/events/venture-visit-3dprinting.webp'
import ventureVisitPcbImg from '../assets/events/venture-visit-pcb.webp'
import ventureVisitThubInteractionImg from '../assets/events/venture-visit-thub-interaction.webp'

// Patangotsav 2025:
import patangotsavKiteFlyingImg from '../assets/events/patangotsav-kiteflying.webp'
import patangotsavRangoliImg from '../assets/events/patangotsav-rangoli.webp'
import patangotsavTugOfWarImg from '../assets/events/patangotsav-tugofwar.webp'
import patangotsavKiteMakingImg from '../assets/events/patangotsav-kitemaking.webp'

// CIVENG Hackathon 2024:
import civengTeam8Img from '../assets/events/civeng-hackathon-team8.webp'
import civengTurbineImg from '../assets/events/civeng-hackathon-turbine.webp'
import civengPresentationImg from '../assets/events/civeng-hackathon-presentation.webp'
import civengEvaluationImg from '../assets/events/civeng-hackathon-evaluation.webp'
import civengDisplayImg from '../assets/events/civeng-hackathon-display.webp'
import civengWinnersImg from '../assets/events/civeng-hackathon-winners.webp'

// Trailblazer Talk:
import trailblazerSpeakerImg from '../assets/events/trailblazer-talk-speaker.webp'
import trailblazerQuizImg from '../assets/events/trailblazer-talk-quiz.webp'
import trailblazerQaImg from '../assets/events/trailblazer-talk-qa.webp'
import trailblazerAudienceImg from '../assets/events/trailblazer-talk-audience.webp'

// Thalir Innovation Fest:
import thalirLampImg from '../assets/events/thalir-fest-lamp.webp'
import thalirModelsImg from '../assets/events/thalir-fest-models.webp'
import thalirJuryImg from '../assets/events/thalir-fest-jury.webp'
import thalirAssemblyImg from '../assets/events/thalir-fest-assembly.webp'

// FUTURE 4.0 YUVA Conclave:
import future4WorkshopImg from '../assets/events/future-4-conclave-workshop.webp'
import future4FashionImg from '../assets/events/future-4-conclave-fashion.webp'
import future4SharkTankImg from '../assets/events/future-4-conclave-sharktank.webp'
import future4CelebrityImg from '../assets/events/future-4-conclave-celebrity.webp'
import future4TworksImg from '../assets/events/future-4-conclave-tworks.webp'

// TiE Idea Coach 2019:
import tieIdeaPresentationImg from '../assets/events/tie-idea-coach-presentation.webp'
import tieIdeaSessionImg from '../assets/events/tie-idea-coach-session.webp'
import tieIdeaFeedbackImg from '../assets/events/tie-idea-coach-feedback.webp'

// Design Thinking Workshop 2019:
import designThinkingSessionImg from '../assets/events/design-thinking-2019-session.webp'
import designThinkingTeamworkImg from '../assets/events/design-thinking-2019-teamwork.webp'

// ==========================================================================
// 1. UPCOMING EVENTS
// Scheduled for a future date according to the official source.
// Source currently contains no upcoming events. Empty state rendered.
// ==========================================================================
export const upcomingEvents = []

// ==========================================================================
// 2. ONGOING EVENTS
// Currently active/ongoing according to the official source.
// Source currently contains no active events. Empty state rendered.
// ==========================================================================
export const ongoingEvents = []

// ==========================================================================
// 3. PAST EVENTS
// Historically completed events extracted from official VCE reports & tables.
// ==========================================================================
export const pastEvents = [
  // --- 2025-2026 Events ---
  {
    slug: 'e-summit-2026',
    aliases: ['esummit-2026'],
    name: 'E-Summit 2026',
    category: 'Summit',
    status: 'past',
    academicYear: '2025-2026',
    date: '2026-04-10',
    dateDisplay: 'April 10–11, 2026',
    time: '2 Days (Approx. 16 Hours)',
    duration: '2 Days (Approx. 16 Hours)',
    mode: 'Offline',
    venue: 'Vasavi College of Engineering, Ibrahimbagh, Hyderabad',
    participants: '139 (103 Students, 32 External, 4 Faculty)',
    fee: 0,
    poster: esummit2026Img,
    summary: 'Flagship 2-day annual entrepreneurship festival combining keynote talks, interactive workshops, and high-stakes competitive events.',
    about: 'E-Summit 2026 was the annual entrepreneurship festival of Swayam – ED Cell, held across two days. The summit created a vibrant platform combining keynote talks, interactive workshops, and competitive events. Day 1 (10th April) featured the inaugural ceremony, an E-Talk by Viveck Verma (Founder & CEO, Upsurge), the Business Debate Challenge, Ideation x Shark Tank with investor panelists, and IPL Auction Ideation. Day 2 (11th April) focused on skill-building through a GitHub Masterclass by Shahar Banu (DevOps Specialist), an Idea Under Fire pitching challenge, a Content Creation Talk by Vamshi Krishna Reddy and Krishna Chaitanya Reddy, the Smart Campus Hackathon mentored by professionals from ServiceNow, Deloitte, and Pegasystems, and Pitch Play Profit 2.0.',
    objectives: [
      'To nurture entrepreneurial thinking and business acumen among students',
      'To provide hands-on learning through competitions, simulations, and workshops',
      'To connect students with innovators, founders, and industry professionals',
      'To expose participants to real-world business challenges and startup culture'
    ],
    highlights: [
      'Day 1: Inaugural ceremony, keynote E-Talk by Viveck Verma (Upsurge), Business Debate Challenge, Ideation x Shark Tank, and IPL Auction Ideation',
      'Day 2: GitHub Masterclass by Shahar Banu, Idea Under Fire pitching challenge, Content Creation Talk by Vamshi Krishna & Krishna Chaitanya Reddy, Smart Campus Hackathon, and Pitch Play Profit 2.0',
      '₹66,000 total prize pool awarded across 6 competitive tracks to student innovators',
      'Mentorship and judging from industry leaders across ServiceNow, Deloitte, Pegasystems, BM Capital, and Upsurge'
    ],
    flow: [
      {
        day: 'Day 1 (10th April 2026)',
        events: 'Inaugural Ceremony, Keynote E-Talk by Viveck Verma (Founder & CEO, Upsurge), Business Debate Challenge, Ideation x Shark Tank with investor panelists, and IPL Auction Ideation.'
      },
      {
        day: 'Day 2 (11th April 2026)',
        events: 'GitHub Masterclass by Shahar Banu (DevOps Specialist), Idea Under Fire pitching challenge, Content Creation Talk by Vamshi Krishna Reddy & Krishna Chaitanya Reddy, Smart Campus Hackathon mentored by industry experts, and Pitch Play Profit 2.0.'
      }
    ],
    activities: [
      {
        sNo: 1,
        name: 'E-Talk & Business Debate Challenge',
        description: 'Keynote by Viveck Verma (Founder & CEO, Upsurge) encouraging bold entrepreneurial thinking; followed by team debates on rival brands testing analytical and persuasive communication skills.'
      },
      {
        sNo: 2,
        name: 'Ideation x Shark Tank & IPL Auction Ideation',
        description: 'Participants pitched innovative ideas to panelists Puru Modani (BM Capital) and Vishal Reddy (Entrepreneurology) for investor-level feedback; IPL Auction Ideation tested resource allocation and strategic decision-making.'
      },
      {
        sNo: 3,
        name: 'GitHub Masterclass & Idea Under Fire',
        description: 'Hands-on Git & GitHub training by Shahar Banu (DevOps Specialist) on collaborative development tools; rapid-fire pitching challenge testing spontaneity and confidence under pressure.'
      },
      {
        sNo: 4,
        name: 'Smart Campus Hackathon',
        description: 'Participants developed innovative solutions to campus challenges under mentorship from Abhiram Sreekar (ServiceNow), Shilpa Joshi (Deloitte), and Kaushal Attaluri (Pegasystems).'
      },
      {
        sNo: 5,
        name: 'Content Creation Talk & Pitch Play Profit 2.0',
        description: 'Session by Vamshi Krishna Reddy and Krishna Chaitanya Reddy on storytelling and digital branding; simulation event requiring strategic planning and entrepreneurial decision-making.'
      }
    ],
    speakers: [
      { name: 'Viveck Verma', role: 'Founder & CEO, Upsurge' },
      { name: 'Puru Modani', role: 'BM Capital Family Office' },
      { name: 'Vishal Reddy', role: 'Entrepreneurology' },
      { name: 'Shahar Banu', role: 'DevOps Specialist' },
      { name: 'Vamshi Krishna Reddy' },
      { name: 'Krishna Chaitanya Reddy' },
      { name: 'Abhiram Sreekar', role: 'ServiceNow' },
      { name: 'Shilpa Joshi', role: 'Deloitte' },
      { name: 'Kaushal Attaluri', role: 'Pegasystems' }
    ],
    winners: [
      {
        event: 'IPL Auction',
        first: 'V.Sathvik & V.Sravan (Team SRH)',
        firstAmount: '₹ 3,000',
        second: 'S. Gireesh (Team RCB)',
        secondAmount: '₹ 2,000',
        third: 'Akshith (Team KKR)',
        thirdAmount: '₹ 1,000',
        pool: '₹ 6,000'
      },
      {
        event: 'Business Debate Challenge',
        first: 'Hitesh & Vikranth (Team Skunkworks)',
        firstAmount: '₹ 3,000',
        second: 'Ravi, Pavan, Karthik, Nitvik',
        secondAmount: '₹ 2,000',
        third: 'S.Gireesh & C.Dhruv',
        thirdAmount: '₹ 1,000',
        pool: '₹ 6,000'
      },
      {
        event: 'Idea under Fire',
        first: 'Praveen (Team Shieldra)',
        second: 'Praneeth (Team Suits)',
        third: 'Nischal & Viswaroop',
        pool: 'Prize details: See official report'
      },
      {
        event: 'Pitch Play Profit 2.0',
        first: 'N. Keerthana',
        firstAmount: '₹ 3,000',
        second: 'Viswaroop',
        secondAmount: '₹ 2,000',
        third: 'V.Sravan',
        thirdAmount: '₹ 1,000',
        pool: '₹ 6,000'
      },
      {
        event: 'Ideation X Shark Tank',
        first: 'Praneeth',
        firstAmount: '₹ 10,000',
        second: 'Klenot and Laxmi Narasimha',
        secondAmount: '₹ 5,000',
        third: 'Tony Preetham & Lasya Priya',
        thirdAmount: '₹ 3,000',
        pool: '₹ 18,000'
      },
      {
        event: 'Hackathon',
        first: 'Amogh (Career Craft)',
        firstAmount: '₹ 10,000',
        second: 'Bhavesh, Ananya (Ragnarok)',
        secondAmount: '₹ 5,000',
        third: 'Nexus Mentis & Blind Guy',
        thirdAmount: '₹ 3,000',
        pool: '₹ 18,000'
      }
    ],
    totalPrizePool: '₹ 66,000',
    prizeNote: 'Prize information is reproduced from the official event report; the report contains an internal discrepancy in the Idea under Fire prize amounts.',
    participantStats: {
      students: 103,
      external: 32,
      faculty: 4,
      total: 139
    },
    expenditure: {
      amount: '₹ 1,53,447',
      sources: 'Institution (₹66,000) / Sponsorship (₹46,500) / Registration Fee (₹40,947)'
    },
    outcomes: 'Greater entrepreneurial awareness and confidence among 100+ participants; improved problem-solving, analytical, and decision-making skills; strengthened leadership and teamwork; practical exposure to pitching, digital branding, and technical tools such as Git/GitHub; expanded networking opportunities with industry professionals and peers.',
    conclusion: 'E-Summit 2026 was successfully executed, achieving its objectives and delivering significant value to all 100 participants. The contributions of guest speakers and industry professionals enriched the experience, reinforcing the ED Cell’s vision of fostering entrepreneurship and innovation. The summit stands as a benchmark initiative.',
    feedback: 'Participants responded positively to the summit, appreciating the diversity of activities and quality of industry engagement. The Shark Tank and Hackathon sessions were highlighted as the most impactful. Suggestions included extending the duration of individual workshops and providing pre-event reading materials.',
    programLevels: [
      'Level 1: Expert Talk / Exposure Visit / Mentoring Session',
      'Level 2: Conference / Seminar / Workshop / Competition',
      'Level 3: Boot Camp / Competition / Hackathon / Demo Day',
      'Level 4: Challenges / Tech-Fest / Boot Camp'
    ],
    domains: [
      'IPR & Technology Transfer',
      'Innovation & Design Thinking',
      'Entrepreneurship & Startup',
      'Pre-incubation & Incubation Management',
      'Safe & Trusted AI',
      'Human Capital',
      'Science',
      'Resilience, Innovation & Efficiency',
      'Economic Growth & Social Good',
      'Democratizing AI Resources',
      'Inclusion for Social Empowerment'
    ],
    gallery: [
      { img: esummit2026Img, caption: 'Inaugural Ceremony & Stage Backdrop at APJ Auditorium' },
      { img: esummit2026LaunchImg, caption: 'Unveiling "The Swayam Times" and NODE Platform on Stage' },
      { img: esummit2026IplAuctionImg, caption: 'IPL Auction Ideation Simulation Session' },
      { img: esummit2026DebateImg, caption: 'Business Debate Challenge Presentations' },
      { img: esummit2026PitchPlayProfitImg, caption: 'Pitch Play Profit 2.0 Strategic Board Simulation' },
      { img: esummit2026AudienceImg, caption: 'Audience and Student Participants at APJ Auditorium' }
    ]
  },

  // --- 2024-2025 Events ---
  {
    slug: 'esummit-2025',
    name: 'E-Summit 2025',
    category: 'Summit',
    status: 'past',
    academicYear: '2024-2025',
    date: '2025-04-07',
    dateDisplay: 'April 7–9, 2025',
    time: '3-Day Conclave',
    duration: '3 Days',
    mode: 'Offline',
    venue: 'APJ Auditorium, QEEE Hall, JC Bose Block & CV Raman Block, VCE',
    participants: '200 (180 Attendees & Volunteers, 12 Distinguished Guests)',
    fee: 0,
    poster: esummit2025Img,
    summary: 'A 3-day flagship entrepreneurship summit featuring keynote innovator talks, competitive tracks (Shark Tank, IPL Auction, GreenTech Hackathon), and practical masterclasses.',
    about: 'E-Summit 2025 was a 3-day flagship entrepreneurship festival organized by Swayam (ED Cell) at Vasavi College of Engineering. Bringing together students, innovators, and industry leaders, the conclave featured a comprehensive lineup including keynote talks by seasoned founders, competitive challenges simulating real-world venture operations, specialized masterclasses in AI and content creation, and a dynamic Startup Expo. The summit fostered active cross-disciplinary collaboration across engineering branches.',
    objectives: [
      'To foster entrepreneurial spirit and proactive problem-solving among students',
      'To facilitate direct knowledge exchange between industry founders and students',
      'To promote cross-disciplinary innovation through hands-on technical and business challenges',
      'To provide networking opportunities with startup founders, mentors, and investors'
    ],
    highlights: [
      'Day 1: Opening Ceremony & E-Talk by Charan Lakkaraju (Student Tribe), Shark Tank investor pitches, IPL Mock Auction, and E-Quiz',
      'Day 2: Keynote E-Talk by Tarunpreet Singh (Gabru Di Chaap), Content Creation Masterclass, Business Debate, Brand Marketing, and GreenTech Hackathon',
      'Day 3: Keynote E-Talk by Shashank Anumula (MD Cafe Niloufer), LinkedIn Profile Workshop, AI Masterclass, and Grand Closing Ceremony',
      '11 curated competitive, technical, and educational tracks across APJ Auditorium, QEEE Hall, and CV Raman Block',
      'Total footfall of 180 participants and volunteers with 12 distinguished guest speakers'
    ],
    flow: [
      {
        day: 'Day 1 (7th April 2025)',
        events: 'Opening Ceremony (10:00 AM – 11:30 AM, APJ Auditorium), E-Talk by Charan Lakkaraju (11:30 AM – 12:30 PM, APJ Auditorium), Shark Tank Pitching (11:30 AM – 4:20 PM, QEEE Hall), IPL Mock Auction (1:00 PM – 4:20 PM, CV 302), and E-Quiz (2:00 PM – 4:00 PM, JC 301).'
      },
      {
        day: 'Day 2 (8th April 2025)',
        events: 'Content Creation Masterclass (10:00 AM – 12:00 PM, APJ Auditorium), Business Debate Challenge (11:30 AM – 1:30 PM, JC 301), Brand Marketing Challenge (11:30 AM – 1:30 PM, VS 301), GreenTech Hackathon (11:30 AM – 4:20 PM, QEEE Hall), and Keynote E-Talk by Tarunpreet Singh (2:00 PM – 4:00 PM, APJ Auditorium).'
      },
      {
        day: 'Day 3 (9th April 2025)',
        events: 'LinkedIn Masterclass (10:00 AM – 11:30 AM, QEEE Hall), AI Masterclass (11:30 AM – 1:00 PM, QEEE Hall), Keynote E-Talk by Shashank Anumula (2:00 PM – 3:30 PM, QEEE Hall), and Closing Ceremony (3:30 PM – 4:30 PM, QEEE Hall).'
      }
    ],
    activities: [
      {
        sNo: 1,
        name: 'Shark Tank',
        description: 'Participants pitched innovative startup ideas to a panel of investors, simulating a real-world venture funding environment.'
      },
      {
        sNo: 2,
        name: 'E-Talk: Insights from the Innovators',
        description: 'Keynote dialogues with industry leaders sharing their entrepreneurial journeys, challenges, operational hurdles, and scaling strategies.'
      },
      {
        sNo: 3,
        name: 'Masterclass on AI',
        description: 'Explored the impact of Artificial Intelligence across industry verticals, providing hands-on knowledge on integrating AI into business solutions.'
      },
      {
        sNo: 4,
        name: 'IPL Auction Ideation',
        description: 'Strategic simulation where student teams built virtual cricket squads through mock bidding, testing financial planning and resource optimization under constraints.'
      },
      {
        sNo: 5,
        name: 'E-Quiz',
        description: 'Fast-paced business and startup-themed quiz challenging participants on commerce fundamentals, market trivia, and analytical agility.'
      },
      {
        sNo: 6,
        name: 'GreenTech Hackathon',
        description: 'Sustainability-focused hackathon where teams engineered tech-based solutions for environmental conservation and clean energy challenges.'
      },
      {
        sNo: 7,
        name: 'LinkedIn Workshop',
        description: 'Hands-on practical session on optimizing LinkedIn profiles, personal branding, and cultivating digital professional networks.'
      },
      {
        sNo: 8,
        name: 'Business Debate Challenge',
        description: 'Structured debate rounds on current strategic dilemmas and competitive industry rivalries testing public speaking and persuasive logic.'
      },
      {
        sNo: 9,
        name: 'Content Creation Masterclass',
        description: 'Workshop covering digital storytelling, organic growth marketing, and multi-platform content production workflows.'
      },
      {
        sNo: 10,
        name: 'Startup Expo',
        description: 'Exhibition arena where student and regional startups showcased prototypes, products, and services to attendees and mentors.'
      },
      {
        sNo: 11,
        name: 'Pitch. Play. Profit: The Ultimate Startup Showdown',
        description: 'Interactive business board simulation inspired by Monopoly where teams built ventures, navigated market cards, and competed for ecosystem dominance.'
      }
    ],
    speakers: [
      { name: 'Charan Lakkaraju', role: 'CEO, Student Tribe (Day 1 Keynote)' },
      { name: 'Tarunpreet Singh', role: 'Co-Founder, Gabru Di Chaap (Day 2 Keynote)' },
      { name: 'Shashank Anumula', role: 'MD, Cafe Niloufer (Day 3 Keynote)' }
    ],
    participantStats: {
      attendees: 180,
      guests: 12,
      total: 200
    },
    outcomes: 'The E-Summit successfully achieved its core objectives of cultivating entrepreneurial mindsets and facilitating direct knowledge exchange between industry practitioners and 180+ attendees. Diverse competitive simulations gave participants hands-on exposure to venture pitch evaluations, strategic budgeting, and digital storytelling.',
    feedback: 'Participant engagement was strong across all 3 days. Dedicated volunteer teams ensured smooth transitions between parallel venues (APJ Auditorium, QEEE Hall, CV Raman Block, JC Block, VS Block). Pre-event movement planning and real-time schedule coordination were identified as key organizational successes.',
    gallery: [
      { img: esummit2025OpeningImg, caption: 'Opening Ceremony & Keynote E-Talk Session at APJ Auditorium' },
      { img: esummit2025IplAuctionImg, caption: 'IPL Auction Mock Bidding & Resource Allocation Strategy' },
      { img: esummit2025DebateImg, caption: 'Business Debate Challenge & Interactive Presentations' },
      { img: esummit2025HackathonImg, caption: 'GreenTech Hackathon Teams Designing Sustainable Solutions' },
      { img: esummit2025MasterclassImg, caption: 'AI and Content Creation Masterclass Workshop Sessions' },
      { img: esummit2025ClosingImg, caption: 'Valedictory Session & Organizing Committee Felicitation' }
    ],
    officialReportUrl: 'https://vce.ac.in/campus-life/downloads/swayam/2024-2025/11.pdf',
    officialWebsiteUrl: 'https://www.esummitswayam.com/'
  },
  {
    slug: 'venture-visit-tworks',
    name: 'Venture Visit to T-Works & T-Hub',
    category: 'Industrial Visit',
    status: 'past',
    academicYear: '2024-2025',
    date: '2025-01-27',
    dateDisplay: 'January 27, 2025',
    mode: 'Offline',
    venue: 'T-Works & T-Hub, Hyderabad',
    participants: '34 students accompanied by 1 faculty member',
    fee: 0,
    poster: ventureVisitImg,
    summary: "Experiential immersion at India's largest prototyping center (T-Works) and leading incubator (T-Hub).",
    about: 'Swayam organized an industrial exposure visit to T-Works and T-Hub on January 27, 2025, for a cohort of 34 engineering students accompanied by a faculty coordinator. The visit provided practical exposure to hardware product development and the broader startup incubation ecosystem in Telangana. At T-Works, students toured specialized workstations converting physical designs into functional prototypes. At T-Hub, students interacted with incubated founders and received advisory guidance on venture formation and financing.',
    objectives: [
      'To observe end-to-end hardware prototyping workflows and industrial manufacturing machinery',
      'To understand material specifications, machining tolerances, and production cost economics',
      'To engage directly with practicing founders inside premier incubation facilities',
      'To clarify questions regarding early-stage startup funding, incubation entry, and business development'
    ],
    highlights: [
      'Tour of T-Works facilities: rapid prototyping, wood and metal workshops, laser cutting/engraving, 3D printing, ceramic studio, and PCB fabrication',
      'Machinery cost and material breakdown explanations provided by T-Works technical specialists',
      'Interactive founder dialogues with the teams behind Land Doctor and Social Redirect at T-Hub',
      'Senior advisor mentorship session with Mr. Karthik, Senior Startup Advisor at T-Hub'
    ],
    activities: [
      {
        sNo: 1,
        name: 'T-Works Prototyping Facility Walkthrough',
        description: 'Detailed inspection of hardware fabrication machines, laser cutters, 3D printing labs, ceramic kilns, and PCB manufacturing stations with explanations on material selection and machining tolerances.'
      },
      {
        sNo: 2,
        name: 'Startup Founder Interactions at T-Hub',
        description: 'Discussion sessions with the founders of incubated ventures Land Doctor and Social Redirect, reviewing their product-market fit journey and operational hurdles.'
      },
      {
        sNo: 3,
        name: 'Startup Advisory & Venture Funding Q&A',
        description: 'Interactive masterclass with Mr. Karthik (Senior Startup Advisor, T-Hub) offering strategic advice on building defensible startups, customer validation, and securing institutional seed capital.'
      }
    ],
    speakers: [
      { name: 'Mr. Karthik', role: 'Senior Startup Advisor, T-Hub' },
      { name: 'Founders of Land Doctor', role: 'T-Hub Incubated Startup' },
      { name: 'Founders of Social Redirect', role: 'T-Hub Incubated Startup' }
    ],
    participantStats: {
      students: 34,
      faculty: 1,
      total: 35
    },
    outcomes: 'Engineering participants gained practical perspective on translating theoretical design concepts into physical hardware prototypes, while learning how regional incubators assist young founders with mentorship, infrastructure, and early-stage capital access.',
    gallery: [
      { img: ventureVisitPrototypingImg, caption: 'Demonstration of Rapid Prototyping Systems at T-Works' },
      { img: ventureVisitFabricationImg, caption: 'Precision Metal and Wood Fabrication Units Tour' },
      { img: ventureVisit3dPrintingImg, caption: 'Industrial 3D Printing and Additive Manufacturing Lab' },
      { img: ventureVisitPcbImg, caption: 'PCB Fabrication and Electronics Assembly Workstation' },
      { img: ventureVisitThubInteractionImg, caption: 'Mentorship and Q&A Session with Startup Advisors at T-Hub' }
    ],
    officialReportUrl: 'https://vce.ac.in/campus-life/downloads/swayam/2024-2025/08.pdf'
  },
  {
    slug: 'patangotsav-2025',
    name: 'Patangotsav – Sankranti Celebration',
    category: 'Cultural',
    status: 'past',
    academicYear: '2024-2025',
    date: '2025-01-09',
    dateDisplay: 'January 9, 2025',
    time: '3:00 PM – 5:30 PM',
    mode: 'Offline',
    venue: 'Vasavi College of Engineering Campus',
    jointOrganizers: 'Swayam (ED Cell), NSS, and Rangmanch',
    participants: '100',
    fee: 50,
    poster: patangotsavImg,
    summary: 'Traditional Sankranti celebration fostering teamwork, sportsmanship, and student creativity across 6 festive competitive activities.',
    about: 'Patangotsav was organized on January 9, 2025, as a collaborative campus festival by Swayam (ED Cell), NSS, and Rangmanch. Designed to connect students with cultural traditions while encouraging collaboration, sportsmanship, and creative recreation, the event featured 6 parallel activities across multiple campus venues including kite making, kite flying, rangoli design, and athletic challenges.',
    objectives: [
      'To celebrate cultural heritage and community spirit on campus ahead of Sankranti',
      'To cultivate inter-departmental teamwork, coordination, and friendly sportsmanship',
      'To encourage creative craftsmanship and artistic expression through traditional folk crafts'
    ],
    highlights: [
      'Joint campus collaboration between Swayam (ED Cell), NSS, and Rangmanch',
      '6 parallel activities: Rangoli Competition, Tug of War, Kite Making, Relay Race, Snatch Sprint, and Kite Flying',
      'Dedicated venues utilized across V-Block, JC Block, Canteen Lane, R-Block, and College Ground',
      '100 student participants across various engineering batches'
    ],
    activities: [
      {
        sNo: 1,
        name: 'Rangoli Competition',
        description: 'Students displayed artistic talent creating intricate, colorful rangoli motifs. Venue: V-Block Quadrangle; Team Size: 3; Time: 3:00 PM – 5:00 PM; Entry Fee: ₹50/team.'
      },
      {
        sNo: 2,
        name: 'Tug of War',
        description: 'Intense test of team strength, synchronized pulling, and athletic stamina. Venue: Canteen Lane; Team Size: 10; Time: 3:00 PM – 5:00 PM; Entry Fee: ₹50/team.'
      },
      {
        sNo: 3,
        name: 'Kite Making',
        description: 'Students designed and crafted bespoke kites with custom themes, balancing visual aesthetics and aerodynamic balance. Venue: JC Block; Time: 3:00 PM – 5:00 PM; Entry Fee: ₹50.'
      },
      {
        sNo: 4,
        name: 'Relay Race',
        description: 'Speed, endurance, and baton handover agility contest across campus pathways. Venue: R-Block & PIM; Team Size: 3; Time: 3:00 PM – 5:00 PM; Entry Fee: ₹50/team.'
      },
      {
        sNo: 5,
        name: 'Snatch Sprint',
        description: 'High-speed tactical sprinting and agility challenge requiring quick reflexes. Venue: JC Block Ground Floor; Team Size: 5; Time: 3:00 PM – 5:00 PM; Entry Fee: ₹50/team.'
      },
      {
        sNo: 6,
        name: 'Kite Flying',
        description: 'Traditional kite flying celebration on the college grounds symbolizing soaring aspirations and festivity. Venue: College Ground; Time: 3:00 PM – 5:00 PM.'
      }
    ],
    participantStats: {
      total: 100
    },
    expenditure: {
      amount: '₹ 4,315',
      sources: 'Materials budget: Kites and Lanterns (₹3,300), Event Posters (₹480), Brushes, Fevicol & Sketches (₹195), Cello & Double Tapes (₹210), Charts & Markers (₹90), Refreshments (₹40)'
    },
    outcomes: 'Successfully connected students with traditional cultural celebrations while fostering team bonding and healthy competitive camaraderie across engineering departments.',
    gallery: [
      { img: patangotsavKiteFlyingImg, caption: 'Student Kite Flying Celebrations on the College Ground' },
      { img: patangotsavRangoliImg, caption: 'Vibrant Rangoli Design Competition at V-Block Quadrangle' },
      { img: patangotsavTugOfWarImg, caption: 'Tug of War Team Strength Challenge at Canteen Lane' },
      { img: patangotsavKiteMakingImg, caption: 'Handcrafted Themed Kite Making Competition at JC Block' }
    ],
    officialReportUrl: 'https://vce.ac.in/campus-life/downloads/swayam/2024-2025/07.pdf'
  },
  {
    slug: 'civeng-hackathon-2024',
    name: 'CIVENG Hackathon 2024',
    category: 'Hackathon',
    status: 'past',
    academicYear: '2024-2025',
    date: '2024-11-13',
    dateDisplay: 'November 13, 2024',
    mode: 'Offline',
    venue: 'Environmental Engineering Lab, Civil Engineering Department, VCE',
    coordinator: 'Dr. K. Jayasree (Associate Professor, CED)',
    participants: '30 students (10 teams of 3)',
    fee: 0,
    poster: civengHackathonImg,
    summary: 'Innovation hackathon on sustainable infrastructure and technological advancements in civil engineering.',
    about: 'The CIVENG Hackathon 2024 was conducted on November 13, 2024, by the Department of Civil Engineering under the Institution of Engineers Students Chapter. Generously sponsored by distinguished alumni Mr. Aditya Mokkapati (Batch of 2010) and Mr. Arunav Mokkapati (Batch of 2007), the hackathon challenged 10 inter-batch teams (comprising 2nd, 3rd, and 4th-year civil engineering students) to conceptualize and present working solutions for real-world environmental and infrastructural problems.',
    objectives: [
      'To encourage civil engineering students to innovate sustainable and technology-driven infrastructure models',
      'To foster cross-year collaboration between senior and junior engineering undergraduates',
      'To evaluate student solutions against practical criteria of feasibility, scalability, and sustainability'
    ],
    highlights: [
      'Three core challenge themes: Sustainable Infrastructure, Future Construction Technologies, and Rural Development',
      '10 multi-year engineering teams presenting working models and technical prototypes',
      'Alumni sponsorship and faculty mentorship from the Civil Engineering Department',
      'Evaluation by an expert panel of professors based on standardized hackathon rubrics'
    ],
    activities: [
      {
        sNo: 1,
        name: 'Prototype Development & Model Exhibition',
        description: '10 student teams constructed models addressing waste-to-wealth, radiant cooling, village sustainability, zero emission buildings, permeable geopolymers, and wind capture.'
      },
      {
        sNo: 2,
        name: 'Technical Evaluation & Defense',
        description: 'Teams defended their solutions before faculty judges assessing innovation, technical feasibility, sustainability, presentation, and scalability.'
      }
    ],
    speakers: [
      { name: 'Dr. C. Mohanlal', role: 'Associate Professor, CED (Judge)' },
      { name: 'Mr. G. Raghavendra', role: 'Associate Professor, CED (Judge)' },
      { name: 'Dr. Swarnadeepa Chakraborthy', role: 'Assistant Professor, CED (Judge)' },
      { name: 'Dr. K. Jayasree', role: 'Associate Professor, CED (Event Coordinator)' },
      { name: 'Mr. Aditya Mokkapati', role: 'Alumni Sponsor (Batch of 2010)' },
      { name: 'Mr. Arunav Mokkapati', role: 'Alumni Sponsor (Batch of 2007)' }
    ],
    winners: [
      {
        event: 'Best Project & Most Innovative Solution',
        first: 'Team 8: Siddam Sai Saketh (4/4), Vistarakula Charan (2/4), Beeravelli Abhinav Reddy (2/4)',
        pool: 'Smart System for Segregated Waste Collection & Energy Recovery'
      },
      {
        event: 'Best Project & Technical Excellence',
        first: 'Team 10: Doniparthi Venkatesh Teo (2/4), Pagidipalli Divij Kumar (2/4), Kantha Gouthami (2/4)',
        pool: 'Tornado Turbine (Optimized Low-Wind Energy Capture)'
      },
      {
        event: 'Consolation & Appreciation Prize',
        first: 'Team 5: K. Sailaxmi (4/4), Chelamalla Lavanya (3/4), Katterapaka Sowmya (2/4)',
        pool: 'Sustainable Porous Pavements Using Recycled Aggregates & Geopolymers'
      }
    ],
    participantStats: {
      students: 30,
      teams: 10,
      total: 30
    },
    outcomes: 'Students applied classroom structural and environmental engineering concepts to design actionable solutions for waste management, renewable energy generation, and green infrastructure.',
    gallery: [
      { img: civengTeam8Img, caption: 'Team 8 Demonstrating IoT Smart Waste Segregation System' },
      { img: civengTurbineImg, caption: 'Team 10 Exhibiting the Tornado Turbine Renewable Energy Prototype' },
      { img: civengPresentationImg, caption: 'Student Teams Defending Projects Before Faculty Judging Panel' },
      { img: civengEvaluationImg, caption: 'Judges Assessing Technical Feasibility and Model Mechanics' },
      { img: civengDisplayImg, caption: 'Prototype Display and Cross-Year Technical Collaboration' },
      { img: civengWinnersImg, caption: 'Winning Teams and Faculty Mentors at Environmental Engineering Lab' }
    ],
    officialReportUrl: 'https://vce.ac.in/campus-life/downloads/swayam/2024-2025/06.pdf'
  },
  {
    slug: 'brand-blend-workshop',
    name: 'Brand Blend: Empowering Startups with Identity',
    category: 'Workshop',
    status: 'past',
    academicYear: '2024-2025',
    date: '2024-10-16',
    dateDisplay: 'October 16, 2024',
    time: '10:00 AM – 4:20 PM',
    mode: 'Offline',
    venue: 'QEEE Hall, JC Bose Block, VCE',
    supervision: 'Dr. PVS Subhashini (Assistant Professor, MED)',
    participants: '70 (28 teams)',
    fee: 0,
    poster: brandBlendImg,
    summary: 'Brand creation workshop and Brand-Craft design competition led by Nakshatra Gangala (Avaastha).',
    about: 'Brand Blend was conducted on October 16, 2024, by Swayam ED Cell to equip student startups with practical brand-building skills. Combining an intensive masterclass by Ms. Nakshatra Gangala (Founder of Avaastha) with the "Brand-Craft" hands-on design contest, 70 participants across 28 teams learned the nuances of brand storytelling, visual identity psychology, and multi-channel consistency.',
    objectives: [
      'To instill a deep understanding of brand identity and positioning in entrepreneurial ventures',
      'To teach visual design principles including color psychology, typography, and logo aesthetics',
      'To provide practical application through a competitive design sprint on assigned startup themes'
    ],
    highlights: [
      'Masterclass by Nakshatra Gangala sharing regional branding success stories from Telangana (Siddipet)',
      'Brand-Craft competition where 28 student teams designed logos and identity collateral',
      'Evaluation based on aesthetic cohesion, narrative alignment, and consumer resonance',
      '₹2,250 cash awards distributed to top-performing student design teams'
    ],
    activities: [
      {
        sNo: 1,
        name: 'Brand Creation Masterclass',
        description: 'Expert guidance on consumer perception psychology, brand storytelling, color palettes, typography hierarchies, and platform cohesion.'
      },
      {
        sNo: 2,
        name: 'Brand-Craft Design Competition',
        description: 'Teams were assigned business themes and tasked with drafting complete startup visual identities and logo marks under timed constraints.'
      }
    ],
    speakers: [
      { name: 'Ms. Nakshatra Gangala', role: 'Founder, Avaastha' },
      { name: 'Dr. PVS Subhashini', role: 'Assistant Professor, MED (Faculty In-Charge)' }
    ],
    totalPrizePool: '₹ 2,250',
    participantStats: {
      students: 70,
      teams: 28,
      total: 70
    },
    expenditure: {
      amount: '₹ 5,000',
      sources: 'Approved budget: Cash prize awards (₹2,250), Swayam Memento (₹1,200), Event Banners (₹680), Guest Lunch (₹388), Snacks & Water (₹180), Posters (₹140), Certificates (₹110), Stationery (₹52)'
    },
    outcomes: 'Participants acquired actionable frameworks for building distinctive startup brand marks and aligning visual elements with business value propositions.',
    feedback: 'The workshop was well-received by attendees. Organizers managed brief infrastructure hiccups (a 30-minute Wi-Fi interruption and 10-minute power outage) effectively without disrupting student presentations.',
    officialReportUrl: 'https://vce.ac.in/campus-life/downloads/swayam/2024-2025/05.pdf'
  },
  {
    slug: 'market-insights-webinar',
    name: 'Market Insights: Transforming Ideas Into Winning Businesses',
    category: 'Webinar',
    status: 'past',
    academicYear: '2024-2025',
    date: '2024-10-09',
    dateDisplay: 'October 9, 2024',
    time: '7:00 PM – 8:30 PM',
    duration: '1 Hour 30 Minutes',
    mode: 'Online',
    venue: 'Online (Microsoft Teams)',
    participants: '55',
    fee: 0,
    poster: marketInsightsImg,
    summary: 'Interactive masterclass on market differentiation, financial risk, and scaling by Arun Kumar (Vajra Events).',
    about: 'Conducted on October 9, 2024, this online masterclass hosted Mr. Arun Kumar, Founder of Vajra Events, sharing his journey of enterprise building with 55 student attendees. The session covered the practical realities of validating ideas in crowded marketplaces, managing cash flows during operational crises, and differentiating service offerings.',
    objectives: [
      'To examine actionable strategies for product and service differentiation in saturated markets',
      'To understand financial risk mitigation and liquidity management in event ventures',
      'To explore methods for adapting business models to changing client expectations and emerging technologies'
    ],
    highlights: [
      'Online webinar on Microsoft Teams engaging 55 student innovators and founders',
      'Keynote dialogue with Arun Kumar, Founder of Vajra Events',
      'Structured discussion across 8 operational themes followed by a 25-minute open Q&A'
    ],
    flow: [
      {
        day: '7:00 PM – 7:20 PM (20 mins)',
        events: 'Welcoming remarks and introductory overview of the guest speaker and meeting agenda.'
      },
      {
        day: '7:20 PM – 8:00 PM (40 mins)',
        events: 'Guest insights from Arun Kumar covering technology adaptation, financial prudence, crisis response, and differentiation.'
      },
      {
        day: '8:00 PM – 8:25 PM (25 mins)',
        events: 'Interactive audience Q&A session addressing student venture concepts and industry dynamics.'
      },
      {
        day: '8:25 PM – 8:30 PM (5 mins)',
        events: 'Formal vote of thanks and webinar closing.'
      }
    ],
    speakers: [
      { name: 'Mr. Arun Kumar', role: 'Founder, Vajra Events' }
    ],
    participantStats: {
      total: 55
    },
    outcomes: 'Equipped aspiring founders with practical insights on crisis navigation, client relationship management, and financial discipline in high-pressure event enterprises.',
    officialReportUrl: 'https://vce.ac.in/campus-life/downloads/swayam/2024-2025/04.pdf'
  },
  {
    slug: 'trailblazer-talk',
    name: 'Trailblazer Talk with Rahul Tirumalapragada',
    category: 'Speaker',
    status: 'past',
    academicYear: '2024-2025',
    date: '2024-09-12',
    dateDisplay: 'September 12, 2024',
    time: '1:30 PM – 4:10 PM',
    mode: 'Offline',
    venue: 'QEEE Hall, JC Bose Block, VCE',
    supervision: 'Swayam ED Cell Volunteers',
    participants: '89',
    fee: 0,
    poster: trailblazerTalkImg,
    summary: 'Entrepreneurial fireside talk with Rahul Tirumalapragada, Founder of Makers of Milkshakes.',
    about: 'On September 12, 2024, Swayam ED Cell organized a Trailblazer Talk featuring Rahul Tirumalapragada, Founder of Makers of Milkshakes, in QEEE Hall. Addressing an audience of 89 students, Rahul recounted his journey from launching a single beverage outlet to building a recognized national franchise, discussing early hurdles, quality maintenance, and scalable operational frameworks.',
    objectives: [
      'To expose students to the practical journey and mindset required to scale an F&B franchise in India',
      'To share operational strategies for overcoming supply chain, vendor, and retail management bottlenecks',
      'To inspire student confidence through direct dialogue with a successful young regional founder'
    ],
    highlights: [
      'Interactive warm-up business quiz on entrepreneurship, commerce strategy, and the food & beverage sector',
      'Keynote address by Rahul Tirumalapragada on building Makers of Milkshakes',
      'Moderated dialogue on leadership philosophy, expansion models, and market adaptability',
      '30-minute direct student Q&A covering early capital raising, franchise royalties, and vendor relations'
    ],
    flow: [
      {
        day: '1:30 PM – 1:45 PM',
        events: 'Audience assembly in QEEE Hall, JC Bose Block.'
      },
      {
        day: '1:45 PM – 2:20 PM',
        events: 'Interactive business quiz testing audience knowledge on startups and the F&B industry.'
      },
      {
        day: '2:20 PM – 2:35 PM',
        events: 'Guest arrival and introductory briefing by student hosts.'
      },
      {
        day: '2:35 PM – 3:10 PM',
        events: 'Keynote speaking session by Rahul Tirumalapragada on venture origins and growth hurdles.'
      },
      {
        day: '3:10 PM – 3:30 PM',
        events: 'Moderated questionnaire covering leadership, unit economics, and brand positioning.'
      },
      {
        day: '3:30 PM – 4:10 PM',
        events: 'Open audience Q&A session and concluding vote of thanks.'
      }
    ],
    speakers: [
      { name: 'Mr. Rahul Tirumalapragada', role: 'Founder, Makers of Milkshakes' }
    ],
    participantStats: {
      total: 89
    },
    outcomes: 'Students gained practical knowledge of retail operations, product quality control under franchising models, and the importance of perseverance in scaling consumer ventures.',
    gallery: [
      { img: trailblazerSpeakerImg, caption: 'Rahul Tirumalapragada Sharing the Story of Makers of Milkshakes' },
      { img: trailblazerQuizImg, caption: 'Interactive Entrepreneurship Quiz Warming Up the Crowd' },
      { img: trailblazerQaImg, caption: 'Moderated Dialogue on Franchise Operations and Unit Economics' },
      { img: trailblazerAudienceImg, caption: 'Student Audience and Coordinators Assembled at QEEE Hall' }
    ],
    officialReportUrl: 'https://vce.ac.in/campus-life/downloads/swayam/2024-2025/03.pdf'
  },
  {
    slug: 'thalir-innovation-fest',
    name: 'Thalir Innovation Fest',
    category: 'Competition',
    status: 'past',
    academicYear: '2024-2025',
    date: '2024-09-09',
    dateDisplay: 'September 9, 2024',
    time: '9:00 AM – 2:50 PM',
    mode: 'Offline',
    venue: 'Vasavi College of Engineering',
    supervision: 'Dr. PVS Subhashini (Mech. Dept.) Supported by Swayam ED Cell Volunteers',
    participants: '130',
    fee: 0,
    poster: thalirFestImg,
    summary: 'Student innovation festival showcasing working models for climate change, sustainability, and accessibility.',
    about: 'Conducted on September 9, 2024, under the supervision of Dr. PVS Subhashini and supported by Swayam volunteers, the Thalir Innovation Fest provided a platform for students to demonstrate working models addressing urgent societal challenges. Organized in partnership with Young Indians (Yi) and Vasavi Innovations (VI), the event featured project evaluations by an expert jury, keynote addresses, and awareness presentations on climate change and universal accessibility.',
    objectives: [
      'To showcase student-engineered solutions tackling climate change, clean energy, and physical accessibility',
      'To connect student innovators with industry mentors and multidisciplinary jury evaluators',
      'To select outstanding school and collegiate innovations for progression to the national innovation fest'
    ],
    highlights: [
      'Ceremonial lighting of the lamp and collective VI Innovation Pledge',
      'Introduction of Vasavi Innovations (VI) vision by Ashwin Agarwal and Tripty Agarwal',
      'Screening of "Masoom" awareness video on child rights and social responsibility presented by Poonam Agarwal',
      'Competitive exhibition of working student models evaluated on creativity, feasibility, and impact',
      'Presentations on climate resilience and universal design by Ashmi (Chair, Accessibility)',
      'Announcement of selected schools and colleges advancing to the upcoming national festival'
    ],
    flow: [
      {
        day: '9:00 AM – 9:50 AM',
        events: 'Volunteer reporting, welcome address, ceremonial lighting of the lamp, and VI Pledge.'
      },
      {
        day: '10:00 AM – 11:00 AM',
        events: 'Introduction to VI & Thalir Fest by Ashwin & Tripty Agarwal, jury introduction by Abhilasha Agarwal, jury panel discussion, Masoom presentation, and participant orientation.'
      },
      {
        day: '11:10 AM – 1:00 PM',
        events: 'Model setup, jury refreshment break, and student innovation model competition evaluation.'
      },
      {
        day: '1:00 PM – 2:10 PM',
        events: 'Lunch break, assembly in main hall, climate change and accessibility presentations by Ashmi, VI Anthem, and keynote by Shivani Lova.'
      },
      {
        day: '2:10 PM – 2:50 PM',
        events: 'Prize distribution ceremony, national fest qualifying announcements, vote of thanks by Sunny Parikeh, and National Anthem.'
      }
    ],
    speakers: [
      { name: 'Ashwin Agarwal', role: 'Co-Chair, Young Indians (Yi)' },
      { name: 'Tripty Agarwal', role: 'Chair, Innovation Vertical' },
      { name: 'Abhilasha Agarwal', role: 'Co-Chair, Innovation Vertical' },
      { name: 'Poonam Agarwal', role: 'Chair, Thalir' },
      { name: 'Saurabh Agarwal', role: 'Co-Chair' },
      { name: 'Ashmi', role: 'Chair, Accessibility' },
      { name: 'Shivani Lova', role: 'Chair, Young Indians (Yi)' },
      { name: 'Sunny Parikeh', role: 'Co-Chair of Innovation' }
    ],
    participantStats: {
      total: 130
    },
    outcomes: 'Stimulated actionable discussion on accessibility and environmental sustainability while recognizing high-impact student projects ready for national representation.',
    gallery: [
      { img: thalirLampImg, caption: 'Lighting of the Lamp Ceremony with Faculty Dignitaries and Guests' },
      { img: thalirModelsImg, caption: 'Students Demonstrating Working Engineering Models to Evaluators' },
      { img: thalirJuryImg, caption: 'Jury Panel Evaluating Submissions on Feasibility and Impact' },
      { img: thalirAssemblyImg, caption: 'Valedictory Assembly and Singing of the National Anthem' }
    ],
    officialReportUrl: 'https://vce.ac.in/campus-life/downloads/swayam/2024-2025/02.pdf'
  },
  {
    slug: 'future-4-conclave',
    name: 'FUTURE 4.0 YUVA Hyderabad Conclave',
    category: 'Competition',
    status: 'past',
    academicYear: '2024-2025',
    date: '2024-09-05',
    dateDisplay: 'September 5–6, 2024',
    mode: 'Offline',
    venue: 'Vasavi College of Engineering & Taramati Baradari',
    supervision: 'Dr. PVS Subhashini (Mech. Dept.) Supported by Swayam ED Cell Volunteers',
    participants: '100 (16 regional teams from across India)',
    fee: 0,
    poster: future4ConclaveImg,
    summary: 'National conclave hosting Future 4.0 Health Regional Finals, Shark Tank pitching, and youth mental wellness keynote.',
    about: 'Held on September 5–6, 2024, the FUTURE 4.0 YUVA Hyderabad Conclave was a premier national gathering bringing together student innovators from across India. Hosted at Vasavi College of Engineering and Taramati Baradari, the conclave featured a hands-on design thinking workshop, a sustainable fashion contest, Shark Tank pitching rounds where Vasavi teams secured institutional deals, a celebrity keynote on mental wellness by Miheeka Daggubati, the Future 4.0 Health Regional Finals, and an industrial InnovTour to T-Works.',
    objectives: [
      'To host collegiate innovators from across India for high-level technical and business competitions',
      'To integrate entrepreneurship pitching with sustainable design and mental wellness education',
      'To expose healthcare innovators to rapid hardware prototyping facilities at T-Works'
    ],
    highlights: [
      '16 collegiate finalist teams representing different states across India',
      'Innovation Design Thinking Workshop and Sustainable Fashion Climate Change Contest',
      'Shark Tank pitch session with Vasavi teams EVfinity and GoTeach securing investment deals',
      'Scenic heritage walk and mental health dialogue with celebrity speaker Miheeka Daggubati',
      'InnovTour to T-Works prototyping center for 8 health finalists and 21 Vasavi students'
    ],
    flow: [
      {
        day: 'Day 1 (5th September 2024)',
        events: 'Student reception at Taramati (5:00 AM – 10:00 AM), campus arrival, Innovation Design Thinking Workshop (11:00 AM – 12:30 PM), Sustainable Fashion Climate Change Competition (1:30 PM – 3:00 PM), and Entrepreneurship Shark Tank (3:30 PM – 5:30 PM).'
      },
      {
        day: 'Day 2 (6th September 2024)',
        events: 'Scenic Heritage Walk from Taramati to Narsingi Road & breakfast (6:30 AM – 8:30 AM), Celebrity Keynote on Mental Wellness by Miheeka Daggubati (9:30 AM – 10:00 AM), Future 4.0 Health Regional Finals (10:00 AM – 1:00 PM), and InnovTour at T-Works (2:00 PM).'
      }
    ],
    activities: [
      {
        sNo: 1,
        name: 'Innovation Design Thinking Workshop',
        description: 'Hands-on ideation and creative problem-solving workshop for visiting and campus delegates.'
      },
      {
        sNo: 2,
        name: 'Sustainable Fashion Climate Change Competition',
        description: 'Auditorium showcase where 40+ participants combined recycled materials and sustainable aesthetics.'
      },
      {
        sNo: 3,
        name: 'Entrepreneurship Shark Tank',
        description: 'High-stakes pitching arena where student ventures pitched business models to a panel of sharks.'
      },
      {
        sNo: 4,
        name: 'Future 4.0 Health Regional Finals',
        description: 'Sixteen collegiate teams from across India presented tech-driven solutions for modern healthcare challenges.'
      },
      {
        sNo: 5,
        name: 'InnovTour at T-Works',
        description: 'Exclusive technical tour of T-Works hardware manufacturing equipment for health finalists and Vasavi students.'
      }
    ],
    speakers: [
      { name: 'Miheeka Daggubati', role: 'Celebrity Speaker (Mental Wellness Keynote)' },
      { name: 'Dr. PVS Subhashini', role: 'Faculty Supervisor, Mech. Dept.' }
    ],
    winners: [
      {
        event: 'Entrepreneurship Shark Tank',
        first: 'Team EVfinity (Deal Secured: ₹ 15,000)',
        second: 'Team GoTeach (Deal Secured: ₹ 10,000)',
        pool: '₹ 25,000'
      },
      {
        event: 'Sustainable Fashion Competition',
        second: 'Anu Tapaswi (Vasavi College)',
        first: 'See official report',
        pool: '2nd Prize'
      },
      {
        event: 'Future 4.0 Health Regional Finals',
        first: 'Collegiate Team 1 (Kochi)',
        second: 'Collegiate Team 2 (Kochi)',
        pool: 'National Finals Advancement'
      }
    ],
    participantStats: {
      total: 100,
      teams: 16
    },
    outcomes: 'Provided nationwide visibility for Vasavi innovators, secured direct seed deals for student startups EVfinity and GoTeach, and advanced collegiate health innovations toward national finals.',
    gallery: [
      { img: future4WorkshopImg, caption: 'Design Thinking and Ideation Workshop Session' },
      { img: future4FashionImg, caption: 'Sustainable Fashion Climate Change Competition Runway' },
      { img: future4SharkTankImg, caption: 'Student Startup Pitching During Entrepreneurship Shark Tank' },
      { img: future4CelebrityImg, caption: 'Miheeka Daggubati Delivering Keynote on Anxiety and Mental Wellness' },
      { img: future4TworksImg, caption: 'Health Competition Finalists on InnovTour at T-Works' }
    ],
    officialReportUrl: 'https://vce.ac.in/campus-life/downloads/swayam/2024-2025/01.pdf'
  },

  // --- 2018-2020 Historical Events ---
  {
    slug: 'design-thinking-workshop-2019',
    name: 'Design Thinking Workshop',
    category: 'Workshop',
    status: 'past',
    academicYear: '2019-2020',
    date: '2019-11-06',
    dateDisplay: 'November 6, 2019',
    mode: 'Offline',
    venue: 'Vasavi College of Engineering',
    participants: '50+',
    fee: 0,
    poster: designThinkingImg,
    summary: 'Hands-on design thinking workshop mentored by Ms. Radhika Meenakshi Shankar.',
    about: 'The Design Thinking Workshop was held on November 6, 2019, organized by Swayam and mentored by Ms. Radhika Meenakshi Shankar. Conducted across two intensive modules, the session stimulated creative problem solving, teaching students to identify latent customer pain points through structured observation and execute rapid prototyping with multidisciplinary teams.',
    objectives: [
      'To help students stimulate lateral creativity and elevate problem-solving skills',
      'To train participants in observing market behaviors and user friction points like entrepreneurs',
      'To improve team-working capabilities and collaborative prototyping under time constraints'
    ],
    highlights: [
      'Full-day workshop mentored by renowned design thinking expert Ms. Radhika Meenakshi Shankar',
      'Two-part pedagogical structure: morning cognitive observation followed by afternoon team execution',
      'Hands-on team working exercises applying customer empathy principles'
    ],
    flow: [
      {
        day: 'Morning Session',
        events: 'Interactive lecture and observational exercises on learning to think uniquely and analyze problems through an entrepreneurial lens.'
      },
      {
        day: 'Afternoon Session',
        events: 'Practical team implementation session testing collaborative problem-solving and team-working dynamics.'
      }
    ],
    speakers: [
      { name: 'Ms. Radhika Meenakshi Shankar', role: 'Design Thinking Mentor' }
    ],
    participantStats: {
      total: 50
    },
    outcomes: 'Students learned structured design thinking methodologies, transitioning from theoretical contemplation to practical, empathetic prototype formulation.',
    gallery: [
      { img: designThinkingSessionImg, caption: 'Ms. Radhika Meenakshi Shankar Mentoring Students on Design Thinking' },
      { img: designThinkingTeamworkImg, caption: 'Interactive Team Collaboration and Observational Ideation Exercises' }
    ],
    officialReportUrl: 'https://drive.google.com/open?id=1prchJAUd4qmc-i8czi7pXZRgUYxrn3Up',
    photosLink: 'https://photos.app.goo.gl/2LudpFCmkyweJqHv7'
  },
  {
    slug: 'thub-mou-ttribe',
    name: 'T-Hub MoU for T-Tribe',
    category: 'MoU & Partnership',
    status: 'past',
    academicYear: '2019-2020',
    date: '2019-10-25',
    dateDisplay: 'October 25, 2019',
    mode: 'Offline',
    venue: 'T-Hub, Hyderabad',
    participants: 'College-wide',
    fee: 0,
    poster: null,
    summary: 'Strategic MoU partnership signed between Vasavi College and T-Hub to establish T-Tribe.',
    about: 'On October 25, 2019, Vasavi College of Engineering entered into a formal Memorandum of Understanding (MoU) with T-Hub, India’s premier innovation ecosystem, to establish the T-Tribe initiative. Held at T-Hub, the ceremony established five foundational engagement pillars designed to bridge academia and India\'s startup ecosystem.',
    objectives: [
      'To connect Vasavi students with T-Hub\'s extensive startup and corporate innovation network',
      'To establish structured incubation support, mentorship, and industry exposure pathways on campus'
    ],
    highlights: [
      'Official MoU signing between Vasavi College of Engineering and T-Hub Hyderabad',
      'Keynote address by Ravi Narayan, CEO of T-Hub, encouraging student venture ambitions',
      'Inputs from implementation partner iDEA labs (Pankaj, CEO) and technology partner Socio hub (Praveen, CEO)',
      'Presentation of an inter-college radio platform concept by Asoka S Kanna (CEO & Founder, Younify)'
    ],
    activities: [
      {
        sNo: 1,
        name: 'T-Tribe Five Pillar Framework',
        description: 'Establishment of 5 core campus pillars: (1) Engagement activities, (2) Industry connect, (3) Industry-Academia meets, (4) Mentorship portal access, and (5) Networking opportunities.'
      },
      {
        sNo: 2,
        name: 'Ecosystem Partner Presentations',
        description: 'Presentations by iDEA labs CEO Pankaj and Socio hub CEO Praveen on technical support and entrepreneurship enablement tools.'
      }
    ],
    speakers: [
      { name: 'Ravi Narayan', role: 'CEO, T-Hub' },
      { name: 'Pankaj', role: 'CEO, iDEA labs (Implementation Partner)' },
      { name: 'Praveen', role: 'CEO, Socio hub (Technology Partner)' },
      { name: 'Asoka S Kanna', role: 'CEO & Founder, Younify (Connecting Classroom)' }
    ],
    outcomes: 'Established dedicated institutional channels for Vasavi students to access T-Hub mentorship cohorts, venture events, and incubator resources.',
    officialReportUrl: 'https://drive.google.com/file/d/1oi_ybUJXB6bA-E6i3KxNG13_cvmKXxeH/view?usp=sharing',
    photosLink: 'https://photos.app.goo.gl/RzqpkquoWnoHbyDS8'
  },
  {
    slug: 'training-tie-idea-coach',
    name: 'Training with TiE Idea Coach',
    category: 'Workshop',
    status: 'past',
    academicYear: '2019-2020',
    date: '2019-09-27',
    dateDisplay: 'September 27, 2019',
    time: '1:00 PM – 4:20 PM',
    mode: 'Offline',
    venue: 'Ramanujan Block Seminar Hall, Ground Floor, VCE',
    participants: '11 Teams (60+ students)',
    fee: 0,
    poster: tieIdeaCoachImg,
    summary: 'Intensive idea coaching and entrepreneurial mindset session conducted by TiE Idea Coach Dr. Suresh Kumar.',
    about: 'On September 27, 2019, Swayam organized a three-hour idea coaching and elevator pitch masterclass conducted by TiE GRAD Idea Coach Dr. Suresh Kumar in the Ramanujan Block Seminar Hall. Starting with principles of cognitive transformation and belief systems, the session guided 11 student venture teams through the formulation and delivery of rapid one-minute elevator pitches with critical mentor feedback.',
    objectives: [
      'To cultivate mental resilience, positive conviction, and entrepreneurial attitude in students',
      'To train student founders on structuring concise, high-impact one-minute elevator pitches',
      'To evaluate early venture ideas on realistic problem solving and market viability'
    ],
    highlights: [
      'Keynote by Dr. Suresh Kumar on attitude transformation and his 21-day roadmap to entrepreneurial success',
      '11 student venture teams pitched live 1-minute elevator presentations',
      'Direct, constructive mentor critique on realistic feasibility, audience persuasion, and value clarity',
      'Interactive audience engagement testing peer critique and Q&A handling'
    ],
    activities: [
      {
        sNo: 1,
        name: 'Cognitive Mindset & Entrepreneurial Attitude Session',
        description: 'Explored cognitive psychology in entrepreneurship, emphasizing that experience is shaped by thought and habit transformation.'
      },
      {
        sNo: 2,
        name: 'Elevator Pitch Training & 11-Team Presentations',
        description: 'Teams were briefed on elevator pitch constraints and delivered one-minute presentations tested on problem clarity and conviction.'
      },
      {
        sNo: 3,
        name: 'Pitch Critique & Mentorship Feedback',
        description: 'Dr. Suresh Kumar provided detailed critique on each idea’s real-world feasibility and persuasive delivery.'
      }
    ],
    speakers: [
      { name: 'Dr. Suresh Kumar', role: 'TIE GRAD Idea Coach' }
    ],
    participantStats: {
      teams: 11,
      total: 60
    },
    outcomes: 'The 11 pitching teams received immediate, actionable feedback on tightening their value propositions, understanding pitch deck brevity, and preparing for regional business plan competitions.',
    gallery: [
      { img: tieIdeaPresentationImg, caption: 'Dr. Suresh Kumar Addressing Student Innovators at Ramanujan Hall' },
      { img: tieIdeaSessionImg, caption: 'Student Teams Delivering 1-Minute Rapid Elevator Pitches' },
      { img: tieIdeaFeedbackImg, caption: 'Interactive Feedback and Constructive Critique Session with TiE Coach' }
    ],
    officialReportUrl: 'https://drive.google.com/open?id=15wuuhbZp99l3m2eYn3x0a2sTs_ZwTD0x'
  },
  {
    slug: 'tie-grad-mou',
    name: 'TiE Grad MoU & Ideation Conclave',
    category: 'MoU & Partnership',
    status: 'past',
    academicYear: '2019-2020',
    date: '2019-08-28',
    dateDisplay: 'August 28, 2019',
    mode: 'Offline',
    venue: 'Vasavi College of Engineering',
    participants: '250+ students attended; 50+ teams pitched',
    fee: 0,
    poster: null,
    summary: 'MoU Exchange with TiE Global under the #Education2Entrepreneurship campus initiative followed by a 50+ team ideation pitch.',
    about: 'On August 28, 2019, under the banner of #Education2Entrepreneurship, Vasavi College of Engineering executed an official MoU exchange with TiE (The Indus Entrepreneurs) Hyderabad Chapter. Attended by over 250 students and college management alongside TiE Secretariat delegates, the event kicked off the TiE Grad program with founder keynotes, a hands-on Lean Canvas workshop, and rapid elevator pitching by more than 50 student teams.',
    objectives: [
      'To formalize institutional partnership with TiE Hyderabad under the TiE Grad initiative',
      'To train students on Lean Canvas validation and concise elevator pitch mechanics',
      'To launch campus cohorts for regional and global TiE business plan competitions'
    ],
    highlights: [
      'Formal MoU Exchange between Vasavi College and TiE Hyderabad leadership',
      'Over 250 student participants and more than 50 venture teams actively pitching',
      'Keynote by N Venkatesh (SVP, Redpine Signals & Board Member, TiE Hyderabad) on entrepreneurial hustle',
      'Keynote by Srikanthan Tirumala (CEO, Hooperlabs & Board Member, TiE Hyderabad) on founder resilience',
      'Post-lunch hands-on Lean Canvas brainstorming session mentored by Dr. Suresh Kumar V'
    ],
    flow: [
      {
        day: 'Morning Session',
        events: 'MoU Exchange ceremony; TiE Grad program outline and hustle/responsibilities talk by N Venkatesh; founder journey keynote by Srikanthan Tirumala.'
      },
      {
        day: 'Post-Lunch Session',
        events: 'Brainstorming workshop and Lean Canvas mapping mentored by Dr. Suresh Kumar V; followed by elevator pitching by 50+ student teams.'
      }
    ],
    speakers: [
      { name: 'Dr. Suresh Kumar V', role: 'Founder & CEO, Dr. Gene Clinix; Idea Coach, TiE Grad' },
      { name: 'Mr. N Venkatesh', role: 'Senior Vice President, Redpine Signals Inc & Board Member, TiE Hyderabad' },
      { name: 'Mr. Srikanthan Tirumala', role: 'Founder & CEO, Hooperlabs Inc & Board Member, TiE Hyderabad' }
    ],
    participantStats: {
      students: 250,
      teams: 50,
      total: 250
    },
    outcomes: 'Connected 250+ students directly with TiE’s global mentoring, education, networking, and incubation network, producing 50+ lean canvases.',
    officialReportUrl: 'https://drive.google.com/open?id=18UcC_TeVLqAlmKnmJkpZWCkzVcI12CFE',
    photosLink: 'https://photos.app.goo.gl/GZJS9SznhTPqWQ7PA'
  },
  {
    slug: 'swayam-orientation-2019',
    name: 'Swayam Orientation Session 2019',
    category: 'Orientation',
    status: 'past',
    academicYear: '2019-2020',
    date: '2019-08-21',
    dateDisplay: 'August 21, 2019',
    mode: 'Offline',
    venue: 'Vasavi College of Engineering',
    participants: '150+',
    fee: 0,
    poster: null,
    summary: 'Annual induction program with Chief Guest Umesh Thota, Principal Dr. S.V. Ramana, and Dr. T. Ramamohan Rao.',
    about: 'The 2019 orientation program of Swayam – ED Cell was held on August 21, 2019, setting in motion the cell\'s annual activities. Graced by Chief Guest Mr. Umesh Thota, Principal Dr. S.V. Ramana, and Founder Dr. T. Ramamohan Rao, the induction brought together incoming students to celebrate past milestones, understand startup opportunities, and unveil the annual operational plan.',
    objectives: [
      'To introduce incoming engineering students to the objectives and resources of Swayam E-Cell',
      'To inspire student entrepreneurship through firsthand experiences shared by founder alumni',
      'To unveil the student leadership committee and annual calendar of initiatives for 2019–20'
    ],
    highlights: [
      'Ceremonial lighting of the lamp and opening addresses by Dr. T. Ramamohan Rao and Dr. S.V. Ramana',
      'Interactive talk by Chief Guest Umesh Thota recounting the challenges of launching his venture',
      'Address by ex-member Shreya emphasizing the critical importance of teamwork and initiative',
      'Induction of the 2019 executive team under Ankita Reddy (President) and Shiva Kumar Gattu (Vice-President)',
      'Commitment from faculty in-charge K. I. Spurgeon to serve as the backbone of the ED Cell'
    ],
    flow: [
      {
        day: 'Inaugural & Dignitary Addresses',
        events: 'Welcoming guests to dais, lighting of the lamp, prayer song, and speeches by Dr. T. Ramamohan Rao and Principal Dr. S.V. Ramana.'
      },
      {
        day: 'Keynote & Interactive Dialogue',
        events: 'Session with Chief Guest Umesh Thota discussing venture inception hurdles and personal entrepreneurial insights.'
      },
      {
        day: 'Team Induction & Plan of Action',
        events: 'Teamwork address by ex-member Shreya; official duty assignments; faculty in-charge remarks by K. I. Spurgeon; presentation of annual plan of action by President Ankita Reddy; token presentations and vote of thanks by Vice-President Shiva Kumar Gattu.'
      }
    ],
    speakers: [
      { name: 'Mr. Umesh Thota', role: 'Chief Guest & Startup Founder' },
      { name: 'Dr. S.V. Ramana', role: 'Principal, Vasavi College of Engineering' },
      { name: 'Dr. T. Ramamohan Rao', role: 'Founder, Swayam E-Cell' },
      { name: 'K. I. Spurgeon', role: 'Faculty In-Charge, Swayam' },
      { name: 'Ankita Reddy', role: 'President, Swayam 2019-20' },
      { name: 'Shiva Kumar Gattu', role: 'Vice-President, Swayam 2019-20' },
      { name: 'Shreya', role: 'Ex-Swayam Member' }
    ],
    participantStats: {
      total: 150
    },
    outcomes: 'Successfully inducted the 2019 student executive council, mapped out the annual calendar of cell initiatives, and engaged 150+ incoming students.',
    officialReportUrl: 'https://drive.google.com/open?id=18HRdPPDlrxdhMcEfUBPG9mKLBeTedn29',
    photosLink: 'https://photos.app.goo.gl/RLWWrMBPERo5XaRcA'
  },
  {
    slug: 'wf-nen-e-leader-workshop',
    name: 'WF-NEN: E-Leader Workshop',
    category: 'Workshop',
    status: 'past',
    academicYear: '2019-2020',
    date: '2019-08-08',
    dateDisplay: 'August 8–9, 2019',
    time: '9:00 AM – 5:00 PM (approx.)',
    duration: '2 Days',
    mode: 'Offline',
    venue: 'Vasavi College of Engineering',
    participants: '26 student leaders from 9 educational institutions across Hyderabad',
    fee: 0,
    poster: null,
    summary: 'Two-day E-Leader Bootcamp mentored by Wadhwani Foundation mentor Mr. Amit Singh.',
    about: 'Hosted at Vasavi College of Engineering on August 8–9, 2019, the WF-NEN E-Leader Workshop was an intensive two-day leadership program for 26 student leaders representing 9 educational institutions across Hyderabad. Mentored by Mr. Amit Singh, Regional Manager of Wadhwani Foundation, the bootcamp trained participants on operating institutional startup clubs, launching first ventures, and utilizing the LearnWISE portal.',
    objectives: [
      'To equip student leaders with frameworks for operating an active collegiate entrepreneurship club',
      'To guide leaders on incubating campus first ventures through milestone-driven support',
      'To introduce hands-on curriculum tools through the Wadhwani Foundation LearnWISE portal'
    ],
    highlights: [
      'Multi-institutional leadership cohort uniting 26 student delegates from 9 Hyderabad colleges',
      'Two-day immersive training led by Wadhwani Foundation Regional Manager Mr. Amit Singh',
      '"One Dollar Venture" simulation task challenging leaders to create real micro-businesses in hours',
      'Inspirational and advisory masterclass by Dr. Radhika Meenakshi Shankar',
      'Hands-on onboarding to the LearnWISE online Start-Up Club curriculum portal'
    ],
    flow: [
      {
        day: 'Day 1 (8th August 2019)',
        events: 'Curriculum on annual startup club operation; One Dollar Venture launch task to experience operational execution; annual milestone mapping; evening assignment to formulate annual club roadmaps.'
      },
      {
        day: 'Day 2 (9th August 2019)',
        events: 'Presentations on One Dollar Venture covering execution, revenue, and sustainability; presentations on annual club roadmaps with mentor critique; advisory session with Dr. Radhika Meenakshi Shankar; LearnWISE portal walkthrough; networking and group photo.'
      }
    ],
    activities: [
      {
        sNo: 1,
        name: 'One Dollar Venture Simulation',
        description: 'Student teams were tasked with launching a live micro-business to experience capital deployment, customer acquisition, and revenue generation in real time.'
      },
      {
        sNo: 2,
        name: 'Startup Club Operation Architecture',
        description: 'Detailed training on setting up year-round mentorship, event calendars, and incubation pipelines within colleges.'
      },
      {
        sNo: 3,
        name: 'LearnWISE Platform Onboarding',
        description: 'Practical training on using the Wadhwani Foundation online curriculum portal to guide student startup cohorts.'
      }
    ],
    speakers: [
      { name: 'Mr. Amit Singh', role: 'Regional Manager, Wadhwani Foundation (Lead Mentor)' },
      { name: 'Dr. Radhika Meenakshi Shankar', role: 'Advisory Mentor' }
    ],
    participantStats: {
      students: 26,
      institutions: 9,
      total: 26
    },
    outcomes: 'Equipped 26 campus leaders with operational roadmaps and curricular toolkits to build self-sustaining entrepreneurship cells and seed student ventures in their institutions.',
    officialReportUrl: 'https://drive.google.com/open?id=1FjHNaPnKJy-0GJCJkwYZE4xlPAif4LDq',
    photosLink: 'https://photos.app.goo.gl/7qZd3E8PTP4tT1mU6'
  },
  {
    slug: 'internship-drive-2019',
    name: 'Swayam Internship Drive 2019',
    category: 'Career & Drive',
    status: 'past',
    academicYear: '2018-2019',
    date: '2019-04-08',
    dateDisplay: 'April 8, 2019',
    mode: 'Offline',
    venue: 'Vasavi College of Engineering',
    participants: '100+',
    fee: 0,
    poster: null,
    summary: 'Campus startup recruitment drive providing internship placements across emerging ventures.',
    about: 'Organized on April 8, 2019, at Vasavi College of Engineering, the Swayam Internship Drive provided an exclusive platform connecting undergraduate students with regional startups and emerging enterprises. Over 100 students participated in interview and screening rounds across software engineering, digital marketing, operations, and business development.',
    objectives: [
      'To connect students with practical, high-growth startup internship opportunities',
      'To help early-stage ventures recruit passionate technical and business talent from campus',
      'To bridge classroom engineering concepts with real-world startup product cycles'
    ],
    highlights: [
      'On-campus interview cycles conducted by founders and hiring leads of emerging ventures',
      'Cross-disciplinary roles offered across technical engineering, design, and growth marketing',
      'Over 100 students participating in resume reviews and interview rounds'
    ],
    participantStats: {
      total: '100+'
    },
    outcomes: 'Facilitated internship placements for undergraduate students, giving them direct immersion into fast-paced early-stage startup work cultures.',
    sourceNote: 'The official document linked in college records requires authenticated institutional access. Core details are preserved from the verified VCE portal table.',
    officialReportUrl: 'https://drive.google.com/file/d/0B_I_6G8Z-CwcVzR1LVZDbkU3U0dYWHNNb1pRMWM3UEhtUFFF/view?usp=sharing',
    photosLink: 'https://photos.app.goo.gl/kXUKoLGi6vVmTxNYA'
  },
  {
    slug: 'esummit-2k19',
    name: 'E-Summit 2k19',
    category: 'Summit',
    status: 'past',
    academicYear: '2018-2019',
    date: '2019-01-19',
    dateDisplay: 'January 19–20, 2019',
    duration: '2 Days',
    mode: 'Offline',
    venue: 'Tagore Auditorium, Osmania University',
    participants: '300+',
    fee: 500,
    poster: null,
    summary: 'Flagship inter-collegiate entrepreneurship conclave with founder talks, pitch challenges, and women entrepreneur panels.',
    about: 'E-Summit 2k19 was Swayam’s flagship two-day inter-collegiate entrepreneurship conclave held on January 19–20, 2019, at Tagore Auditorium, Osmania University. Bringing together more than 300 students, founders, and investors, the conclave featured inspirational keynotes from civic and corporate leaders, the D.I.S.R.U.P.T ideation workshop, a dedicated panel on women in entrepreneurship, and a competitive pitch track awarding ₹10,000 cash prizes to the most unique idea from each engineering branch (CSE, ECE, EEE, IT, MECH, and CIVIL).',
    objectives: [
      'To foster inter-collegiate innovation and venture creation across Hyderabad universities',
      'To provide structured ideation and market-testing frameworks through the D.I.S.R.U.P.T workshop',
      'To spotlight and support women in entrepreneurship and technology ventures',
      'To reward student innovators with branch-specific seed cash grants totaling ₹60,000'
    ],
    highlights: [
      'Inaugural address by Chief Guest Dr. Jayaprakash Narayana motivating young changemakers',
      'Keynotes by tech founders Arjun Rao (CEO, ValueLabs), Vaishali Neotia (CEO, Merxius), and Raj Neravati (CEO, Hug Innovations)',
      'D.I.S.R.U.P.T brainstorming session on generating, analyzing, executing, and modifying startup ideas',
      '₹60,000 cash prize pool with ₹10,000 awarded to the top team from each branch: CSE, ECE, EEE, IT, MECH, and CIVIL',
      'Dedicated panel discussion on women in entrepreneurship'
    ],
    flow: [
      {
        day: 'Day 1 (19th January 2019)',
        events: 'Inaugural address by Chief Guest Dr. Jayaprakash Narayana; idea generation session by SriCharan Lakkaraju; market-friendly ideas lecture by Arjun Rao (CEO, ValueLabs); D.I.S.R.U.P.T idea generation workshop; Young India Opportunities talk by government administrative officials; tech venture journey by Vaishali Neotia (CEO, Merxius); and evening entertainment.'
      },
      {
        day: 'Day 2 (20th January 2019)',
        events: 'Market and risk analysis talk by business analyst Rajiv Thakkar; Women in Entrepreneurship panel discussion; resilience address by Raj Neravati (CEO, Hug Innovations); and final idea presentation competition before mentors and investors.'
      }
    ],
    activities: [
      {
        sNo: 1,
        name: 'D.I.S.R.U.P.T Ideation Workshop',
        description: 'Comprehensive Day 1 workshop teaching four-member teams how to systematically generate, analyze, execute, and modify early-stage venture ideas.'
      },
      {
        sNo: 2,
        name: 'Inter-Branch Idea Pitching Challenge',
        description: 'Day 2 presentation challenge where teams pitched before industry mentors and angel investors for branch honors.'
      },
      {
        sNo: 3,
        name: 'Women in Entrepreneurship Forum',
        description: 'Panel discussion highlighting the successes, hurdles, and scaling strategies for female founders in technology.'
      }
    ],
    speakers: [
      { name: 'Dr. Jayaprakash Narayana', role: 'Chief Guest & Former IAS Officer' },
      { name: 'SriCharan Lakkaraju', role: 'Founder & Keynote Speaker' },
      { name: 'Arjun Rao', role: 'CEO, ValueLabs' },
      { name: 'Vaishali Neotia', role: 'CEO, Merxius' },
      { name: 'Rajiv Thakkar', role: 'Business Analyst & Public Speaker' },
      { name: 'Raj Neravati', role: 'CEO, Hug Innovations' }
    ],
    winners: [
      {
        event: 'CSE Innovation Track',
        first: 'Top CSE Venture Team',
        pool: '₹ 10,000'
      },
      {
        event: 'ECE Innovation Track',
        first: 'Top ECE Venture Team',
        pool: '₹ 10,000'
      },
      {
        event: 'EEE Innovation Track',
        first: 'Top EEE Venture Team',
        pool: '₹ 10,000'
      },
      {
        event: 'IT Innovation Track',
        first: 'Top IT Venture Team',
        pool: '₹ 10,000'
      },
      {
        event: 'MECH Innovation Track',
        first: 'Top MECH Venture Team',
        pool: '₹ 10,000'
      },
      {
        event: 'CIVIL Innovation Track',
        first: 'Top CIVIL Venture Team',
        pool: '₹ 10,000'
      }
    ],
    totalPrizePool: '₹ 60,000',
    participantStats: {
      total: 300
    },
    outcomes: 'Delivered high-impact ideation training to 300+ student delegates, rewarded 6 branch-specific winning teams with ₹10,000 each, and provided direct exposure to funded entrepreneurs and investors.',
    officialReportUrl: 'https://docs.google.com/document/d/1qIsT_op7yNwWNMyKvVxeDzezq0JBPr9ir5sK90QKxKI/edit?usp=sharing',
    photosLink: 'https://photos.app.goo.gl/mZmaLWZNTd8FPS8cA'
  },
  {
    slug: 'kite-fest-2020',
    name: 'Kite Fest 2020',
    category: 'Cultural',
    status: 'past',
    academicYear: '2019-2020',
    date: '2020-01-10',
    dateDisplay: 'January 10, 2020',
    mode: 'Offline',
    venue: 'Vasavi College of Engineering Campus',
    participants: '100+',
    fee: 0,
    poster: null,
    summary: 'Sankranti festive community gathering and creative kite flying celebration.',
    about: 'Celebrated on the college campus on January 10, 2020, on the eve of Sankranti, Kite Fest 2020 brought students and faculty together for kite-making, creative design contests, and team camaraderie outside academic schedules.',
    objectives: [
      'To commemorate traditional Sankranti folk celebrations on campus',
      'To foster cross-departmental student community bonding and creative recreation'
    ],
    highlights: [
      'Campus kite-flying celebration and festive food stalls',
      'Student community bonding, folk craft displays, and creative relaxation',
      'Documented official photo album on the VCE Swayam portal'
    ],
    participantStats: {
      total: '100+'
    },
    outcomes: 'Strengthened campus community bonding through shared cultural celebrations and team recreation.',
    sourceNote: 'The official photo album is verified and preserved from the VCE Swayam portal records. A formal written report was not archived on the portal table.',
    photosLink: 'https://photos.app.goo.gl/SEebNGLdmi88Dou89'
  },
  {
    slug: 'eweek-2k18',
    name: 'E-Week 2k18',
    category: 'Festival',
    status: 'past',
    academicYear: '2017-2018',
    date: '2018-03-01',
    dateDisplay: 'March 2018',
    mode: 'Offline',
    venue: 'Vasavi College of Engineering',
    participants: '250+',
    fee: 0,
    poster: null,
    summary: 'Week-long festival with student-run campus ventures, entrepreneurial games, and startup exhibits.',
    about: 'E-Week 2k18 was a week-long entrepreneurship festival organized by Swayam at Vasavi College of Engineering in March 2018. Featuring student-run business stalls, game kiosks, ideation challenges, and peer networking, it instilled the spirit of grassroots commerce across the campus community.',
    objectives: [
      'To encourage grassroots commerce and early student-run micro-ventures on campus',
      'To create practical experience in budgeting, pricing, marketing, and peer sales'
    ],
    highlights: [
      'Week-long festival of student-run enterprise stalls and game kiosks',
      'Interactive business simulations and campus commerce challenges',
      'Cross-departmental participation engaging over 250 students across all engineering branches',
      'Documented official photo album on the VCE Swayam portal'
    ],
    participantStats: {
      total: '250+'
    },
    outcomes: 'Instilled the practical spirit of grassroots entrepreneurship, allowing students to test micro-venture business models and manage on-campus retail transactions.',
    sourceNote: 'The official photo album is verified and preserved from the VCE Swayam portal records. A formal written report was not archived on the portal table.',
    photosLink: 'https://photos.app.goo.gl/kbhYhqA4zc7aEyk49'
  }
]

// ==========================================================================
// 4. ALL COMBINED EVENTS
// Easy lookup for details pages, router, and backward compatibility.
// ==========================================================================
export const allEvents = [...upcomingEvents, ...ongoingEvents, ...pastEvents]

// Backward-compatible default export
export const events = allEvents

export default events
'''

target_path = r'Swayam-VCE/frontend/src/data/events.js'
with open(target_path, 'w', encoding='utf-8') as f:
    f.write(events_js_content)

print(f"Successfully wrote {len(events_js_content)} characters to {target_path}")
