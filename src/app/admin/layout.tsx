"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Users,
  QrCode,
  PlusCircle,
  Award,
  ShieldCheck,
  Settings,
  LogOut,
} from "lucide-react";
import { clsx } from "clsx";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const adminNav = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/events/new", label: "Create Event", icon: PlusCircle },
    { href: "/admin/scan", label: "QR Ticket Scanner", icon: QrCode },
    { href: "/events", label: "Live Events Directory", icon: Calendar },
    { href: "/verify", label: "Certificate Manager", icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      
      {/* Admin Sidebar Navigation */}
      <aside className="w-full lg:w-64 glass-panel border-r border-white/10 p-6 flex flex-col justify-between shrink-0 space-y-6">
        <div className="space-y-6">
          <Link href="/" className="block">
            <div className="relative w-36 h-10">
              <Image src="/logo-swayam.svg" alt="Swayam Logo" fill className="object-contain" />
            </div>
            <span className="text-[10px] font-mono uppercase glow-text-accent font-bold tracking-widest pl-1">
              Admin Operations
            </span>
          </Link>

          <nav className="space-y-1">
            {adminNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all",
                    isActive
                      ? "dynamic-glow-button text-white shadow-lg"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full glow-bg-accent glow-text-accent flex items-center justify-center font-bold">
              AD
            </div>
            <div>
              <p className="font-bold text-white">Admin Desk</p>
              <p className="text-[10px]">Super Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Admin View Container */}
      <main className="flex-1 p-6 sm:p-10 overflow-x-hidden">
        {children}
      </main>

    </div>
  );
}
