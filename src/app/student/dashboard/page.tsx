"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Ticket, Calendar, MapPin, QrCode, Award, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { MOCK_TICKETS, StudentTicket } from "@/data/mock";
import { useToast } from "@/components/ui/Toast";

export default function StudentDashboardPage() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<"all" | "upcoming" | "past">("all");
  const [selectedTicket, setSelectedTicket] = useState<StudentTicket | null>(null);

  const filteredTickets = MOCK_TICKETS.filter((t) => {
    if (activeTab === "all") return true;
    if (activeTab === "upcoming") return t.attendanceStatus !== "Verified";
    if (activeTab === "past") return t.attendanceStatus === "Verified";
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Dashboard Top Info Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <Badge variant="brand">Student Portal</Badge>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Welcome back, Shiva Sai 👋
          </h1>
          <p className="text-xs sm:text-sm text-gray-300">
            Manage your registered event passes, digital tickets, and earned certificates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/student/certificates">
            <Button variant="secondary" size="md">
              <Award className="w-4 h-4 glow-text-accent" />
              <span>My Certificates (2)</span>
            </Button>
          </Link>
          <Link href="/events">
            <Button variant="primary" size="md">
              Browse Events
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          {[
            { id: "all", label: "All Passes" },
            { id: "upcoming", label: "Upcoming Events" },
            { id: "past", label: "Completed / Attended" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? "dynamic-glow-button"
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <span className="text-xs text-gray-400">
          Showing {filteredTickets.length} registration passes
        </span>
      </div>

      {/* Ticket Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTickets.map((ticket) => (
          <Card key={ticket.registrationId} className="space-y-4 border border-white/15">
            <div className="flex gap-4">
              <div className="relative w-28 h-28 rounded-xl overflow-hidden shrink-0 border border-white/10">
                <Image
                  src={ticket.poster}
                  alt={ticket.eventTitle}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <Badge variant={ticket.paymentStatus === "Paid" ? "brand" : "success"} size="sm">
                    {ticket.paymentStatus}
                  </Badge>
                  <span className="text-[10px] font-mono text-gray-400">{ticket.registrationId}</span>
                </div>

                <h3 className="text-lg font-bold text-white line-clamp-1">{ticket.eventTitle}</h3>
                
                <div className="space-y-1 text-xs text-gray-300 pt-1">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 glow-text-accent" />
                    <span>{ticket.eventDate} • {ticket.eventTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 glow-text-accent" />
                    <span className="truncate">{ticket.venue}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Status: {ticket.attendanceStatus}</span>
              </div>

              <div className="flex items-center gap-2">
                <Link href={`/student/ticket/${ticket.registrationId}`}>
                  <Button variant="primary" size="sm">
                    <QrCode className="w-3.5 h-3.5" />
                    <span>View Ticket</span>
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>

    </div>
  );
}
