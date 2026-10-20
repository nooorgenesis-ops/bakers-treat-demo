"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Utensils, Send, Sparkles, Clock, MapPin } from "lucide-react";

interface HeroProps {
  isReady?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isReady = true }) => {
  return (
    <section
      id="home"
      className="relative min-h-[auto] sm:min-h-screen flex items-center justify-center pt-24 pb-8 sm:pt-28 sm:pb-16 lg:pt-36 lg:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#080909]"
    >
      {/* 1. Full-Bleed Edge-to-Edge Cinematic Food Photography Background */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={isReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <Image
          src="/images/cinematic-hero.jpg"
          alt="Artisan gourmet brioche burger with melted cheddar, golden fries, and chocolate milkshake in a warm café setting"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_center] sm:object-[65%_center] md:object-center transform scale-100 will-change-transform"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/images/placeholder_image.jpg";
          }}
        />

        {/* Cinematic Left-to-Right Dark Gradient for Crisp Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080909] via-[#080909]/92 to-transparent sm:via-[#080909]/80 lg:to-transparent" />

        {/* Ambient Top & Bottom Vignettes for Navbar & Info Strip Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080909] via-transparent to-[#080909]/65" />
      </motion.div>

      {/* 2. Hero Content Container with Choreographed Framer Motion */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="max-w-2xl lg:max-w-3xl flex flex-col justify-center text-left space-y-5 sm:space-y-8">
          {/* Eyebrow with decorative gold rule */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isReady ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="flex items-center gap-3"
          >
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-brand-yellow">
              PANEMANGALORE · SINCE 2019
            </span>
            <span className="w-10 sm:w-16 h-[1px] bg-brand-yellow/60 rounded-full inline-block" />
          </motion.div>

          {/* Main Editorial Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-[5.25rem] font-serif font-normal text-[#F8F5ED] tracking-tight leading-[1.12] sm:leading-[1.08] text-balance drop-shadow-md"
          >
            Made for your <br />
            next <span className="italic font-normal text-brand-yellow">favourite</span> moment.
          </motion.h1>

          {/* Supporting Editorial Copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="text-sm sm:text-base md:text-lg text-neutral-300 max-w-xl font-normal leading-relaxed text-balance drop-shadow-sm"
          >
            Freshly prepared favourites, indulgent shakes and comforting bites — served with care, every day.
          </motion.p>

          {/* Primary and Secondary Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 pt-1 sm:pt-2"
          >
            {/* Primary CTA: View Menu */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/menu"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-brand-yellow hover:bg-[#ecd400] text-brand-black text-sm sm:text-base font-bold tracking-tight shadow-[0_0_28px_rgba(255,229,0,0.38)] transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-brand-yellow"
              >
                <Utensils className="w-4 h-4 text-brand-black" />
                <span>View Menu</span>
                <ArrowRight className="w-4 h-4 text-brand-black group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Secondary CTA: Contact Us */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/#contact"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 px-6 py-3.5 sm:px-7 sm:py-4 rounded-full bg-brand-black/50 hover:bg-neutral-900/80 text-white text-sm sm:text-base font-medium border border-white/25 hover:border-brand-yellow/60 backdrop-blur-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
              >
                <Send className="w-3.5 h-3.5 text-neutral-300" />
                <span>Contact Us</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Bottom Information Strip */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="pt-4 sm:pt-8 flex flex-wrap items-center gap-2.5 sm:gap-5 text-xs text-neutral-300"
          >
            {/* Gold Accent Bar */}
            <span className="hidden sm:inline-block w-8 h-[2px] bg-brand-yellow/80 rounded-full" />

            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-brand-yellow flex-shrink-0" />
              <span>Freshly prepared</span>
            </div>

            <span className="text-white/20 select-none hidden sm:inline">•</span>

            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-brand-yellow flex-shrink-0" />
              <span>Panemangalore, Bantwal</span>
            </div>

            <span className="text-white/20 select-none hidden sm:inline">•</span>

            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-brand-yellow flex-shrink-0" />
              <span>10:30 AM – 10:30 PM</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
