"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, Github, Linkedin, Twitter, Instagram, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/90 backdrop-blur-2xl text-gray-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative w-44 h-12">
              <Image
                src="/logo-swayam.svg"
                alt="Swayam E-Cell Logo"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Fostering innovation, accelerating student startups, and building the premier campus entrepreneurship ecosystem.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: Twitter, href: "https://twitter.com" },
                { icon: Linkedin, href: "https://linkedin.com" },
                { icon: Instagram, href: "https://instagram.com" },
                { icon: Github, href: "https://github.com" },
              ].map((social, i) => {
                const Icon = social.icon;
                return (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-white transition-colors">All Events</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">About Swayam</Link>
              </li>
              <li>
                <Link href="/verify" className="hover:text-white transition-colors">Certificate Verifier</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Portals</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/student/dashboard" className="hover:text-white transition-colors">Student Dashboard</Link>
              </li>
              <li>
                <Link href="/student/certificates" className="hover:text-white transition-colors">My Certificates</Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors">Admin Hub</Link>
              </li>
              <li>
                <Link href="/admin/scan" className="hover:text-white transition-colors">QR Scanner Studio</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Contact E-Cell</h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 glow-text-accent shrink-0 mt-0.5" />
                <span>Innovation & Incubation Block, Vasavi College Campus</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 glow-text-accent shrink-0" />
                <span>ecell@swayam-vce.edu</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 glow-text-accent shrink-0" />
                <span>+91 98765 43210</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} Swayam E-Cell. All rights reserved.</p>
          <p className="flex items-center gap-1 text-gray-400">
            <span>Designed with Deep Space UI</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
            <span>Static Prototype</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
