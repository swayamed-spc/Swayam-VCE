"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Calendar,
  MapPin,
  Clock,
  Share2,
  Users,
  CheckCircle,
  Trophy,
  BookOpen,
  UserCheck,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { MOCK_EVENTS } from "@/data/mock";
import { useToast } from "@/components/ui/Toast";

export default function EventDetailPage() {
  const params = useParams();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<"about" | "rules" | "agenda" | "mentors" | "leaderboard">("about");
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const eventId = (params.id as string) || "e-summit-2024";
  const event = MOCK_EVENTS.find((e) => e.id === eventId) || MOCK_EVENTS[0];

  const handleRegisterConfirm = () => {
    setIsRegistered(true);
    setIsRegisterModalOpen(false);
    showToast(
      "Registration Confirmed!",
      `You are now registered for ${event.title}. Digital ticket generated in your Student Portal!`,
      "success"
    );
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast("Link Copied!", "Event link copied to clipboard.", "info");
    }
  };

  const fillPercentage = Math.round((event.slotsFilled / event.slotsTotal) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400">
        <Link href="/" className="hover:text-white">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/events" className="hover:text-white">Events</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-white font-medium truncate">{event.title}</span>
      </nav>

      {/* Main Grid: Left Details & Right Sticky Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Poster & Detailed Overview */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Main Hero Poster Box */}
          <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden glass-panel border border-white/15">
            <Image
              src={event.poster}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge variant="brand">{event.category}</Badge>
              <Badge variant={event.isFree ? "success" : "info"}>{event.price}</Badge>
            </div>

            <div className="absolute bottom-6 left-6 right-6 space-y-2">
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                {event.title}
              </h1>
              <p className="text-sm sm:text-base text-gray-300">
                {event.tagline}
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-3">
            {[
              { id: "about", label: "About Event", icon: BookOpen },
              { id: "rules", label: "Rules & Guidelines", icon: CheckCircle },
              { id: "agenda", label: "Event Agenda", icon: Clock },
              { id: "mentors", label: "Mentors & Judges", icon: UserCheck },
              { id: "leaderboard", label: "Leaderboard & Winners", icon: Trophy },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                    activeTab === tab.id
                      ? "dynamic-glow-button"
                      : "bg-white/5 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Box */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 border border-white/10">
            {activeTab === "about" && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Event Description</h3>
                <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                  {event.description}
                </p>
                <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <p className="text-xs text-gray-400">Target Audience</p>
                    <p className="text-sm font-semibold text-white">All University Students & Founders</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <p className="text-xs text-gray-400">Certificate</p>
                    <p className="text-sm font-semibold text-white">Official Swayam Verified Certificate</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "rules" && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Rules & Guidelines</h3>
                <ul className="space-y-3">
                  {event.rules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 glow-text-accent shrink-0 mt-1" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "agenda" && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Schedule Timeline</h3>
                <div className="space-y-3">
                  {event.agenda.map((slot, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-xs font-bold glow-text-accent glow-bg-accent px-3 py-1 rounded-md">
                        {slot.time}
                      </span>
                      <span className="text-sm font-medium text-white">{slot.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "mentors" && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Mentors & Jury Panel</h3>
                {event.mentors.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {event.mentors.map((m, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/20">
                          <Image src={m.avatar} alt={m.name} fill className="object-cover" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">{m.name}</h4>
                          <p className="text-xs glow-text-accent">{m.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400">Jury details will be announced prior to the event.</p>
                )}
              </div>
            )}

            {activeTab === "leaderboard" && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-400" />
                  <span>Leaderboard & Award Winners</span>
                </h3>
                {event.leaderboard && event.leaderboard.length > 0 ? (
                  <div className="space-y-3">
                    {event.leaderboard.map((row) => (
                      <div
                        key={row.rank}
                        className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                              row.rank === 1
                                ? "bg-amber-400 text-black shadow-lg shadow-amber-400/40"
                                : row.rank === 2
                                ? "bg-gray-300 text-black"
                                : "glow-badge"
                            }`}
                          >
                            #{row.rank}
                          </span>
                          <div>
                            <p className="text-sm font-bold text-white">{row.teamName}</p>
                            <p className="text-xs text-gray-400">{row.project}</p>
                          </div>
                        </div>
                        <Badge variant="brand">{row.prize}</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-xs text-gray-400 bg-white/5 rounded-xl">
                    Leaderboard will update after event evaluation concludes.
                  </div>
                )}
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Sticky Registration Widget */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="sticky top-28 space-y-6 border border-white/15">
            
            {/* Price & Action Header */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold">Registration Fee</p>
                <p className="text-3xl font-black text-white">{event.price}</p>
              </div>
              <button
                onClick={handleShare}
                className="p-2.5 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white"
                title="Share Event"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* Countdown Mock */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <p className="text-xs text-gray-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 glow-text-accent" />
                <span>Starts In (Mock Counter):</span>
              </p>
              <div className="grid grid-cols-4 gap-2 text-center">
                {[
                  { label: "DAYS", val: "14" },
                  { label: "HRS", val: "08" },
                  { label: "MINS", val: "42" },
                  { label: "SECS", val: "19" },
                ].map((item, i) => (
                  <div key={i} className="bg-black/50 p-2 rounded-lg border border-white/10">
                    <span className="block text-base font-bold text-white">{item.val}</span>
                    <span className="block text-[9px] text-gray-400">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Capacity Slot Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-300">Slots Availability</span>
                <span className="text-white font-bold">
                  {event.slotsFilled} / {event.slotsTotal} filled
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-[var(--glow-current)] rounded-full transition-all duration-500 shadow-[0_0_10px_var(--glow-current)]"
                  style={{ width: `${fillPercentage}%` }}
                />
              </div>
            </div>

            {/* Key Event Details */}
            <div className="space-y-3 text-xs text-gray-300 pt-2 border-t border-white/10">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 glow-text-accent shrink-0" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 glow-text-accent shrink-0" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 glow-text-accent shrink-0" />
                <span>{event.venue}</span>
              </div>
            </div>

            {/* Main Action Button */}
            {isRegistered ? (
              <div className="space-y-2">
                <Badge variant="success" className="w-full justify-center py-2 text-sm">
                  ✓ You are Registered!
                </Badge>
                <Link href="/student/dashboard">
                  <Button variant="secondary" size="md" fullWidth>
                    View Ticket in Dashboard
                  </Button>
                </Link>
              </div>
            ) : (
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => setIsRegisterModalOpen(true)}
              >
                Register For Event
              </Button>
            )}

          </Card>
        </div>

      </div>

      {/* Registration Confirmation Modal */}
      <Modal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        title="Confirm Event Registration"
      >
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <h4 className="text-base font-bold text-white">{event.title}</h4>
            <p className="text-xs text-gray-300">{event.date} • {event.venue}</p>
            <p className="text-sm font-bold glow-text-accent">Total Fee: {event.price}</p>
          </div>

          <p className="text-xs text-gray-400 leading-relaxed">
            This static front-end prototype will issue a instant mock digital ticket to your Student Portal.
          </p>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsRegisterModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleRegisterConfirm}
            >
              Confirm Registration
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
