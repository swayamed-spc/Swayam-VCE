"use client";

import React from "react";
import Link from "next/link";
import { Award, Download, ExternalLink, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { MOCK_CERTIFICATES } from "@/data/mock";
import { useToast } from "@/components/ui/Toast";

export default function StudentCertificatesPage() {
  const { showToast } = useToast();

  const handleDownloadCert = (certId: string) => {
    showToast("Certificate Saved", `Certificate ${certId} PDF generated.`, "success");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-1">
          <Badge variant="brand">Verified Credentials</Badge>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            My Earned Certificates
          </h1>
          <p className="text-xs sm:text-sm text-gray-300">
            Cryptographically signed event achievement certificates.
          </p>
        </div>

        <Link href="/verify">
          <Button variant="outline" size="sm">
            <ShieldCheck className="w-4 h-4 glow-text-accent" />
            <span>Verify Credential Publicly</span>
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_CERTIFICATES.map((cert) => (
          <Card key={cert.id} className="space-y-4 border border-white/15">
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl glow-bg-accent glow-text-accent border border-[var(--glow-current)]/30">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{cert.eventName}</h3>
                  <p className="text-xs glow-text-accent font-semibold">{cert.role}</p>
                </div>
              </div>
              <Badge variant="success" size="sm">Verified</Badge>
            </div>

            <div className="space-y-2 text-xs text-gray-300">
              <div className="flex justify-between">
                <span className="text-gray-400">Recipient:</span>
                <span className="font-semibold text-white">{cert.recipientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Issue Date:</span>
                <span>{cert.issueDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Serial ID:</span>
                <span className="font-mono glow-text-accent">{cert.certificateId}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <Link href={`/verify?code=${cert.certificateId}`}>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Verify Hash</span>
                </Button>
              </Link>

              <Button
                variant="primary"
                size="sm"
                onClick={() => handleDownloadCert(cert.certificateId)}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </Button>
            </div>
          </Card>
        ))}
      </div>

    </div>
  );
}
