"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, LogIn, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";

export default function LoginPage() {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast("Missing Fields", "Please enter both email and password.", "error");
      return;
    }
    showToast("Welcome Back!", "Logged into Swayam Portal successfully.", "success");
    window.location.href = "/student/dashboard";
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsForgotModalOpen(false);
    showToast("Reset Link Sent", `Password reset instructions sent to ${resetEmail || email}`, "info");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md space-y-6 border border-white/15 p-8 shadow-2xl relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="relative w-36 h-10 mx-auto mb-2">
            <Image
              src="/logo-swayam.svg"
              alt="Swayam Logo"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Student Portal Login</h1>
          <p className="text-xs text-gray-400">Access your digital tickets, certificates & event registrations</p>
        </div>

        {/* Social Google Login Button */}
        <button
          onClick={() => {
            showToast("Google Sign In", "Mock authentication via Google complete.", "success");
            window.location.href = "/student/dashboard";
          }}
          className="w-full h-11 bg-white/10 hover:bg-white/15 border border-white/15 rounded-xl flex items-center justify-center gap-3 text-sm font-semibold text-white transition-all"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.2 9 5 12 5z"
            />
            <path
              fill="#4285F4"
              d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
            />
            <path
              fill="#FBBC05"
              d="M5.6 14.8c-.3-.8-.4-1.8-.4-2.8s.1-2 .4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.2-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-[11px] text-gray-500 uppercase">Or email</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <Input
            label="College Email"
            type="email"
            placeholder="student@college.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail className="w-4 h-4 text-gray-400" />}
          />

          <div className="space-y-1">
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="w-4 h-4 text-gray-400" />}
            />
            <div className="text-right">
              <button
                type="button"
                onClick={() => setIsForgotModalOpen(true)}
                className="text-xs glow-text-accent hover:underline"
              >
                Forgot password?
              </button>
            </div>
          </div>

          <Button variant="primary" size="lg" fullWidth type="submit">
            <span>Sign In to Account</span>
            <LogIn className="w-4 h-4" />
          </Button>
        </form>

        {/* Footer link */}
        <div className="text-center text-xs text-gray-400 pt-2 border-t border-white/10">
          Don't have an account yet?{" "}
          <Link href="/signup" className="glow-text-accent hover:underline font-semibold">
            Create Account
          </Link>
        </div>
      </Card>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
        title="Reset Account Password"
      >
        <form onSubmit={handleForgotSubmit} className="space-y-4">
          <p className="text-xs text-gray-300">
            Enter your college email address and we'll send you a password reset verification link.
          </p>
          <Input
            label="Email Address"
            type="email"
            placeholder="student@college.edu"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
          />
          <Button variant="primary" size="md" fullWidth type="submit">
            Send Reset Instructions
          </Button>
        </form>
      </Modal>
    </div>
  );
}
