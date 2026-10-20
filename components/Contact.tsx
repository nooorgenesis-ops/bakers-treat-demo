"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone, MapPin, Clock, Instagram, Navigation, MessageCircle } from "lucide-react";
import { businessConfig } from "@/data/config";
import { buildWhatsAppDirectUrl } from "@/lib/whatsapp";

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#090a0a] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-yellow">
            Get in Touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-white mt-2">
            Visit &amp; Contact Us
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-2">
            Drop by our café in Panemangalore or reach out directly for takeaway orders and table availability.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Verified Phone Contact */}
          <motion.div
            className="p-7 rounded-2xl bg-brand-charcoal/60 border border-white/10 flex flex-col justify-between"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0 }}
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-brand-yellow/10 text-brand-yellow flex items-center justify-center mb-5">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-medium text-white mb-2">
                Call Our Café
              </h3>
              <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
                Speak directly with the café staff for immediate order enquiries or queries.
              </p>

              <div className="space-y-3">
                <a
                  href={`tel:${businessConfig.phonePrimary}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-brand-black/80 hover:bg-neutral-800 border border-white/5 text-sm text-white group transition-colors"
                >
                  <span className="font-semibold text-brand-yellow group-hover:underline">
                    {businessConfig.phonePrimary}
                  </span>
                  <span className="text-[11px] text-neutral-400">Primary / WhatsApp</span>
                </a>

                <a
                  href={`tel:${businessConfig.phoneAlternate}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-brand-black/80 hover:bg-neutral-800 border border-white/5 text-sm text-white group transition-colors"
                >
                  <span className="font-semibold text-neutral-200 group-hover:underline">
                    {businessConfig.phoneAlternate}
                  </span>
                  <span className="text-[11px] text-neutral-400">Alternate</span>
                </a>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5">
              <a
                href={buildWhatsAppDirectUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-brand-yellow hover:text-[#ebd300]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </motion.div>

          {/* Card 2: Location & Address */}
          <motion.div
            className="p-7 rounded-2xl bg-brand-charcoal/60 border border-white/10 flex flex-col justify-between"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-brand-yellow/10 text-brand-yellow flex items-center justify-center mb-5">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-medium text-white mb-2">
                Panemangalore Café
              </h3>
              <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
                Conveniently situated in Bantwal taluk, easily accessible for dine-in and takeaways.
              </p>

              <div className="p-4 rounded-xl bg-brand-black/80 border border-white/5 text-sm text-neutral-300 space-y-1">
                <div className="font-medium text-white">{businessConfig.brandName}</div>
                <div>{businessConfig.addressLine1}</div>
                <div>{businessConfig.cityState}</div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5">
              <a
                href={businessConfig.mapPinPlaceholderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white border border-white/10 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-brand-yellow" />
                <span>Get Driving Directions</span>
              </a>
            </div>
          </motion.div>

          {/* Card 3: Hours & Social */}
          <motion.div
            className="p-7 rounded-2xl bg-brand-charcoal/60 border border-white/10 flex flex-col justify-between"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-brand-yellow/10 text-brand-yellow flex items-center justify-center mb-5">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-medium text-white mb-2">
                Hours & Social
              </h3>
              <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
                Follow our official social channel for freshly baked specials and cafe announcements.
              </p>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-brand-black/80 border border-white/5 text-xs text-neutral-300 flex items-center justify-between">
                  <span className="text-neutral-400">Timings:</span>
                  <span className="font-medium text-white">{businessConfig.openingHoursDisplay}</span>
                </div>

                <a
                  href={businessConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-brand-black/80 hover:bg-neutral-800 border border-white/5 text-xs text-neutral-200 flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Instagram className="w-4 h-4 text-brand-yellow" />
                    <span className="font-semibold group-hover:text-brand-yellow">
                      {businessConfig.instagramHandle}
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-500">Instagram</span>
                </a>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-neutral-500">
              * Exact opening hours and holiday schedules subject to cafe confirmation.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
