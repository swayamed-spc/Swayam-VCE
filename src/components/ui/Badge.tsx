"use client";

import React from "react";
import { clsx } from "clsx";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "warning" | "danger" | "info" | "neutral" | "brand";
  size?: "sm" | "md";
  className?: string;
}

export const Badge = ({
  children,
  variant = "neutral",
  size = "md",
  className,
}: BadgeProps) => {
  const variantStyles = {
    success: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
    warning: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
    danger: "bg-rose-500/15 text-rose-400 border border-rose-500/30",
    info: "bg-sky-500/15 text-sky-400 border border-sky-500/30",
    neutral: "bg-white/10 text-gray-300 border border-white/10",
    brand: "glow-badge shadow-sm",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs rounded-full font-medium",
    md: "px-3 py-1 text-xs rounded-full font-semibold tracking-wide",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 backdrop-blur-md select-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
};
