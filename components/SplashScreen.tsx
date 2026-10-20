"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<"initial" | "transitioning" | "settled" | "done">("initial");
  const [shouldRender, setShouldRender] = useState(true);
  const splashLogoRef = useRef<HTMLDivElement>(null);
  const [flightCoords, setFlightCoords] = useState<{ x: number; y: number; scale: number } | null>(null);

  useEffect(() => {
    // Check if user already saw splash this session or prefers reduced motion
    try {
      const alreadySeen = sessionStorage.getItem("sr_bakers_treat_splash_seen");
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (alreadySeen || prefersReducedMotion) {
        setShouldRender(false);
        onComplete();
        return;
      }
    } catch {
      // Graceful fallback if storage access is restricted
    }

    // Step 1: Establish brand presence centrally for ~1.05s, then initiate flight
    const timer1 = setTimeout(() => {
      // Calculate responsive target coordinates using actual DOM element
      if (typeof window !== "undefined") {
        const navLogoEl = document.getElementById("navbar-brand-logo-container");
        const splashEl = splashLogoRef.current;

        if (navLogoEl && splashEl) {
          const navRect = navLogoEl.getBoundingClientRect();
          const splashRect = splashEl.getBoundingClientRect();

          // Calculate center-to-center delta
          const deltaX = (navRect.left + navRect.width / 2) - (splashRect.left + splashRect.width / 2);
          const deltaY = (navRect.top + navRect.height / 2) - (splashRect.top + splashRect.height / 2);
          const scale = navRect.width / splashRect.width;

          setFlightCoords({ x: deltaX, y: deltaY, scale });
        } else {
          // Responsive fallback if measurement is temporarily unavailable
          const isMobile = window.innerWidth < 768;
          setFlightCoords({
            x: isMobile ? -(window.innerWidth / 2 - 80) : -(window.innerWidth / 2 - 120),
            y: -(window.innerHeight / 2 - 32),
            scale: isMobile ? 0.48 : 0.55,
          });
        }
      }

      setPhase("transitioning");
    }, 1050);

    // Step 2: Transition completes at destination (~1.85s total)
    const timer2 = setTimeout(() => {
      setPhase("settled");
      try {
        sessionStorage.setItem("sr_bakers_treat_splash_seen", "true");
      } catch {
        // Ignore
      }
      onComplete();
    }, 1850);

    // Step 3: Complete overlay removal from DOM after smooth fade (~2.2s total)
    const timer3 = setTimeout(() => {
      setPhase("done");
      setShouldRender(false);
    }, 2200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  if (!shouldRender) return null;

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="splash-overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === "settled" ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center bg-[#080909] overflow-hidden"
          aria-hidden="true"
        >
          {/* Subtle warm ambient backdrop glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: phase === "initial" ? 1 : 0.2, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute w-[450px] h-[450px] rounded-full bg-brand-yellow/[0.08] blur-[120px] pointer-events-none"
          />

          {/* Central Logo Container with Fluid Measurement-Driven Flight */}
          <motion.div
            ref={splashLogoRef}
            initial={{ opacity: 0, scale: 0.88, y: 12 }}
            animate={
              phase === "initial"
                ? { opacity: 1, scale: 1, x: 0, y: 0 }
                : {
                    opacity: phase === "settled" ? 0 : 1,
                    scale: flightCoords?.scale ?? 0.55,
                    x: flightCoords?.x ?? 0,
                    y: flightCoords?.y ?? 0,
                  }
            }
            transition={{
              duration: phase === "initial" ? 0.7 : 0.75,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative w-64 sm:w-80 md:w-96 h-20 sm:h-24 md:h-28 px-4 will-change-transform max-h-28"
            style={{ aspectRatio: "180/48" }}
          >
            <Image
              src="/logo/sr-bakers-treat-logo.png"
              alt="SR Baker's Treat Café Logo"
              fill
              priority
              sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, 384px"
              className="object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
