"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Download, Printer, QrCode, Calendar, MapPin, Clock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { MOCK_TICKETS } from "@/data/mock";
import { useToast } from "@/components/ui/Toast";

export default function TicketViewPage() {
  const params = useParams();
  const { showToast } = useToast();

  const registrationId = (params.id as string) || "REG-SWAYAM-8941";
  const ticket = MOCK_TICKETS.find((t) => t.registrationId === registrationId) || MOCK_TICKETS[0];

  const handleDownload = () => {
    showToast("Ticket Downloaded", `Saved ticket ${ticket.registrationId} to downloads.`, "success");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      
      {/* Back button */}
      <Link href="/student/dashboard" className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-white">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Student Portal</span>
      </Link>

      {/* Ticket Pass Container */}
      <Card className="p-0 overflow-hidden border-2 border-[var(--glow-current)] bg-gradient-to-b from-gray-900 to-black shadow-2xl relative" style={{ boxShadow: `0 0 40px -10px var(--glow-current)` }}>
        
        {/* Pass Header */}
        <div className="p-6 flex items-center justify-between text-white" style={{ background: `linear-gradient(135deg, var(--space-glow-start), var(--glow-current), var(--space-glow-end))` }}>
          <div className="flex items-center gap-3">
            <div className="relative w-28 h-8">
              <Image src="/logo-swayam.svg" alt="Swayam Logo" fill className="object-contain" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider bg-black/40 px-3 py-1 rounded-full backdrop-blur-md">
              Official Event Pass
            </span>
          </div>

          <Badge variant="neutral" className="bg-black/50 text-white border-white/20">
            {ticket.category}
          </Badge>
        </div>

        {/* Pass Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono glow-text-accent font-bold">{ticket.registrationId}</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">{ticket.eventTitle}</h2>
              <p className="text-xs text-gray-300">Delegate Pass Holder: Shiva Sai</p>
            </div>
            
            <div className="text-right">
              <span className="text-xs text-gray-400">Assigned Seat</span>
              <p className="text-base font-bold text-white">{ticket.seat}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs">
            <div className="space-y-1">
              <span className="text-gray-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 glow-text-accent" /> Date
              </span>
              <p className="font-semibold text-white">{ticket.eventDate}</p>
            </div>
            <div className="space-y-1">
              <span className="text-gray-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 glow-text-accent" /> Time
              </span>
              <p className="font-semibold text-white">{ticket.eventTime}</p>
            </div>
            <div className="space-y-1">
              <span className="text-gray-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 glow-text-accent" /> Gate & Venue
              </span>
              <p className="font-semibold text-white truncate">{ticket.venue}</p>
            </div>
          </div>

          {/* QR Barcode Graphic Mock */}
          <div className="p-6 rounded-2xl bg-black border border-white/15 flex flex-col items-center justify-center text-center space-y-3">
            <div className="p-3 bg-white rounded-xl shadow-lg">
              {/* Simulated High Tech QR Code Box */}
              <div className="w-40 h-40 relative flex items-center justify-center bg-white p-2">
                <QrCode className="w-36 h-36 text-black" />
              </div>
            </div>
            <p className="text-[11px] font-mono text-gray-400 tracking-wider">
              TOKEN: {ticket.qrCode}
            </p>
            <p className="text-xs text-gray-300">
              Present this QR pass at venue turnstiles for gate entry scanner verification.
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              <Printer className="w-4 h-4" />
              <span>Print Ticket</span>
            </Button>

            <Button variant="primary" size="sm" onClick={handleDownload}>
              <Download className="w-4 h-4" />
              <span>Download Digital PDF</span>
            </Button>
          </div>

        </div>

      </Card>
    </div>
  );
}
