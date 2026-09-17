"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, Mail, Lock, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";

export default function SignupPage() {
  const { showToast } = useToast();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      showToast("Required Fields", "Please complete all fields.", "error");
      return;
    }
    showToast("Account Created!", "Welcome to Swayam E-Cell Portal!", "success");
    window.location.href = "/student/dashboard";
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md space-y-6 border border-white/15 p-8 shadow-2xl relative z-10">
        
        <div className="text-center space-y-2">
          <div className="relative w-36 h-10 mx-auto mb-2">
            <Image
              src="/logo-swayam.svg"
              alt="Swayam Logo"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Join Swayam E-Cell</h1>
          <p className="text-xs text-gray-400">Register as a student founder or event participant</p>
        </div>

        <form onSubmit={handleSignupSubmit} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="Shiva Sai"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            icon={<User className="w-4 h-4 text-gray-400" />}
          />

          <Input
            label="College Email"
            type="email"
            placeholder="student@college.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail className="w-4 h-4 text-gray-400" />}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<Lock className="w-4 h-4 text-gray-400" />}
          />

          <Button variant="primary" size="lg" fullWidth type="submit">
            <span>Create Student Account</span>
            <UserPlus className="w-4 h-4" />
          </Button>
        </form>

        <div className="text-center text-xs text-gray-400 pt-2 border-t border-white/10">
          Already registered?{" "}
          <Link href="/login" className="glow-text-accent hover:underline font-semibold">
            Sign In Here
          </Link>
        </div>
      </Card>
    </div>
  );
}
