"use client";

import React from "react";
import { clsx } from "clsx";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  interactive?: boolean;
  glowHover?: boolean;
  className?: string;
}

export const Card = ({
  children,
  interactive = false,
  glowHover = true,
  className,
  ...props
}: CardProps) => {
  return (
    <div
      className={clsx(
        "rounded-2xl p-6 transition-all duration-300",
        interactive
          ? "glass-panel-interactive cursor-pointer"
          : "glass-panel",
        glowHover && "dynamic-glow-border",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
