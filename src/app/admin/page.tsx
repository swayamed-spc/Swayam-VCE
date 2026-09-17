"use client";

import React from "react";
import Link from "next/link";
import {
  Users,
  DollarSign,
  Calendar,
  Award,
  PlusCircle,
  QrCode,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { MOCK_ADMIN_ANALYTICS } from "@/data/mock";

export default function AdminDashboardPage() {
  const { totalRegistrations, revenueCollected, activeEvents, certificatesIssued } =
    MOCK_ADMIN_ANALYTICS;

  return (
    <div className="space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="brand">Operational Analytics</Badge>
          <h1 className="text-3xl font-black text-white mt-1">Admin Command Center</h1>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/events/new">
            <Button variant="primary" size="sm">
              <PlusCircle className="w-4 h-4" />
              <span>Create Event</span>
            </Button>
          </Link>

          <Link href="/admin/scan">
            <Button variant="secondary" size="sm">
              <QrCode className="w-4 h-4 glow-text-accent" />
              <span>Launch Ticket Scanner</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Registrations", val: totalRegistrations.toLocaleString(), sub: "+24% this month", icon: Users, color: "glow-text-accent" },
          { label: "Revenue Collected", val: `₹${revenueCollected.toLocaleString()}`, sub: "+18% vs last summit", icon: DollarSign, color: "text-emerald-400" },
          { label: "Active Live Events", val: activeEvents, sub: "2 sprints starting soon", icon: Calendar, color: "text-purple-400" },
          { label: "Certificates Issued", val: certificatesIssued, sub: "100% verified", icon: Award, color: "text-sky-400" },
        ].map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <Card key={i} className="space-y-3 border border-white/15">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 font-semibold uppercase">{kpi.label}</span>
                <Icon className={`w-5 h-5 ${kpi.color}`} />
              </div>
              <p className="text-3xl font-black text-white">{kpi.val}</p>
              <p className="text-[11px] text-gray-400">{kpi.sub}</p>
            </Card>
          );
        })}
      </div>

      {/* Recharts Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Registration Trend Area Chart */}
        <Card className="lg:col-span-7 space-y-4 border border-white/15">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Registration Velocity Trend</h3>
              <p className="text-xs text-gray-400">Monthly student signups across all E-Cell events</p>
            </div>
            <Badge variant="brand">2026 Growth</Badge>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_ADMIN_ANALYTICS.registrationTrend}>
                <defs>
                  <linearGradient id="regGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff7a3d" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#ff7a3d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0d0d14",
                    borderColor: "rgba(255,255,255,0.15)",
                    borderRadius: "12px",
                    color: "#ffffff",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="registrations"
                  stroke="#ff7a3d"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#regGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Revenue Breakdown Bar Chart */}
        <Card className="lg:col-span-5 space-y-4 border border-white/15">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Revenue By Category</h3>
              <p className="text-xs text-gray-400">Pass sales breakdown</p>
            </div>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_ADMIN_ANALYTICS.revenueByCategory}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="category" stroke="#9ca3af" fontSize={11} />
                <YAxis stroke="#9ca3af" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0d0d14",
                    borderColor: "rgba(255,255,255,0.15)",
                    borderRadius: "12px",
                    color: "#ffffff",
                  }}
                />
                <Bar dataKey="revenue" fill="#a855f7" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

      </div>

      {/* Recent Student Registrations Table */}
      <Card className="space-y-4 border border-white/15">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white">Recent Student Registrations</h3>
          <span className="text-xs text-gray-400">Real-time Stream</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-white/5 uppercase text-gray-400 border-b border-white/10">
              <tr>
                <th className="p-3">Registration ID</th>
                <th className="p-3">Student Name</th>
                <th className="p-3">Event Title</th>
                <th className="p-3">Timestamp</th>
                <th className="p-3">Fee Status</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {MOCK_ADMIN_ANALYTICS.recentRegistrations.map((row) => (
                <tr key={row.id} className="hover:bg-white/5">
                  <td className="p-3 font-mono glow-text-accent font-bold">{row.id}</td>
                  <td className="p-3 font-semibold text-white">{row.name}</td>
                  <td className="p-3">{row.event}</td>
                  <td className="p-3 text-gray-400">{row.date}</td>
                  <td className="p-3 font-bold text-white">{row.amount}</td>
                  <td className="p-3">
                    <Badge variant={row.status === "Confirmed" ? "success" : "warning"} size="sm">
                      {row.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

    </div>
  );
}
