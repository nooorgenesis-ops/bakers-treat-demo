"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Star, ExternalLink, Instagram } from "lucide-react";
import { businessConfig } from "@/data/config";

export const Reviews: React.FC = () => {
  return (
    <section id="reviews" className="py-20 lg:py-28 bg-brand-yellow text-brand-black relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs font-bold uppercase tracking-widest text-brand-black bg-brand-black/10 px-3 py-1 rounded-full">
            Guest Community
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-brand-black mt-3 tracking-tight">
            Customer Reviews &amp; Experiences
          </h2>
          <p className="text-neutral-800 text-sm sm:text-base max-w-2xl mx-auto mt-3">
            We believe in authentic guest sentiment. We invite our visitors to leave their genuine impressions on Google Maps and Instagram.
          </p>
        </motion.div>

        {/* Authentic Review Placeholder & Invite Card */}
        <motion.div
          className="mt-12 p-8 sm:p-12 rounded-3xl bg-brand-black text-white max-w-3xl mx-auto shadow-2xl relative overflow-hidden border border-brand-black"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          {/* Subtle star icons header */}
          <div className="flex items-center justify-center gap-1.5 text-brand-yellow mb-5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-brand-yellow text-brand-yellow" />
            ))}
          </div>

          <blockquote className="text-lg sm:text-xl font-serif italic text-neutral-100 leading-relaxed max-w-xl mx-auto">
            “Have you enjoyed our café bites, stone-crust pizzas, or handcrafted shakes in Panemangalore? We would love to feature your honest feedback.”
          </blockquote>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={businessConfig.mapPinPlaceholderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-yellow hover:bg-[#ecd400] text-brand-black font-bold text-xs sm:text-sm shadow-md transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Review Us on Google</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={businessConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-charcoal hover:bg-neutral-800 text-white font-medium text-xs sm:text-sm border border-white/20 transition-colors"
            >
              <Instagram className="w-4 h-4 text-brand-yellow" />
              <span>Tag Us {businessConfig.instagramHandle}</span>
            </a>
          </div>

          <div className="mt-6 text-[11px] text-neutral-400">
            * 100% genuine reviews. Zero fabricated testimonials or simulated ratings.
          </div>
        </motion.div>
      </div>
    </section>
  );
};
