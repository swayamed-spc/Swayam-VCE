// ALL SITE CONTENT LIVES HERE. Edit this file to change events, team, stats etc.

// Team Leadership & Department Heads
import presidentPhoto from '../assets/team/president-sai-sri-shivani.webp'
import vicePresidentPhoto from '../assets/team/vice-president-chinmaya-teja.webp'
import incubationSathvikPhoto from '../assets/team/incubation-sathvik.webp'
import incubationPraneethPhoto from '../assets/team/incubation-praneeth.webp'
import gsdVishnuPhoto from '../assets/team/growth-strategic-development-vishnu.webp'
import gsdBhavyaPhoto from '../assets/team/growth-strategic-development-bhavya.webp'
import techSamitPhoto from '../assets/team/technology-samit.webp'
import techNishchalaPhoto from '../assets/team/technology-nishchala.webp'
import hrSiddharthPhoto from '../assets/team/human-resources-siddharth.webp'
import hrDivijPhoto from '../assets/team/human-resources-divij.webp'
import podcastKoushikPhoto from '../assets/team/podcast-koushik.webp'
import podcastSrikarPhoto from '../assets/team/podcast-srikar.webp'
import prSreekarPhoto from '../assets/team/public-relations-sreekar.webp'
import prAamirPhoto from '../assets/team/public-relations-aamir.webp'
import foVishalPhoto from '../assets/team/finance-operations-vishal.webp'
import foShivGaneshPhoto from '../assets/team/finance-operations-shiv-ganesh.webp'
import sroManaswiPhoto from '../assets/team/student-relations-outreach-manaswi.webp'
import sroRatnamalaPhoto from '../assets/team/student-relations-outreach-ratnamala.webp'

// Event media assets for verified department work highlights
import orientationImg from '../assets/events/orientation-2025.webp'
import esummit2026Img from '../assets/events/esummit-2026.webp'
import tieIdeaCoachImg from '../assets/events/tie-idea-coach.webp'
import future4ConclaveImg from '../assets/events/future-4-conclave.webp'
import civengHackathonImg from '../assets/events/civeng-hackathon.webp'
import trailblazerTalkImg from '../assets/events/trailblazer-talk.webp'

import {
  events as officialEvents,
  upcomingEvents as rawUpcoming,
  ongoingEvents as rawOngoing,
  pastEvents as rawPast,
  allEvents as rawAll,
} from './events'

export const club = {
  name: 'Swayam',
  tagline: 'The Entrepreneurship Cell of Vasavi College of Engineering',
  fullName: 'Swayam – The Entrepreneurship Cell',
  college: 'Vasavi College of Engineering (Autonomous)',
  address: 'Vasavi College of Engineering, 9-5-81, Ibrahimbagh, Hyderabad - 500 031, Telangana, India',
  phone: '+91 40 23146003',
  email: 'swayam.ed.vce@gmail.com',
  vision: 'To develop entrepreneurs by creating an ecosystem that encourages and supports the entrepreneurial potential of students.',
  mission: 'To inculcate the spirit of entrepreneurship among students and to provide them with all necessary support and mentoring including equipping them with the right skills and attitude to convert an idea into a business venture.',
  about: 'Swayam – The Entrepreneurship Cell of Vasavi College of Engineering is a manifestation of the efforts, ideas, dreams and aspirations of not one but all who are associated with it. It is established to develop and nourish the latent entrepreneurial spirit which is inherent in every student and help them gain a broader and more importantly, entrepreneurial perspective of looking at life in every situation thus empowering them to become Entrepreneurs.',
  socials: [
    { n: 'Instagram', u: 'https://www.instagram.com/ecellvce/' },
    { n: 'Official Portal', u: 'https://vce.ac.in/campus-life/swayam.php' },
    { n: 'LinkedIn', u: '#' },
    { n: 'X', u: '#' }
  ],
}

// Institutional & Faculty Backbone (Source: Official VCE Swayam Portal https://vce.ac.in/campus-life/swayam.php)
export const institutionalBackbone = {
  founder: {
    name: 'Dr. T. Ramamohan Rao',
    role: 'Founder of Swayam E-Cell',
    designation: 'Professor & Founder Faculty Supervisor',
    affiliation: 'Vasavi College of Engineering (Autonomous)'
  },
  coordinator: {
    name: 'Dr. P. Subashini',
    role: 'Faculty Co-ordinator',
    designation: 'Faculty Co-ordinator, Swayam Start-up Club / E-Cell & Associate Professor',
    affiliation: 'Vasavi College of Engineering (Autonomous)'
  },
  ecosystem: {
    institution: 'Vasavi College of Engineering (Autonomous)',
    sponsoringBody: 'Vasavi Academy of Education',
    affiliation: 'Affiliated to Osmania University, Hyderabad',
    approval: 'Approved by AICTE, New Delhi',
    council: 'Institution’s Innovation Council (IIC, Ministry of Education Initiative)',
    framework: 'Autonomous Non-minority Engineering Institution with campus incubation ecosystem'
  }
}

export const stats = [
  { n: 28, s: '', l: 'Documented Events in Archive' },
  { n: 8, s: '', l: 'Specialized Operational Wings' },
  { n: 9, s: '', l: 'Official PDF Reports (2024–25)' },
  { n: 8, s: '+', l: 'Years of Institutional Legacy' },
]

export const pillars = [
  { t: 'E-Summits & Conclaves', d: 'Flagship multi-day entrepreneurship conferences bringing founders, investors, and innovators together.' },
  { t: 'Hands-on Workshops', d: 'Design thinking, branding, rapid prototyping, and market-entry masterclasses.' },
  { t: 'Venture Visits', d: 'Industrial exposure visits to premier innovation ecosystems like T-Works and T-Hub.' },
  { t: 'Founder Talks', d: 'Fireside sessions with industry leaders, franchise builders, and venture catalysts.' },
  { t: 'MoU Alliances', d: 'Strategic partnerships with global networks like TiE Global and T-Tribe.' },
  { t: 'Idea Hackathons', d: 'Competitive hackathons, Shark Tank pitching rounds, and ideation challenges.' },
]

export const quotes = [
  { q: 'To develop entrepreneurs by creating an ecosystem that encourages and supports the entrepreneurial potential of students.', a: 'Swayam Vision' },
  { q: 'To inculcate the spirit of entrepreneurship among students and to provide them with all necessary support and mentoring including equipping them with the right skills and attitude to convert an idea into a business venture.', a: 'Swayam Mission' },
]

// "Our Vision in Action" on the home page: how the vision is carried out, stage by stage.
// events: slugs of the archive events (src/data/events.js) that document each stage; they are linked on the site.
// Synthesized from official VCE event records and official research archives.
export const lifecycleStages = [
  {
    step: '01',
    stage: 'Grassroots Outreach & Ideation',
    subtitle: 'Fostering Creative Problem Solvers',
    description: 'Extending entrepreneurship beyond campus boundaries through school innovation clinics, community problem identification, and youth ideation workshops.',
    experience: 'Students engage with real community challenges, mentor high school pupils in structured ideation exercises, and develop habit-forming problem discovery skills.',
    evidence: 'School Innovation Outreach Program at Government High School Filmnagar (IIC collaboration).',
    events: ['outreach-program-2026']
  },
  {
    step: '02',
    stage: 'Onboarding & Talent Scouting',
    subtitle: 'Building the Interdisciplinary Cohort',
    description: 'Annual campus recruitment and cohort induction across engineering branches, orienting freshers into specialized venture, tech, and operations wings.',
    experience: 'Incoming students explore departmental tracks, learn how Swayam operates as a venture catalyst, and join project squads matching their interests.',
    evidence: 'Swayam Induction Session & Orientation 2025–26 across Events, Incubation, and Human Resources wings.',
    events: ['orientation-2025']
  },
  {
    step: '03',
    stage: 'Founder Mindset & Inspiration',
    subtitle: 'Unfiltered Narratives from the Trenches',
    description: 'Direct interactive dialogues with startup founders and operators dissecting early venture friction, resilience, and mastering founder-market fit.',
    experience: 'Students participate in intimate AMA sessions, learning firsthand how founders navigate the "art of the start" and survive early market friction.',
    evidence: 'The Founder’s Narrative with Alfred Lazarus (Zero Moblt) & Trailblazer Talk series.',
    events: ['the-founders-narrative-2026', 'trailblazer-talk']
  },
  {
    step: '04',
    stage: 'Validation & Lean Prototyping',
    subtitle: 'From Hypothesis to Testable MVP',
    description: 'Methodological workshops grounding student builders in hypothesis formulation, value proposition mapping, and low-burn technical prototyping.',
    experience: 'Technical founders structure user discovery experiments, delineate minimum testable feature sets, and build functional MVPs without premature capital expenditure.',
    evidence: 'DEEP-TECH MVP & Lean Start-up with Sourav Karmakar (Infinostech) & Design Thinking Workshops.',
    events: ['deep-tech-mvp-2026', 'design-thinking-workshop-2019']
  },
  {
    step: '05',
    stage: 'Strategic Finance & Unit Economics',
    subtitle: 'Venture Math for Engineering Minds',
    description: 'Practical financial modeling seminars demystifying burn rates, runway allocation, unit margins, and investor capitalization tables.',
    experience: 'Engineering students learn to budget early projects, price innovations sustainably, and understand the rigorous financial metrics investors evaluate during diligence.',
    evidence: 'Innovate & Invest: Strategic Finance for Tech Minds with Bhargav Reddy (MintCircle).',
    events: ['innovate-and-invest-2026']
  },
  {
    step: '06',
    stage: 'Pitch Competitions & Hackathons',
    subtitle: 'Pressure-Testing Before Jurors',
    description: 'High-stakes collegiate pitch showdowns and interdisciplinary hackathons where venture propositions face rigorous juror scrutiny.',
    experience: 'Student teams prepare concise pitch decks, deliver timed value-proposition pitches, and defend their financial and technical choices under intense cross-examination.',
    evidence: 'Pitch Masters, CIVENG Hackathon, and Idea Under Fire at E-Summit.',
    events: ['pitch-masters-2025', 'civeng-hackathon-2024', 'e-summit-2026']
  },
  {
    step: '07',
    stage: 'Crisis Simulation & Executive Strategy',
    subtitle: 'High-Pressure Decision Defense',
    description: 'Advanced corporate crisis simulations where student delegations assume C-suite executive roles to navigate unexpected business storms.',
    experience: 'Participants confront real-time market dilemmas, balance conflicting stakeholder priorities, and defend strategic decisions in public boardroom debates.',
    evidence: 'The Founders Council 2.0 with jurists Alfred Lazarus and Rudhvik Dharamkar.',
    events: ['the-founders-council-2026']
  },
  {
    step: '08',
    stage: 'Flagship Conclaves & Ecosystem Visits',
    subtitle: 'Statewide Immersion & Celebration',
    description: 'Auditorium-scale innovation summits, regional networking festivals, and industrial visits to state prototyping facilities.',
    experience: 'Student ventures showcase prototypes to hundreds of regional attendees, establish connections with venture capitalists, and visit state prototyping hubs.',
    evidence: 'E-Summit (2025, 2026), E-Plexus Conclave, and Venture Visits to T-Works & T-Hub.',
    events: ['e-summit-2026', 'esummit-2025', 'e-plexus-2025', 'venture-visit-tworks']
  }
]

// External Industry Voices & Mentors who have contributed to Swayam initiatives
export const industryVoices = [
  {
    name: 'Bhargav Reddy',
    role: 'Founding Partner',
    org: 'MintCircle',
    event: 'Innovate & Invest: Strategic Finance for Tech Minds (June 2026)',
    focus: 'Startup financial runway, unit economics, seed budgeting, and founder cap-table hygiene for technical builders.'
  },
  {
    name: 'Alfred (Apantrue) Lazarus',
    role: 'Co-founder & CVO',
    org: 'Zero Moblt',
    event: 'The Founder’s Narrative (June 2026) & The Founders Council 2.0 (Sept 2026)',
    focus: 'Founder-market fit, navigating early-stage enterprise building, and evaluating high-stakes corporate crisis decisions.'
  },
  {
    name: 'Rudhvik Dharamkar',
    role: 'Founder & CEO / Managing Partner',
    org: 'Fleckor Tech / Telangana Chronicle',
    event: 'The Founders Council 2.0 (Sept 2026)',
    focus: 'Executive decision-making under uncertainty, media communications, and high-pressure strategic defense.'
  },
  {
    name: 'Sourav Karmakar',
    role: 'Founder & CEO / TEDx Speaker',
    org: 'Infinostech',
    event: 'DEEP-TECH MVP & LEAN START-UP (Aug 2026)',
    focus: 'Hypothesis testing, deep-tech MVP roadmaps, and lean startup methodologies for student technical founders.'
  },
  {
    name: 'Rahul Tirumalapragada',
    role: 'Founder',
    org: 'Chai Kanth',
    event: 'Trailblazer Talk (Sept 2024)',
    focus: 'Grassroots consumer franchise building, brand positioning, operational resilience, and bootstrapping.'
  },
  {
    name: 'Dr. Suresh Kumar',
    role: 'Idea Coach & Venture Mentor',
    org: 'TiE Hyderabad',
    event: 'TiE Idea Coach Mentorship Training (Sept 2019)',
    focus: 'Customer discovery, value proposition formulation, and structured collegiate venture mentoring.'
  }
]

// Current Student Executive Board
export const leadership = [
  {
    name: 'Sai Sri Shivani',
    role: 'President',
    dept: 'Computer Science and Engineering',
    img: presidentPhoto,
    focus: 'Strategic direction, institutional liaisons, executive governance, and ecosystem alliances.'
  },
  {
    name: 'Chinmaya Teja',
    role: 'Vice President',
    dept: 'Electronics and Communication Engineering',
    img: vicePresidentPhoto,
    focus: 'Operational execution, inter-departmental alignment, student cohort coordination, and conclave staging.'
  }
]

// All 8 Functional Departments of Swayam
export const departments = [
  {
    id: 'incubation',
    name: 'Incubation Wing',
    shortName: 'Incubation',
    mandate: 'Nurturing student venture ideas from early discovery through prototype validation, business modeling, and pre-incubation.',
    heads: [
      { name: 'Sathvik', role: 'Head of Incubation', img: incubationSathvikPhoto },
      { name: 'Praneeth', role: 'Head of Incubation', img: incubationPraneethPhoto }
    ],
    responsibilities: [
      'Pre-incubation pipeline management and student venture cohort screening',
      'One-on-one founder mentoring sessions and business model canvas reviews',
      'Connecting student innovators with external incubators, angel networks, and grant opportunities',
      'Organizing structured customer discovery and prototype evaluation clinics'
    ],
    work: [
      {
        title: 'Swayam Cohort Incubation Onboarding',
        year: '2025–2026',
        role: 'Introducing the incubation wing, pre-incubation roadmap, and student founder support to new cohort inductees.',
        outcome: 'New members acquainted with venture ideation, prototype resources, and incubation services.',
        source: 'Official Orientation 2025–26 Graphic (badged INCUBATION)',
        link: '/events/orientation-2025',
        image: orientationImg
      },
      {
        title: 'TiE Idea Coach Mentorship Cohort',
        year: '2019–2020',
        role: 'Coordinating 11 student venture teams through customer discovery and value proposition design.',
        outcome: '11 student venture concepts pitched to certified TiE Idea Coaches.',
        source: 'Official VCE TiE Report 2019',
        link: '/events/training-tie-idea-coach',
        image: tieIdeaCoachImg
      }
    ]
  },
  {
    id: 'gsd',
    name: 'Growth & Strategic Development Wing',
    shortName: 'Growth & Strategy',
    mandate: 'Expanding Swayam’s strategic reach through institutional alliances, corporate partnerships, and state innovation ecosystem linkages.',
    heads: [
      { name: 'Vishnu', role: 'Head of GSD', img: gsdVishnuPhoto },
      { name: 'Bhavya', role: 'Head of GSD', img: gsdBhavyaPhoto }
    ],
    responsibilities: [
      'Establishing strategic MoUs with regional prototyping hubs and venture bodies (T-Hub, T-Works, TiE)',
      'Corporate sponsorship management and partner value delivery',
      'Long-term ecosystem expansion, inter-collegiate delegate relations, and summit co-hosting',
      'Coordinating industrial visits and immersion excursions for student builders'
    ],
    work: [
      {
        title: 'FUTURE 4.0 YUVA Hyderabad Conclave',
        year: '2024–2025',
        role: 'Co-hosting regional youth entrepreneurship conclave with Yuva, T-Works, and state startup delegates.',
        outcome: 'Mobilized 500+ attendees across panel sessions, Shark Tank, and prototyping displays.',
        source: 'Official VCE FUTURE 4.0 Report',
        link: '/events/future-4-conclave',
        image: future4ConclaveImg
      },
      {
        title: 'T-Hub & T-Tribe Institutional Alliance',
        year: '2019–2020',
        role: 'Establishing formal institutional partnership with T-Hub’s student entrepreneurship wing.',
        outcome: 'Student access to T-Tribe launchpad, workshops, and startup networking sessions.',
        source: 'Official VCE MoU Records 2019',
        link: '/events/thub-mou-ttribe'
      }
    ]
  },
  {
    id: 'technology',
    name: 'Technology Wing',
    shortName: 'Technology',
    mandate: 'Building and maintaining the digital infrastructure powering Swayam’s registrations, evaluation dashboards, hackathon portals, and web platforms.',
    heads: [
      { name: 'Samit', role: 'Head of Technology', img: techSamitPhoto },
      { name: 'Nishchala', role: 'Head of Technology', img: techNishchalaPhoto }
    ],
    responsibilities: [
      'Engineering and deploying digital web portals for Swayam events and archives',
      'Technical infrastructure for hackathons (submission portals, rubric evaluation dashboards, live scoreboards)',
      'Database management for member records, event ticketing, and participant certification',
      'Mentoring technical student teams on web/app prototype architecture'
    ],
    work: [
      {
        title: 'CIVENG Hackathon Digital Infrastructure & Judging',
        year: '2024–2025',
        role: 'Developed evaluation tracking dashboards and submission workflows for 24-hour civil-tech hackathon.',
        outcome: 'Smooth operational flow for 14 multidisciplinary teams across two evaluation rounds.',
        source: 'Official VCE CIVENG Report',
        link: '/events/civeng-hackathon-2024',
        image: civengHackathonImg
      },
      {
        title: 'Swayam Web Portal & Digital Event Archives',
        year: '2025–2026',
        role: 'Architecture and engineering of the dark-brutalist web application, event archive, and wing registries.',
        outcome: 'Fully responsive, sub-second single-page application with source-traceable records.',
        source: 'Swayam Tech Wing Architecture'
      }
    ]
  },
  {
    id: 'hr',
    name: 'Human Resources Wing',
    shortName: 'Human Resources',
    mandate: 'Managing talent scouting, fresher onboarding, interdisciplinary team allocations, member engagement, and internal organizational culture.',
    heads: [
      { name: 'Siddharth', role: 'Head of HR', img: hrSiddharthPhoto },
      { name: 'Divij', role: 'Head of HR', img: hrDivijPhoto }
    ],
    responsibilities: [
      'Conducting annual campus intake, panel interviews, and fresher recruitment drives',
      'Allocating new recruits to functional project wings based on aptitude and skill assessments',
      'Tracking internal member performance, leadership progression, and cohort motivation',
      'Facilitating startup internship drives connecting student builders with emerging ventures'
    ],
    work: [
      {
        title: 'Swayam Cohort Induction & Department Allocation',
        year: '2025–2026',
        role: 'Fresher screening, recruitment registration, induction assembly walk-through, and departmental allocations.',
        outcome: 'Onboarded interdisciplinary cohort into 8 functional operational wings.',
        source: 'Official Orientation 2025–26 Graphic (badged HUMAN RESOURCES)',
        link: '/events/orientation-2025',
        image: orientationImg
      },
      {
        title: 'Swayam Internship Drive',
        year: '2018–2019',
        role: 'Coordinated screening, resume shortlisting, and interview panels for student-startup matching.',
        outcome: '26 student offers extended across 10 startup companies.',
        source: 'Official VCE Internship Drive Report 2019',
        link: '/events/internship-drive-2019'
      }
    ]
  },
  {
    id: 'podcast',
    name: 'Podcast Wing',
    shortName: 'Podcast',
    mandate: 'Recording in-depth founder dialogues, producing multimedia student storytelling, and archiving lessons from regional entrepreneurs.',
    heads: [
      { name: 'Koushik', role: 'Head of Podcast', img: podcastKoushikPhoto },
      { name: 'Srikar', role: 'Head of Podcast', img: podcastSrikarPhoto }
    ],
    responsibilities: [
      'Curating and scripting long-form interview episodes with startup founders and operators',
      'Studio audio recording, post-production editing, sound design, and master engineering',
      'Synthesizing actionable founder lessons into short-form multimedia snippets for campus builders',
      'Collaborating with guest speakers for post-event fireside recordings'
    ],
    work: [
      {
        title: 'Trailblazer Talk Founder Retrospective',
        year: '2024–2025',
        role: 'Moderated interactive Q&A recording with founder Rahul Tirumalapragada.',
        outcome: 'Documented leadership lessons and student interactions in audio-visual archive.',
        source: 'Official VCE Trailblazer Report',
        link: '/events/trailblazer-talk',
        image: trailblazerTalkImg
      }
    ]
  },
  {
    id: 'pr',
    name: 'Public Relations Wing',
    shortName: 'Public Relations',
    mandate: 'Leading external brand positioning, media releases, campus outreach campaigns, social broadcasts, and institutional communications.',
    heads: [
      { name: 'Sreekar', role: 'Head of PR', img: prSreekarPhoto },
      { name: 'Aamir', role: 'Head of PR', img: prAamirPhoto }
    ],
    responsibilities: [
      'Managing official cell social media broadcasts, announcements, and live-event coverage',
      'Drafting press releases and official documentation for college administration and external media',
      'Visual storytelling, campaign graphic design, and brand guideline maintenance across all touchpoints',
      'Driving campus awareness campaigns and multi-department student mobilization'
    ],
    work: [
      {
        title: 'Brand Blend: Visual Identity Masterclass',
        year: '2024–2025',
        role: 'Designed workshop curricula and practical toolkits on brand positioning and visual communication.',
        outcome: '60+ participants completed hands-on identity design challenges for startup concepts.',
        source: 'Official VCE Brand Blend Report',
        link: '/events/brand-blend-workshop'
      }
    ]
  },
  {
    id: 'fo',
    name: 'Finance & Operations Wing',
    shortName: 'Finance & Ops',
    mandate: 'Overseeing fiscal budgeting, prize pool escrow, vendor logistics, institutional compliance, and event operations.',
    heads: [
      { name: 'Vishal', role: 'Head of F&O', img: foVishalPhoto },
      { name: 'Shiv Ganesh', role: 'Head of F&O', img: foShivGaneshPhoto }
    ],
    responsibilities: [
      'Formulating detailed operational budgets and financial expenditure projections for summits and conclaves',
      'Managing competition prize pool escrows, disbursement compliance, and sponsorship reconciliation',
      'Overseeing venue logistics, equipment rental, audio-visual technical setups, and vendor coordination',
      'Ensuring strict financial auditing and compliance with Vasavi College of Engineering administration'
    ],
    work: [
      {
        title: 'E-Summit 2026 Prize Pool & Logistics Operations',
        year: '2025–2026',
        role: 'Managed ₹66,000 prize distribution across 3 major tracks and supervised multi-venue equipment.',
        outcome: 'Flawless financial compliance across all tracks and multi-day venue equipment.',
        source: 'Official VCE E-Summit 2026 Report',
        link: '/events/e-summit-2026',
        image: esummit2026Img
      }
    ]
  },
  {
    id: 'sro',
    name: 'Student Relations & Outreach Wing',
    shortName: 'Student Relations',
    mandate: 'Fostering peer engagement across all engineering departments, mobilizing student participants, and coordinating inter-branch initiatives.',
    heads: [
      { name: 'Manaswi', role: 'Head of SRO', img: sroManaswiPhoto },
      { name: 'Ratnamala', role: 'Head of SRO', img: sroRatnamalaPhoto }
    ],
    responsibilities: [
      'Building active touchpoints with student bodies across all academic departments of VCE',
      'Mobilizing campus-wide delegations for inter-branch ideation heats and conclaves',
      'Facilitating student feedback loops to continually adapt cell initiatives to cohort needs',
      'Coordinating campus ambassador networks across engineering years and sections'
    ],
    work: [
      {
        title: 'Inter-Branch Ideation & Campus Mobilization',
        year: '2024–2025',
        role: 'Cross-departmental outreach mobilizing student innovators from CSE, ECE, EEE, Mechanical, Civil, and IT.',
        outcome: 'Broad, multidisciplinary participation in flagship collegiate challenges.',
        source: 'Swayam Student Relations Framework'
      }
    ]
  }
]

// Home page sections that stay hidden until they have real content.
// sponsors: [{ name: 'Company', url: 'https://...' }]   faq: [{ q: 'Question?', a: 'Answer.' }]
export const sponsors = []
export const faq = []

// Backward-compatible team roster
export const team = [
  ...leadership.map(l => ({ name: l.name, role: l.role, dept: l.dept, img: l.img })),
  ...departments.flatMap(d => d.heads.map(h => ({ name: h.name, role: h.role, dept: d.shortName, img: h.img })))
]

// Utilities
export const inr = (n) => (n === 0 ? 'Free' : `₹${n}`)
export const fmt = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
export const statusOf = (e) =>
  e.filled >= e.capacity
    ? 'Sold out'
    : new Date(e.date) < new Date()
    ? 'Closed'
    : e.filled / e.capacity > 0.8
    ? 'Closing soon'
    : 'Open'

// Re-exports from official events data store
export const upcomingEvents = rawUpcoming
export const ongoingEvents = rawOngoing
export const pastEvents = rawPast
export const events = officialEvents
export const allEvents = rawAll
