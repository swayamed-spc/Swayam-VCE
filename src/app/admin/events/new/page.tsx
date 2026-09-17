"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, PlusCircle, Upload, Calendar, DollarSign, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";

export default function CreateEventPage() {
  const { showToast } = useToast();
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [category, setCategory] = useState("Hackathon");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [capacity, setCapacity] = useState("100");
  const [price, setPrice] = useState("FREE");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !venue) {
      showToast("Missing Required Fields", "Please specify event title, date, and venue.", "error");
      return;
    }

    showToast("Event Created!", `"${title}" has been created & published to the live directory.`, "success");
    setTimeout(() => {
      window.location.href = "/events";
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/admin" className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-white">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Admin Command Hub</span>
        </Link>
        <Badge variant="brand">Admin Studio</Badge>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-black text-white">Create New Event / Hackathon</h1>
        <p className="text-xs sm:text-sm text-gray-300">
          Configure title, ticketing limits, banner media, and schedule rules for public listing.
        </p>
      </div>

      {/* Form Card */}
      <Card className="space-y-6 border border-white/15 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Section 1: Event Identity */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold glow-text-accent uppercase tracking-wider">
              1. Event Overview
            </h3>

            <Input
              label="Event Title *"
              placeholder="e.g. AI Founders Sprint 2026"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Input
              label="Tagline / Short Summary"
              placeholder="e.g. 24-Hour LLM Prototype Building Contest"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-300 uppercase">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-white backdrop-blur-md focus:outline-none focus:border-[var(--glow-current)]"
                >
                  <option value="Hackathon" className="bg-black">Hackathon</option>
                  <option value="Summit" className="bg-black">Summit</option>
                  <option value="Pitching" className="bg-black">Pitching Contest</option>
                  <option value="Workshop" className="bg-black">Workshop</option>
                  <option value="Speaker" className="bg-black">Speaker Keynote</option>
                </select>
              </div>

              <Input
                label="Ticket Fee (or FREE) *"
                placeholder="FREE or ₹199"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          {/* Section 2: Logistics & Slots */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h3 className="text-sm font-bold glow-text-accent uppercase tracking-wider">
              2. Schedule & Capacity
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Date & Time *"
                placeholder="October 24, 2026 - 09:00 AM"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <Input
                label="Venue / Gate *"
                placeholder="Main Auditorium"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
              />

              <Input
                label="Total Capacity Slots"
                type="number"
                placeholder="100"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />
            </div>
          </div>

          {/* Section 3: Detailed Description */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h3 className="text-sm font-bold glow-text-accent uppercase tracking-wider">
              3. Description & Agenda
            </h3>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-300 uppercase">
                Detailed Event Description
              </label>
              <textarea
                rows={4}
                placeholder="Describe rules, eligible participants, prizes, and agenda highlights..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white backdrop-blur-md focus:outline-none focus:border-[var(--glow-current)]"
              />
            </div>

            {/* Poster Upload Dropzone */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-300 uppercase">
                Event Banner Poster Upload
              </label>
              <div
                onClick={() => showToast("Upload Banner", "Mock poster uploaded successfully.", "info")}
                className="p-8 rounded-2xl border-2 border-dashed border-white/20 hover:border-[var(--glow-current)] bg-white/5 text-center cursor-pointer space-y-2 transition-all"
              >
                <Upload className="w-8 h-8 glow-text-accent mx-auto" />
                <p className="text-sm font-semibold text-white">Click or drag banner image here</p>
                <p className="text-xs text-gray-400">PNG, JPG, WEBP up to 10MB (16:9 ratio recommended)</p>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/10">
            <Link href="/admin">
              <Button variant="ghost" size="md">
                Cancel
              </Button>
            </Link>

            <Button variant="primary" size="lg" type="submit">
              <PlusCircle className="w-4 h-4" />
              <span>Publish Event to Live Site</span>
            </Button>
          </div>

        </form>
      </Card>

    </div>
  );
}
