"use client";

import React, { useState } from "react";
import { ShieldCheck, Search, CheckCircle2, XCircle, Award, Calendar, QrCode } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { MOCK_CERTIFICATES, CertificateRecord } from "@/data/mock";

export default function VerifyPage() {
  const [inputHash, setInputHash] = useState("");
  const [searchResult, setSearchResult] = useState<CertificateRecord | null | "not_found">(null);

  const handleVerify = (queryHash?: string) => {
    const codeToTest = (queryHash || inputHash).trim().toUpperCase();
    if (!codeToTest) return;

    const match = MOCK_CERTIFICATES.find(
      (c) => c.certificateId.toUpperCase() === codeToTest || c.hash.toUpperCase() === codeToTest
    );

    if (match) {
      setSearchResult(match);
    } else {
      setSearchResult("not_found");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Page Header */}
      <div className="text-center space-y-3">
        <Badge variant="brand">Cryptographic Ledger</Badge>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Verify Certificate Authenticity
        </h1>
        <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto">
          Enter a Swayam E-Cell Credential ID or cryptographic hash to verify credential validity in real-time.
        </p>
      </div>

      {/* Verification Form Box */}
      <Card className="space-y-6 border border-white/15 p-8">
        <div className="space-y-4">
          <Input
            label="Certificate Serial Code or Hash ID"
            placeholder="e.g. SWAYAM-2024-HACK-089"
            value={inputHash}
            onChange={(e) => setInputHash(e.target.value)}
            icon={<Search className="w-4 h-4 glow-text-accent" />}
          />

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>Quick Test Codes:</span>
              <button
                onClick={() => {
                  setInputHash("SWAYAM-2024-HACK-089");
                  handleVerify("SWAYAM-2024-HACK-089");
                }}
                className="px-2 py-1 rounded bg-white/10 glow-text-accent hover:text-white"
              >
                SWAYAM-2024-HACK-089
              </button>
              <button
                onClick={() => {
                  setInputHash("SWAYAM-2024-SUMMIT-412");
                  handleVerify("SWAYAM-2024-SUMMIT-412");
                }}
                className="px-2 py-1 rounded bg-white/10 glow-text-accent hover:text-white"
              >
                SWAYAM-2024-SUMMIT-412
              </button>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={() => handleVerify()}
            >
              Verify Certificate
            </Button>
          </div>
        </div>
      </Card>

      {/* Result Output Card */}
      {searchResult && searchResult !== "not_found" && (
        <Card className="border-2 border-emerald-500/40 bg-emerald-950/20 space-y-6 p-8 relative overflow-hidden">
          <div className="flex items-start justify-between border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-emerald-500/20 text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <Badge variant="success">Official Certificate Verified</Badge>
                <h3 className="text-2xl font-bold text-white mt-1">Authentic Credential</h3>
              </div>
            </div>

            <div className="hidden sm:block text-right text-xs text-gray-400">
              <p>Serial ID:</p>
              <p className="font-mono text-white font-bold">{searchResult.certificateId}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div className="space-y-1">
              <p className="text-xs text-gray-400 uppercase font-semibold">Recipient Name</p>
              <p className="text-lg font-bold text-white">{searchResult.recipientName}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-400 uppercase font-semibold">Event Name</p>
              <p className="text-lg font-bold text-white">{searchResult.eventName}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-400 uppercase font-semibold">Achievement / Role</p>
              <p className="text-base font-semibold glow-text-accent">{searchResult.role}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-400 uppercase font-semibold">Issue Date</p>
              <p className="text-base font-medium text-white">{searchResult.issueDate}</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-black/60 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-300">
            <div className="truncate max-w-full">
              <span className="text-gray-500">Hash: </span>
              <span className="text-emerald-300">{searchResult.hash}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <QrCode className="w-5 h-5 glow-text-accent" />
              <span className="text-gray-400 text-[10px]">Tamper-Proof Ledger</span>
            </div>
          </div>
        </Card>
      )}

      {searchResult === "not_found" && (
        <Card className="border-2 border-rose-500/40 bg-rose-950/20 text-center p-8 space-y-4">
          <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
            <XCircle className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">Certificate Not Found</h3>
          <p className="text-xs text-gray-300 max-w-md mx-auto">
            No active certificate matching this ID was found in the Swayam registry. Please verify the code spelling or contact ecell@swayam-vce.edu.
          </p>
        </Card>
      )}

    </div>
  );
}
