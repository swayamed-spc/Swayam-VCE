"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

export const DeepSpaceBackground = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const redLayerRef = useRef<HTMLDivElement>(null);
  const blueLayerRef = useRef<HTMLDivElement>(null);
  const lastDominantRef = useRef<"red" | "blue">("red");

  const updateScrollProgress = useCallback((progress: number) => {
    const p = Math.max(0, Math.min(1, progress));

    // Direct DOM ref updates for 120 FPS instant GPU rendering (no CSS transition lag)
    if (redLayerRef.current) {
      redLayerRef.current.style.opacity = (1 - p).toFixed(3);
    }
    if (blueLayerRef.current) {
      blueLayerRef.current.style.opacity = p.toFixed(3);
    }

    // Only update root CSS variable when dominant color flips to avoid full document style recalcs on every frame
    const dominant: "red" | "blue" = p < 0.5 ? "red" : "blue";
    if (dominant !== lastDominantRef.current) {
      lastDominantRef.current = dominant;
      const docEl = document.documentElement;
      const rgb = dominant === "red" ? "239, 31, 31" : "43, 107, 255";
      const hex = dominant === "red" ? "#ef1f1f" : "#2b6bff";
      docEl.style.setProperty("--glow-current", hex);
      docEl.style.setProperty("--glow-current-rgb", rgb);
      docEl.style.setProperty("--glow-current-secondary", hex);
      docEl.style.setProperty("--glow-current-secondary-rgb", rgb);
    }
  }, []);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 640);
      setPrefersReducedMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    };

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
          updateScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    checkViewport();
    handleScroll();

    window.addEventListener("resize", checkViewport, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", checkViewport);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [updateScrollProgress]);

  const particleCount = isMobile ? 6 : 12;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black select-none">
      {/* 1. RED HERO AMBIENT GLOW LAYER */}
      <div
        ref={redLayerRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 1,
          willChange: "opacity",
          transform: "translateZ(0)",
        }}
      >
        <div
          className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] rounded-full opacity-65"
          style={{
            background: `radial-gradient(circle, rgba(239, 31, 31, 0.7) 0%, rgba(239, 31, 31, 0.35) 45%, transparent 75%)`,
            filter: "blur(80px)",
            mixBlendMode: "screen",
          }}
        />
      </div>

      {/* 2. BLUE HERO AMBIENT GLOW LAYER */}
      <div
        ref={blueLayerRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0,
          willChange: "opacity",
          transform: "translateZ(0)",
        }}
      >
        <div
          className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] rounded-full opacity-65"
          style={{
            background: `radial-gradient(circle, rgba(43, 107, 255, 0.7) 0%, rgba(43, 107, 255, 0.35) 45%, transparent 75%)`,
            filter: "blur(80px)",
            mixBlendMode: "screen",
          }}
        />
      </div>

      {/* 3. OPTIMIZED SINGLE-PASS FLOATING PARTICLES */}
      <div className="absolute inset-0">
        {Array.from({ length: particleCount }).map((_, i) => {
          const size = (i % 4 + 1) * (isMobile ? 40 : 75);
          const top = `${(i * 15 + 5) % 90}%`;
          const left = `${(i * 19 + 8) % 90}%`;
          const duration = prefersReducedMotion ? 0 : 12 + (i % 4) * 4;
          const isRing = i % 3 === 0;

          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                top,
                left,
                width: size,
                height: size,
                background: isRing
                  ? "transparent"
                  : `radial-gradient(circle, rgba(var(--glow-current-rgb), ${
                      0.5 - (i % 3) * 0.1
                    }) 0%, transparent 75%)`,
                border: isRing
                  ? `1px solid rgba(var(--glow-current-rgb), ${0.3 - (i % 2) * 0.1})`
                  : "none",
                boxShadow: isRing
                  ? `0 0 20px rgba(var(--glow-current-rgb), 0.25)`
                  : `0 0 ${size * 0.5}px rgba(var(--glow-current-rgb), 0.3)`,
                filter: isRing ? "none" : `blur(${isMobile ? 25 : 50}px)`,
                mixBlendMode: isRing ? "normal" : "screen",
                willChange: "transform",
                transform: "translateZ(0)",
              }}
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      y: [0, -20, 15, 0],
                      x: [0, 12, -12, 0],
                      scale: [1, 1.06, 0.96, 1],
                    }
              }
              transition={{
                duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4,
              }}
            />
          );
        })}
      </div>

      {/* 4. Subtle Deep Space Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
};
