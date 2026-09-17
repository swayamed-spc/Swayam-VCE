"use client";

import React, { useState } from "react";
import Link from "next/link";
import { QrCode, CheckCircle2, XCircle, AlertCircle, RefreshCw, ArrowLeft, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";

interface ScanLog {
  id: string;
  ticketCode: string;
  studentName: string;
  eventTitle: string;
  status: "Valid" | "Expired" | "Invalid";
  timestamp: string;
}

export default function QRScannerPage() {
  const { showToast } = useToast();
  const [manualCode, setManualCode] = useState("");
  const [lastScanResult, setLastScanResult] = useState<ScanLog | null>({
    id: "scan-01",
    ticketCode: "SWAYAM-PASS-8941-TOKEN",
    studentName: "Shiva Sai",
    eventTitle: "E-Summit '24: Cosmic Horizon",
    status: "Valid",
    timestamp: "Just now",
  });

  const [scanHistory, setScanHistory] = useState<ScanLog[]>([
    {
      id: "scan-01",
      ticketCode: "SWAYAM-PASS-8941-TOKEN",
      studentName: "Shiva Sai",
      eventTitle: "E-Summit '24: Cosmic Horizon",
      status: "Valid",
      timestamp: "Just now",
    },
    {
      id: "scan-02",
      ticketCode: "SWAYAM-PASS-1022-TOKEN",
      studentName: "Ananya Deshmukh",
      eventTitle: "Genesis Hackathon",
      status: "Valid",
      timestamp: "2 mins ago",
    },
  ]);

  const triggerScanTest = (status: "Valid" | "Expired" | "Invalid") => {
    const mockNames = ["Rohit Verma", "Kavya Sen", "Tushar Gupta", "Meera Nair"];
    const name = mockNames[Math.floor(Math.random() * mockNames.length)];
    const code = manualCode || `SWAYAM-PASS-${Math.floor(1000 + Math.random() * 9000)}-TOKEN`;

    const newLog: ScanLog = {
      id: `scan-${Date.now()}`,
      ticketCode: code,
      studentName: name,
      eventTitle: "E-Summit '24: Cosmic Horizon",
      status,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };

    setLastScanResult(newLog);
    setScanHistory((prev) => [newLog, ...prev.slice(0, 9)]);

    if (status === "Valid") {
      showToast("Access Granted!", `Pass verified for ${name}. Gate turnstile unlocked.`, "success");
    } else if (status === "Expired") {
      showToast("Already Used / Expired", `Ticket ${code} was previously scanned at 09:14 AM.`, "error");
    } else {
      showToast("Invalid Ticket Token", `Code ${code} not found in event registry.`, "error");
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/admin" className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-white">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Command Center</span>
        </Link>
        <Badge variant="brand">High-Speed Scanner Studio</Badge>
      </div>

      <div className="space-y-1">
        <h1 className="text-3xl font-black text-white">QR Gate Scanner Simulator</h1>
        <p className="text-xs sm:text-sm text-gray-300">
          Simulate real-time camera ticket verification for entry turnstiles.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Dark Viewfinder Camera Frame */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="p-6 border-2 border-[var(--glow-current)] bg-black relative overflow-hidden flex flex-col items-center justify-center min-h-[380px]" style={{ boxShadow: `0 0 30px -8px var(--glow-current)` }}>
            
            {/* Viewfinder Target Frame */}
            <div className="relative w-64 h-64 border-2 border-white/20 rounded-3xl flex items-center justify-center p-4">
              
              {/* Corner Brackets — driven by --glow-current */}
              <div className="absolute top-2 left-2 w-6 h-6 border-t-4 border-l-4 border-[var(--glow-current)] rounded-tl-lg" />
              <div className="absolute top-2 right-2 w-6 h-6 border-t-4 border-r-4 border-[var(--glow-current)] rounded-tr-lg" />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-4 border-l-4 border-[var(--glow-current)] rounded-bl-lg" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-4 border-r-4 border-[var(--glow-current)] rounded-br-lg" />

              {/* Laser Scanning Line Animation */}
              <div
                className="absolute inset-x-4 h-1 animate-pulse-glow"
                style={{
                  background: `linear-gradient(to right, transparent, var(--glow-current), transparent)`,
                  boxShadow: `0 0 15px var(--glow-current)`,
                }}
              />

              <QrCode className="w-32 h-32 text-gray-700 opacity-60" />
            </div>

            <p className="text-xs text-gray-400 mt-4 flex items-center gap-2">
              <Zap className="w-4 h-4 glow-text-accent" />
              <span>Camera Feed Active • Point QR Pass to Reticle</span>
            </p>

          </Card>

          {/* Simulation Mode Buttons */}
          <Card className="space-y-4 border border-white/15">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Simulate Scan Verification Modes
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <Button
                variant="primary"
                size="sm"
                onClick={() => triggerScanTest("Valid")}
              >
                Test Valid Pass
              </Button>

              <Button
                variant="danger"
                size="sm"
                onClick={() => triggerScanTest("Expired")}
              >
                Test Expired Pass
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => triggerScanTest("Invalid")}
              >
                Test Invalid Pass
              </Button>
            </div>

            <div className="pt-3 border-t border-white/10 space-y-2">
              <label className="block text-xs font-medium text-gray-300">Manual Entry Fallback</label>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter SWAYAM-PASS-XXXX"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                />
                <Button variant="secondary" size="md" onClick={() => triggerScanTest("Valid")}>
                  Submit Code
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Scan Result & Live Stream Feed */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Active Result Card */}
          {lastScanResult && (
            <Card
              className={`space-y-4 border-2 p-6 transition-all ${
                lastScanResult.status === "Valid"
                  ? "border-emerald-500/50 bg-emerald-950/20"
                  : lastScanResult.status === "Expired"
                  ? "border-amber-500/50 bg-amber-950/20"
                  : "border-rose-500/50 bg-rose-950/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <Badge
                  variant={
                    lastScanResult.status === "Valid"
                      ? "success"
                      : lastScanResult.status === "Expired"
                      ? "warning"
                      : "danger"
                  }
                  size="md"
                >
                  {lastScanResult.status === "Valid" && <CheckCircle2 className="w-4 h-4" />}
                  {lastScanResult.status === "Expired" && <AlertCircle className="w-4 h-4" />}
                  {lastScanResult.status === "Invalid" && <XCircle className="w-4 h-4" />}
                  <span>ACCESS {lastScanResult.status.toUpperCase()}</span>
                </Badge>
                <span className="text-xs text-gray-400">{lastScanResult.timestamp}</span>
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white">{lastScanResult.studentName}</h3>
                <p className="text-xs text-gray-300">{lastScanResult.eventTitle}</p>
                <p className="text-xs font-mono glow-text-accent pt-1">{lastScanResult.ticketCode}</p>
              </div>
            </Card>
          )}

          {/* Recent Scans Log Stream */}
          <Card className="space-y-3 border border-white/15">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">Recent Scan Activity</h3>
              <span className="text-[10px] text-gray-400 font-mono">Live Turnstile Stream</span>
            </div>

            <div className="space-y-2">
              {scanHistory.map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 text-xs"
                >
                  <div className="space-y-0.5">
                    <p className="font-bold text-white">{log.studentName}</p>
                    <p className="font-mono text-[10px] text-gray-400">{log.ticketCode}</p>
                  </div>

                  <div className="text-right space-y-0.5">
                    <Badge
                      variant={
                        log.status === "Valid"
                          ? "success"
                          : log.status === "Expired"
                          ? "warning"
                          : "danger"
                      }
                      size="sm"
                    >
                      {log.status}
                    </Badge>
                    <p className="text-[10px] text-gray-500">{log.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

        </div>

      </div>

    </div>
  );
}
