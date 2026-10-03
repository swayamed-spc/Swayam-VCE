# 🎓 E-Cell Event Platform

A modern, full-stack web platform for managing college club events — from discovery and registration to digital ticketing, QR-based attendance, and analytics.

Built by the E-Cell Tech Team.

---

## 📖 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Database](#-database)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 About

The E-Cell Event Platform digitizes the entire lifecycle of club events:

- **Students** discover events, register, pay online, receive digital tickets with QR codes, and check in at venues.
- **Admins** create and manage events, monitor registrations, scan tickets, and view real-time analytics.

It replaces Google Forms, manual spreadsheets, cash collection, and paper-based attendance with a single secure, mobile-friendly platform.

---

## ✨ Features

### Public
- 🏠 Modern home page with hero, upcoming events, featured events, and club highlights
- ℹ️ About page with club story, mission, vision, and team
- 📅 Events list with filters (category, price, date, search)
- 🎯 Event detail page with registration card, rules, venue, and contact
- 🖼️ Past events gallery with photos, reports, and winners
- ✅ Public certificate verification
- 📞 Contact page with form and map

### Platform
- 📱 Fully responsive (mobile-first)
- ⚡ Server-side rendering for speed and SEO
- 🎬 Smooth animations (respects reduced-motion)
- ♿ WCAG AA accessibility
- 🔐 Secure authentication and payments
- 🛡️ Audit logs for admin actions

---

## 🛠 Tech Stack

### Frontend
| Tech | Purpose |
|------|---------|
| Next.js 14 (App Router) | React framework with SSR/ISR |
| TypeScript | Type safety |
| Tailwind CSS | Utility-first styling |
| shadcn/ui | Accessible UI components |
| Framer Motion | Animations |
| TanStack Query | Server state management |
| React Hook Form + Zod | Forms and validation |
| Axios | HTTP client |

### Backend
| Tech | Purpose |
|------|---------|
| Node.js 20 LTS | Runtime |
| NestJS 10 | Backend framework |
| TypeScript | Type safety |
| Prisma 5 | ORM |
| PostgreSQL 16 | Primary database |
| Redis 7 | Cache and queues |
| BullMQ | Background jobs |
| JWT + Passport | Authentication |
| bcrypt | Password hashing |
| Puppeteer | PDF generation |
| qrcode | QR image generation |
| Swagger | API documentation |
| Pino | Logging |

### External Services
| Service | Purpose |
|---------|---------|
| Razorpay | Payments |
| Amazon SES | Transactional email |
| Twilio / Meta Cloud API | WhatsApp notifications |
| AWS S3 | File storage |
| Sentry | Error tracking |
| UptimeRobot | Uptime monitoring |

### DevOps
| Tool | Purpose |
|------|---------|
| Turborepo | Monorepo build system |
| pnpm | Package manager |
| Docker | Local development |
| GitHub Actions | CI/CD |
| Vercel | Frontend hosting |
| Railway / Render | Backend hosting |
| Supabase / Neon | PostgreSQL hosting |
| Upstash | Redis hosting |

---

## 📁 Project Structure
