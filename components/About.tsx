"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Coffee, Heart, UtensilsCrossed, Sparkles } from "lucide-react";
import { businessConfig } from "@/data/config";

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-brand-cream text-brand-black relative overflow-hidden">
      {/* Subtle warm ambient styling */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Brand Composition */}
          <motion.div
            className="lg:col-span-5 relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border-2 border-brand-black/10 shadow-[0_20px_40px_rgba(0,0,0,0.08)] bg-white">
              <Image
                src="/images/category-pizza.webp"
                alt="Artisan culinary craft at SR Baker’s Treat"
                fill
                sizes="(max-width: 1024px) 100vw, 450px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/75 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-brand-black/10 text-brand-black shadow-lg">
                <div className="flex items-center gap-1.5 text-brand-black">
                  <Sparkles className="w-3.5 h-3.5 fill-brand-yellow text-brand-yellow" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-black">
                    Our Philosophy
                  </span>
                </div>
                <p className="text-sm font-serif text-brand-black mt-1 italic">
                  “Good food, honest ingredients, and warm hospitality for our community.”
                </p>
                <div className="text-[11px] text-neutral-600 mt-2 font-medium">
                  Panemangalore, Bantwal • Karnataka
                </div>
              </div>
            </div>

            {/* Decorative yellow backdrop frame */}
            <div className="absolute -bottom-3 -right-3 w-32 h-32 bg-brand-yellow/30 rounded-3xl -z-10" />
          </motion.div>

          {/* Right Column: Editorial Introduction */}
          <motion.div
            className="lg:col-span-7 space-y-6 order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-yellow text-brand-black border border-brand-black/10 font-bold text-xs uppercase tracking-widest shadow-sm">
              <span>About Our Café</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-brand-black leading-tight tracking-tight">
              A place for your favourite bites, sweet treats, and everyday café moments.
            </h2>

            <div className="space-y-4 text-neutral-800 text-sm sm:text-base leading-relaxed font-normal">
              <p>
                Located in the heart of Panemangalore, <strong className="text-brand-black font-semibold">{businessConfig.brandName}</strong> brings people together over appetizing savory food, indulgent bakery sweets, and refreshing thickshakes.
              </p>
              <p>
                Whether you’re stopping by for a gourmet brioche burger, stone-baked thin crust pizza, freshly steamed Himalayan momos, or a chilled artisan drink with friends, our café is crafted for comfort, speed, and great taste.
              </p>
            </div>

            {/* Three Pillar Cards in Baked Beige */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-brand-black/10">
              <div className="p-4 rounded-2xl bg-white border border-brand-black/10 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-brand-yellow flex items-center justify-center text-brand-black mb-3 font-bold shadow-sm">
                  <UtensilsCrossed className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-brand-black">Curated Recipes</h3>
                <p className="text-xs text-neutral-600 mt-1">
                  Savory café bites, stone-baked oven classics & decadent treats.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-brand-black/10 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-brand-yellow flex items-center justify-center text-brand-black mb-3 font-bold shadow-sm">
                  <Coffee className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-brand-black">Warm Ambience</h3>
                <p className="text-xs text-neutral-600 mt-1">
                  A welcoming neighbourhood space for friends and families.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-brand-black/10 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-brand-yellow flex items-center justify-center text-brand-black mb-3 font-bold shadow-sm">
                  <Heart className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-brand-black">Local Hospitality</h3>
                <p className="text-xs text-neutral-600 mt-1">
                  Friendly service with quick, direct WhatsApp takeaway ordering.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
