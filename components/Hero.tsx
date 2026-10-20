"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Clock, MapPin } from "lucide-react";
import { WhatsAppButton } from "./WhatsAppButton";
import { businessConfig } from "@/data/config";

interface HeroProps {
  isReady?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isReady = true }) => {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 lg:pt-32 lg:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-brand-black"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-brand-yellow/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isReady ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="lg:col-span-6 flex flex-col justify-center text-left space-y-6"
          >
            {/* Subtle Brand Tag */}
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-brand-charcoal/80 border border-white/10 text-xs text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
              <span className="font-medium tracking-wide uppercase text-[11px] text-brand-yellow">
                Panemangalore, Karnataka
              </span>
            </div>

            {/* Editorial Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-serif font-medium text-white tracking-tight leading-[1.1] text-balance">
              Your cravings, <br />
              <span className="italic font-normal text-brand-yellow">beautifully</span> served.
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-neutral-300 max-w-xl font-normal leading-relaxed">
              {businessConfig.supportingTagline} From stone-baked crusts and gourmet brioche burgers to steamed momos and decadent shakes.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <WhatsAppButton
                size="lg"
                label="Order on WhatsApp"
                className="w-full sm:w-auto"
              />
              <Link
                href="/menu"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-brand-charcoal/90 hover:bg-neutral-800 text-white font-medium text-base border border-white/15 transition-all duration-200 active:scale-[0.98] group"
              >
                <span>Explore Menu</span>
                <ArrowRight className="w-4 h-4 text-brand-yellow group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Trust & Location Badges */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-5 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-yellow flex-shrink-0" />
                <span>Panemangalore, Bantwal</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-brand-yellow flex-shrink-0" />
                <span>10:30 AM – 10:30 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-brand-yellow flex-shrink-0" />
                <span>Fresh Kitchen Service</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Food Art Direction */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={isReady ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Premium Image Frame */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl md:rounded-3xl overflow-hidden border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-brand-charcoal">
                <Image
                  src="/images/hero-banner.jpg"
                  alt="SR Baker's Treat signature gourmet burger, thick chocolate shake, and golden fries"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  className="object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/70 via-transparent to-transparent pointer-events-none" />

                {/* Floating Dish Badge */}
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs p-3.5 rounded-xl bg-brand-black/85 backdrop-blur-md border border-white/15 text-white">
                  <div className="text-[11px] font-semibold text-brand-yellow uppercase tracking-wider">
                    Chef’s Selection
                  </div>
                  <div className="text-sm font-serif font-medium mt-0.5">
                    Artisan Burger & Craft Thickshake
                  </div>
                  <div className="text-[11px] text-neutral-300 mt-1">
                    Prepared fresh to order at SR Baker’s Treat
                  </div>
                </div>
              </div>

              {/* Decorative Subtle Background Corner Frame */}
              <div className="hidden sm:block absolute -top-3 -right-3 w-28 h-28 border-t-2 border-r-2 border-brand-yellow/30 rounded-tr-3xl pointer-events-none -z-10" />
              <div className="hidden sm:block absolute -bottom-3 -left-3 w-28 h-28 border-b-2 border-l-2 border-brand-yellow/30 rounded-bl-3xl pointer-events-none -z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
