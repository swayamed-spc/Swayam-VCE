"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  Clock,
  Award,
  Users,
  TrendingUp,
  Zap,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { MOCK_EVENTS } from "@/data/mock";
import { useToast } from "@/components/ui/Toast";

export default function HomePage() {
  const { showToast } = useToast();
  const carouselRef = useRef<HTMLDivElement>(null);

  const featuredEvent = MOCK_EVENTS[0];
  const moreEvents = MOCK_EVENTS.slice(1);

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleQuickRegister = (eventTitle: string) => {
    showToast(
      "Registration Initiated!",
      `Redirecting to slot reservation for ${eventTitle}...`,
      "success"
    );
  };

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-8 pb-16 px-4 text-center overflow-hidden">
        
        {/* Core Radial Orb Behind Swayam Logo (Red -> Orange -> Blue Outer Glow) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] md:w-[650px] h-[340px] sm:h-[500px] md:h-[650px] rounded-full pointer-events-none z-0">
          <div 
            className="w-full h-full rounded-full animate-pulse-glow"
            style={{
              background: `radial-gradient(circle, rgba(255, 59, 48, 0.45) 0%, rgba(255, 122, 61, 0.3) 35%, rgba(168, 85, 247, 0.15) 60%, rgba(43, 107, 255, 0.05) 85%, transparent 100%)`,
              filter: "blur(50px)",
            }}
          />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center space-y-8">
          
          {/* Centered Glowing Swayam Logo Mark (Replacing Human Silhouette) */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-72 sm:w-96 md:w-[480px] h-32 sm:h-40 md:h-48 my-2 drop-shadow-[0_0_35px_rgba(255,122,61,0.6)]"
          >
            <Image
              src="/logo-swayam.svg"
              alt="Swayam E-Cell Emblem"
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Badge variant="brand" size="md" className="py-1.5 px-4">
              <Sparkles className="w-3.5 h-3.5 glow-text-accent" />
              <span>Vasavi College Entrepreneurship Ecosystem</span>
            </Badge>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.1]"
          >
            Where Campus Ideas Turn Into{" "}
            <span className="dynamic-glow-text">High-Impact Startups</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-base sm:text-xl text-gray-300 max-w-2xl leading-relaxed"
          >
            Swayam E-Cell ignites venture building through national hackathons, angel pitch competitions, expert mentorship, and seed grants.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            <Link href="/events">
              <Button variant="primary" size="lg" className="group">
                <span>Explore Events</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/events/e-summit-2024">
              <Button variant="outline" size="lg">
                Register for E-Summit '24
              </Button>
            </Link>
          </motion.div>

        </div>
      </section>

      {/* 2. RECENT / FEATURED EVENT SHOWCASE PANEL (Reference Image 1 Layout) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 glow-text-accent" />
            <span className="text-xs font-bold uppercase tracking-wider glow-text-accent">
              Showcase Platform
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Recently Posted & Flagship Events
          </h2>
        </div>

        {/* Embedded App Device Frame */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Showcase Panel: Featured Main Event */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden group">
                <Image
                  src={featuredEvent.poster}
                  alt={featuredEvent.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                
                <div className="absolute top-4 left-4">
                  <Badge variant="brand">{featuredEvent.category}</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="success">Registration Open</Badge>
                </div>

                <div className="absolute bottom-6 left-6 right-6 space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {featuredEvent.title}
                  </h3>
                  <p className="text-sm text-gray-300 line-clamp-2">
                    {featuredEvent.tagline}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/10">
                <div className="flex items-center gap-6 text-xs text-gray-300">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 glow-text-accent" />
                    <span>{featuredEvent.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 glow-text-accent" />
                    <span>{featuredEvent.venue}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-white">{featuredEvent.price}</span>
                  <Link href={`/events/${featuredEvent.id}`}>
                    <Button variant="primary" size="md">
                      Register Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right/Bottom Panel: Horizontal Scroll-Snap "More Events" Carousel */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                  More Events Carousel
                </h4>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => scrollCarousel("left")}
                    className="p-2 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => scrollCarousel("right")}
                    className="p-2 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Scrollable Container */}
              <div
                ref={carouselRef}
                className="flex items-center gap-4 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-2"
              >
                {moreEvents.map((evt) => (
                  <div
                    key={evt.id}
                    className="w-64 shrink-0 snap-start glass-panel-interactive rounded-2xl p-4 border border-white/10 space-y-3"
                  >
                    <div className="relative h-32 w-full rounded-xl overflow-hidden">
                      <Image
                        src={evt.poster}
                        alt={evt.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant={evt.isFree ? "success" : "info"} size="sm">
                          {evt.price}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h5 className="text-sm font-bold text-white truncate">
                        {evt.title}
                      </h5>
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 glow-text-accent" />
                        <span>{evt.date}</span>
                      </p>
                    </div>

                    <Link href={`/events/${evt.id}`}>
                      <Button variant="secondary" size="sm" fullWidth className="mt-2 text-xs">
                        View Details
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-white/10 text-xs text-gray-400 flex items-center justify-between">
                <span>Swipe or use arrows to navigate</span>
                <Link href="/events" className="glow-text-accent hover:underline">
                  View All Events →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. UPCOMING EVENTS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Upcoming Events & Sprints
            </h2>
            <p className="text-sm text-gray-400">
              Filterable lineup of active hackathons, workshops, and founder talks.
            </p>
          </div>
          <Link href="/events">
            <Button variant="outline" size="sm">
              Explore All Events ({MOCK_EVENTS.length})
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_EVENTS.map((event) => (
            <Card key={event.id} interactive className="flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="relative h-48 w-full rounded-xl overflow-hidden">
                  <Image
                    src={event.poster}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="brand" size="sm">{event.category}</Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant={event.isFree ? "success" : "info"} size="sm">
                      {event.price}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white line-clamp-1">
                    {event.title}
                  </h3>
                  <p className="text-xs text-gray-300 line-clamp-2">
                    {event.tagline}
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="space-y-1.5 text-xs text-gray-300">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 glow-text-accent" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 glow-text-accent" />
                    <span className="truncate">{event.venue}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-gray-400">
                    {event.slotsFilled} / {event.slotsTotal} registered
                  </span>
                  <Link href={`/events/${event.id}`}>
                    <Button variant="primary" size="sm">
                      Register
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 4. STATS ROW (WITH SCROLL COUNT-UP EFFECT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 border border-white/15 bg-gradient-to-r from-red-950/20 via-purple-950/20 to-blue-950/20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { label: "Flagship Events", value: "25+", icon: Calendar },
              { label: "Active Student Members", value: "5,000+", icon: Users },
              { label: "Incubation Grants Raised", value: "₹15 Lakhs+", icon: TrendingUp },
              { label: "Startups Mentored", value: "50+", icon: Award },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="space-y-2">
                  <div className="inline-flex p-3 rounded-2xl bg-white/5 border border-white/10 glow-text-accent mb-1">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-white dynamic-glow-text">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium text-gray-300 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIAL QUOTES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-white">Founder Testimonials</h2>
          <p className="text-sm text-gray-400">Hear from alumni who launched ventures through Swayam E-Cell</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: "Swayam provided our first seed grant and investor introductions. Within 6 months of Genesis Hack, we raised our pre-seed round.",
              name: "Siddharth Mehta",
              role: "Co-Founder, NebuLab AI",
              avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
            },
            {
              quote: "The pitch practice sessions at E-Summit completely reshaped our business deck. The mentor feedback was world-class.",
              name: "Pooja Hegde",
              role: "Founder, GreenGrid Power",
              avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80"
            },
            {
              quote: "From student developer to startup CTO — Swayam E-Cell was the single most impactful community during my college engineering days.",
              name: "Karan Johar",
              role: "CTO, FinPulse",
              avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
            }
          ].map((t, i) => (
            <Card key={i} className="flex flex-col justify-between space-y-4">
              <p className="text-sm text-gray-300 italic leading-relaxed">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20">
                  <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{t.name}</h4>
                  <p className="text-xs glow-text-accent">{t.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 6. READY TO JOIN CTA BAND */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-10 sm:p-14 overflow-hidden border border-white/20 text-center space-y-6 bg-gradient-to-r from-red-900/40 via-purple-900/40 to-blue-900/40 shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Ready to Launch Your Startup?
            </h2>
            <p className="text-base text-gray-300 leading-relaxed">
              Join 5,000+ student innovators. Reserve your tickets for upcoming events, join hacking teams, or pitch your startup idea.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link href="/signup">
                <Button variant="primary" size="lg">
                  Create Student Account
                </Button>
              </Link>
              <Link href="/events">
                <Button variant="secondary" size="lg">
                  Browse All Events
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
