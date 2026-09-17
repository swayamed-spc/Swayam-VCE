"use client";

import React from "react";
import Image from "next/image";
import { Linkedin, Github, Twitter, Target, Rocket, Award, ShieldCheck, Heart } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { MOCK_TEAM } from "@/data/mock";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="brand">Empowering Innovators</Badge>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
          About Swayam E-Cell
        </h1>
        <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
          We are the primary student-run entrepreneurship initiative dedicated to building, incubating, and scaling student-led technology startups.
        </p>
      </div>

      {/* Mission & Vision Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="space-y-4 border border-white/15">
          <div className="w-12 h-12 rounded-2xl glow-bg-accent flex items-center justify-center glow-text-accent">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white">Our Mission</h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            To cultivate a vibrant entrepreneurial culture on campus by providing students with hands-on startup sprints, seed funding avenues, technical mentorship, and direct industry investor access.
          </p>
        </Card>

        <Card className="space-y-4 border border-white/15">
          <div className="w-12 h-12 rounded-2xl glow-bg-accent flex items-center justify-center glow-text-accent">
            <Rocket className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white">Our Vision</h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            To establish Vasavi College as a national innovation hub that consistently yields high-value technology ventures, patent grants, and socially responsible startup founders.
          </p>
        </Card>
      </div>

      {/* Milestones Timeline */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-white">Milestones & History</h2>
          <p className="text-sm text-gray-400">Tracking our journey of innovation</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { year: "2021", title: "Founded E-Cell", desc: "Started with 10 passionate student founders." },
            { year: "2023", title: "Incubation Grant", desc: "Received campus incubation center approval." },
            { year: "2024", title: "Genesis Hack 2.0", desc: "Hosted 500+ hackers nationwide." },
            { year: "2026", title: "Deep Space Platform", desc: "Launched full digital event pass engine." },
          ].map((item, i) => (
            <Card key={i} className="space-y-2 relative overflow-hidden">
              <span className="text-3xl font-black glow-text-accent opacity-80">{item.year}</span>
              <h4 className="text-lg font-bold text-white">{item.title}</h4>
              <p className="text-xs text-gray-300">{item.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Team Member Grid */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-white">Executive Student Council</h2>
          <p className="text-sm text-gray-400">Meet the leaders driving Swayam E-Cell</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_TEAM.map((member) => (
            <Card key={member.id} interactive className="text-center space-y-4">
              <div className="relative w-28 h-28 rounded-full overflow-hidden mx-auto border-2 border-[var(--glow-current)] shadow-lg shadow-[var(--glow-current)]/20">
                <Image src={member.avatar} alt={member.name} fill className="object-cover" />
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">{member.name}</h3>
                <p className="text-xs font-semibold glow-text-accent">{member.role}</p>
                <p className="text-[11px] text-gray-400 uppercase tracking-wider">{member.department}</p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white">
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {member.github && (
                  <a href={member.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white">
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {member.twitter && (
                  <a href={member.twitter} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white">
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

    </div>
  );
}
