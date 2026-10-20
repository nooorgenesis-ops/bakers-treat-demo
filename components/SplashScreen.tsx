"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<"initial" | "settling" | "done">("initial");
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Check if user already saw splash this session or requested reduced motion
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
      // Fallback if storage access is restricted
    }

    // Phase 1 -> Phase 2 (Logo transition towards navbar) at 1.25s
    const timer1 = setTimeout(() => {
      setPhase("settling");
    }, 1250);

    // Phase 2 -> Done at 1.95s
    const timer2 = setTimeout(() => {
      setPhase("done");
      try {
        sessionStorage.setItem("sr_bakers_treat_splash_seen", "true");
      } catch {
        // Ignore
      }
      onComplete();
    }, 1950);

    // Complete cleanup from DOM after transition finishes
    const timer3 = setTimeout(() => {
      setShouldRender(false);
    }, 2400);

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
          animate={{ opacity: phase === "settling" ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center bg-brand-black overflow-hidden"
          style={{ backgroundColor: "#080909" }}
          aria-hidden="true"
        >
          {/* Subtle warm ambient backdrop glow */}
          <div className="absolute w-96 h-96 rounded-full bg-brand-yellow/10 blur-[100px] pointer-events-none" />

          {/* Central Logo Container with Motion */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={
              phase === "initial"
                ? { opacity: 1, scale: 1, y: 0 }
                : {
                    // Smoothly travel towards top-left navbar position
                    opacity: 0,
                    scale: 0.65,
                    y: -280,
                    x: -120,
                  }
            }
            transition={{
              duration: phase === "initial" ? 0.75 : 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative w-72 sm:w-80 md:w-96 h-28 sm:h-32 md:h-36 px-4"
          >
            <Image
              src="/logo/sr-bakers-treat-logo.png"
              alt="SR Baker's Treat Café Logo"
              fill
              priority
              sizes="(max-width: 640px) 288px, (max-width: 768px) 320px, 384px"
              className="object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
