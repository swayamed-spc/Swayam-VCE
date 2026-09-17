export interface EventItem {
  id: string;
  title: string;
  tagline: string;
  category: "Hackathon" | "Summit" | "Pitching" | "Workshop" | "Speaker";
  date: string;
  time: string;
  venue: string;
  price: string;
  isFree: boolean;
  slotsTotal: number;
  slotsFilled: number;
  status: "registration_open" | "upcoming" | "past" | "cancelled";
  poster: string;
  featured?: boolean;
  description: string;
  rules: string[];
  agenda: { time: string; title: string }[];
  mentors: { name: string; role: string; avatar: string }[];
  leaderboard?: { rank: number; teamName: string; project: string; prize: string }[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar: string;
  linkedin: string;
  github?: string;
  twitter?: string;
}

export interface StudentTicket {
  registrationId: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  poster: string;
  paymentStatus: "Paid" | "Free" | "Pending";
  attendanceStatus: "Verified" | "Not Verified" | "Absent";
  qrCode: string;
  category: string;
  seat: string;
}

export interface CertificateRecord {
  id: string;
  certificateId: string;
  recipientName: string;
  eventName: string;
  role: string;
  issueDate: string;
  hash: string;
  verified: boolean;
  scoreOrRank?: string;
}

export const MOCK_EVENTS: EventItem[] = [
  {
    id: "e-summit-2024",
    title: "E-Summit '24: Cosmic Horizon",
    tagline: "The premier flagship entrepreneurship conclave of Central Region",
    category: "Summit",
    date: "October 24 - 25, 2026",
    time: "09:00 AM - 06:00 PM IST",
    venue: "Main Auditorium & Innovation Hall",
    price: "₹199",
    isFree: false,
    slotsTotal: 500,
    slotsFilled: 412,
    status: "registration_open",
    poster: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200&auto=format&fit=crop",
    featured: true,
    description:
      "E-Summit '24 brings together visionary startup founders, angel investors, tech pioneers, and student innovators for two action-packed days of keynotes, funding pitches, product showcases, and networking.",
    rules: [
      "Open to all undergraduate and postgraduate college students with valid student ID.",
      "Laptops and pitch decks must be pre-submitted 24 hours prior to pitching rounds.",
      "Delegates must wear physical badges inside event halls at all times."
    ],
    agenda: [
      { time: "09:30 AM", title: "Inaugural Address & Keynote by Tech Unicorn Founder" },
      { time: "11:30 AM", title: "Panels: Building DeepTech in India" },
      { time: "02:00 PM", title: "Venture Pitch Arena (Top 10 Finalists)" },
      { time: "04:30 PM", title: "Awards Ceremony & Networking Dinner" }
    ],
    mentors: [
      { name: "Dr. Vikram Seth", role: "Partner, Apex Capital", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80" },
      { name: "Neha Sharma", role: "Founder, Zenith AI", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80" }
    ],
    leaderboard: [
      { rank: 1, teamName: "Nebula Bio", project: "AI Diagnostics for Rural Labs", prize: "₹1,50,000" },
      { rank: 2, teamName: "HyperDrive", project: "Solid State Battery Management", prize: "₹75,000" },
      { rank: 3, teamName: "AgriPulse", project: "IoT Soil Health Drone Fleet", prize: "₹35,000" }
    ]
  },
  {
    id: "genesis-hack-2024",
    title: "Genesis Hackathon 3.0",
    tagline: "36-Hour National Prototype Building Sprint",
    category: "Hackathon",
    date: "November 12 - 14, 2026",
    time: "08:00 AM (Continuous 36Hrs)",
    venue: "Advanced Computing Complex",
    price: "FREE",
    isFree: true,
    slotsTotal: 250,
    slotsFilled: 218,
    status: "registration_open",
    poster: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
    featured: true,
    description:
      "Transform ideas into functioning software and hardware prototypes in 36 continuous hours. Compete across tracks in FinTech, EdTech, Climate Tech, and Generative AI.",
    rules: [
      "Teams can comprise 2 to 4 members.",
      "All code must be written during the hackathon hours. Open-source libraries permitted.",
      "Plagiarism or pre-built code bases result in immediate disqualification."
    ],
    agenda: [
      { time: "08:00 AM", title: "Check-in & Problem Statement Reveal" },
      { time: "12:00 PM", title: "Hacking Starts & Mentor Clinic 1" },
      { time: "12:00 AM (Day 2)", title: "Midnight Pitch Checkpoint" },
      { time: "04:00 PM (Day 2)", title: "Final Demos & Judging" }
    ],
    mentors: [
      { name: "Rahul Verma", role: "Staff Engineer, Google", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80" },
      { name: "Priya Nair", role: "CTO, FinEdge", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80" }
    ],
    leaderboard: [
      { rank: 1, teamName: "Syntax Error Squad", project: "Decentralized Micro-Grants", prize: "₹1,00,000" },
      { rank: 2, teamName: "Quantum Leap", project: "Edge AI Crop Disease Scanner", prize: "₹50,000" }
    ]
  },
  {
    id: "venture-pitch-showdown",
    title: "Venture Pitch Showdown",
    tagline: "Live Elevator Pitches in front of Angel Investors",
    category: "Pitching",
    date: "December 05, 2026",
    time: "02:00 PM - 06:00 PM IST",
    venue: "Incubation Center Boardroom",
    price: "FREE",
    isFree: true,
    slotsTotal: 30,
    slotsFilled: 24,
    status: "registration_open",
    poster: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200&auto=format&fit=crop",
    featured: false,
    description:
      "Present your business model in 5 minutes to active angel investors and seed funds. Top 3 startups secure direct incubation grants and 1-on-1 investor mentorship.",
    rules: [
      "Must have an early working prototype or validated MVP.",
      "Pitch presentation strictly limited to 5 minutes + 3 minutes Q&A."
    ],
    agenda: [
      { time: "02:00 PM", title: "Investor Briefing" },
      { time: "02:30 PM", title: "Pitch Round 1 (15 Startups)" },
      { time: "04:30 PM", title: "Pitch Round 2 (Top 5 Pitch-off)" }
    ],
    mentors: [
      { name: "Anand Rathi", role: "Angel Investor, Titan Ventures", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80" }
    ]
  },
  {
    id: "ai-founders-lab",
    title: "AI & Web3 Founders Workshop",
    tagline: "Hands-on Masterclass on LLM Agents & Smart Contracts",
    category: "Workshop",
    date: "December 18, 2026",
    time: "10:00 AM - 04:00 PM IST",
    venue: "Lab 402, CS Department",
    price: "₹99",
    isFree: false,
    slotsTotal: 80,
    slotsFilled: 80,
    status: "upcoming",
    poster: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
    featured: false,
    description:
      "A intensive hands-on session on building production-ready AI agents and integrating decentralized smart contracts into modern Web applications.",
    rules: [
      "Bring personal laptop with Node.js v18+ pre-installed.",
      "Basic understanding of TypeScript or Python recommended."
    ],
    agenda: [
      { time: "10:00 AM", title: "Building Autonomous Agents with LangChain" },
      { time: "01:30 PM", title: "Deploying Zero-Knowledge Contracts" }
    ],
    mentors: [
      { name: "Suresh Pillai", role: "Lead Architect, Web3 Labs", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80" }
    ]
  },
  {
    id: "keynote-unfiltered-series",
    title: "Founders Keynote: Zero to 100M",
    tagline: "Fireside chat with SaaS unicorn co-founder",
    category: "Speaker",
    date: "January 15, 2027",
    time: "05:00 PM - 07:00 PM IST",
    venue: "Auditorium Hall B",
    price: "FREE",
    isFree: true,
    slotsTotal: 300,
    slotsFilled: 145,
    status: "upcoming",
    poster: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1200&auto=format&fit=crop",
    featured: false,
    description:
      "Uncensored stories, brutal mistakes, early pivot lessons, and fundraising strategies directly from founders who built multi-million dollar global software enterprises.",
    rules: ["Entry on a first-come, first-seated basis. Doors close at 05:10 PM."],
    agenda: [
      { time: "05:00 PM", title: "Fireside Conversation" },
      { time: "06:15 PM", title: "Audience Q&A & Selfie Session" }
    ],
    mentors: [
      { name: "Aarav Gupta", role: "Co-Founder, CloudPulse", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80" }
    ]
  },
  {
    id: "cleantech-challenge-2024",
    title: "CleanTech Innovation Challenge",
    tagline: "Solving Urban Sustainability and Renewable Energy",
    category: "Hackathon",
    date: "September 02, 2026",
    time: "09:00 AM - 05:00 PM IST",
    venue: "Environmental Research Lab",
    price: "FREE",
    isFree: true,
    slotsTotal: 100,
    slotsFilled: 100,
    status: "past",
    poster: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1200&auto=format&fit=crop",
    featured: false,
    description:
      "Design eco-friendly solutions for waste management, solar grid distribution, and carbon emission monitoring.",
    rules: ["Project submissions closed."],
    agenda: [{ time: "09:00 AM", title: "Opening ceremony" }],
    mentors: [],
    leaderboard: [
      { rank: 1, teamName: "EcoLoop", project: "Plastic Upcycling Micro-Unit", prize: "₹50,000" }
    ]
  }
];

export const MOCK_TEAM: TeamMember[] = [
  {
    id: "tm-1",
    name: "Aaditya Roy",
    role: "President",
    department: "Executive Board",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    twitter: "https://twitter.com"
  },
  {
    id: "tm-2",
    name: "Ananya Deshmukh",
    role: "Vice President",
    department: "Executive Board",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  },
  {
    id: "tm-3",
    name: "Rohan Kulkarni",
    role: "Technical Lead",
    department: "Technology & Product",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    id: "tm-4",
    name: "Sanya Malhotra",
    role: "Events & Operations Head",
    department: "Event Management",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80",
    linkedin: "https://linkedin.com"
  },
  {
    id: "tm-5",
    name: "Vikramaditya Singh",
    role: "Startup Incubation Lead",
    department: "Venture Relations",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    linkedin: "https://linkedin.com"
  },
  {
    id: "tm-6",
    name: "Meera Patel",
    role: "Design & Brand Lead",
    department: "Media & Branding",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  }
];

export const MOCK_TICKETS: StudentTicket[] = [
  {
    registrationId: "REG-SWAYAM-8941",
    eventId: "e-summit-2024",
    eventTitle: "E-Summit '24: Cosmic Horizon",
    eventDate: "October 24, 2026",
    eventTime: "09:00 AM IST",
    venue: "Main Auditorium",
    poster: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=600&auto=format&fit=crop",
    paymentStatus: "Paid",
    attendanceStatus: "Verified",
    qrCode: "SWAYAM-PASS-8941-TOKEN",
    category: "Delegate Pass",
    seat: "Row B, Seat 14"
  },
  {
    registrationId: "REG-SWAYAM-3302",
    eventId: "genesis-hack-2024",
    eventTitle: "Genesis Hackathon 3.0",
    eventDate: "November 12, 2026",
    eventTime: "08:00 AM IST",
    venue: "Advanced Computing Lab",
    poster: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600&auto=format&fit=crop",
    paymentStatus: "Free",
    attendanceStatus: "Not Verified",
    qrCode: "SWAYAM-PASS-3302-TOKEN",
    category: "Hacker Pass",
    seat: "Bench 08"
  }
];

export const MOCK_CERTIFICATES: CertificateRecord[] = [
  {
    id: "cert-101",
    certificateId: "SWAYAM-2024-HACK-089",
    recipientName: "Shiva Sai",
    eventName: "Genesis Hackathon 2.0",
    role: "1st Place Winner",
    issueDate: "September 15, 2026",
    hash: "0x8f9a2b7c4d3e1f0a9b8c7d6e5f4a3b2c1d0e9f8a",
    verified: true,
    scoreOrRank: "Rank 1 / 64 Teams"
  },
  {
    id: "cert-102",
    certificateId: "SWAYAM-2024-SUMMIT-412",
    recipientName: "Shiva Sai",
    eventName: "E-Summit Pitch Fest",
    role: "Finalist Presenter",
    issueDate: "August 20, 2026",
    hash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
    verified: true,
    scoreOrRank: "Top 10 Finalist"
  }
];

export const MOCK_ADMIN_ANALYTICS = {
  totalRegistrations: 1480,
  revenueCollected: 184500,
  activeEvents: 4,
  certificatesIssued: 320,
  registrationTrend: [
    { month: "May", registrations: 120 },
    { month: "Jun", registrations: 240 },
    { month: "Jul", registrations: 380 },
    { month: "Aug", registrations: 610 },
    { month: "Sep", registrations: 980 },
    { month: "Oct", registrations: 1480 }
  ],
  revenueByCategory: [
    { category: "Summit Passes", revenue: 98000 },
    { category: "Workshops", revenue: 54000 },
    { category: "Pitch Entry", revenue: 32500 }
  ],
  recentRegistrations: [
    { id: "REG-8941", name: "Anish Sharma", event: "E-Summit '24", date: "2 mins ago", status: "Confirmed", amount: "₹199" },
    { id: "REG-8940", name: "Kavya Reddy", event: "Genesis Hackathon", date: "15 mins ago", status: "Confirmed", amount: "FREE" },
    { id: "REG-8939", name: "Tushar Gupta", event: "AI Workshop", date: "42 mins ago", status: "Pending", amount: "₹99" },
    { id: "REG-8938", name: "Riya Sen", event: "Venture Pitch", date: "1 hour ago", status: "Confirmed", amount: "FREE" }
  ]
};
