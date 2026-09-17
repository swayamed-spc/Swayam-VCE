"use client";

import React from "react";
import { clsx } from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      children,
      className,
      fullWidth = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "px-3 py-1.5 text-xs rounded-full gap-1.5 h-8",
      md: "px-5 py-2.5 text-sm rounded-full gap-2 h-10 font-medium",
      lg: "px-7 py-3.5 text-base rounded-full gap-2.5 h-12 font-semibold",
    };

    const variantClasses = {
      primary: "dynamic-glow-button text-white font-medium active:scale-95",
      secondary:
        "bg-white/10 hover:bg-white/15 text-white border border-white/10 backdrop-blur-md active:scale-95 transition-all",
      outline:
        "bg-transparent border border-white/20 text-white hover:border-white/50 hover:bg-white/5 active:scale-95 transition-all",
      ghost:
        "bg-transparent text-gray-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all",
      danger:
        "bg-red-600/80 hover:bg-red-600 text-white shadow-lg shadow-red-600/30 active:scale-95 transition-all",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={clsx(
          "inline-flex items-center justify-center cursor-pointer select-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
          sizeClasses[size],
          variantClasses[variant],
          fullWidth ? "w-full" : "",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
