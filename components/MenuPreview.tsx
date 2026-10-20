"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { menuItems } from "@/data/menu";
import { useCart } from "@/lib/cart-context";
import { ArrowRight, Plus, Check, ShoppingBag, MessageCircle } from "lucide-react";
import { buildWhatsAppDirectUrl } from "@/lib/whatsapp";

export const MenuPreview: React.FC = () => {
  const { addToCart, addedFeedbackId } = useCart();

  // Pick 5 genuine verified signature items from menu data
  const spotlightItem = menuItems.find((item) => item.id === "b-04") || menuItems[3]; // Crispy Chicken Supreme Burger
  const listItems = [
    menuItems.find((item) => item.id === "p-01") || menuItems[5], // Classic Margherita Royale Pizza
    menuItems.find((item) => item.id === "m-03") || menuItems[12], // Steamed Classic Chicken Momos
    menuItems.find((item) => item.id === "b-02") || menuItems[1], // Paneer Tikka Melt Burger
    menuItems.find((item) => item.id === "s-03") || menuItems[25], // Lotus Biscoff Thickshake
  ].filter(Boolean);

  const isSpotlightAdded = addedFeedbackId === spotlightItem.id;

  return (
    <section
      id="signature-items"
      className="pt-8 pb-16 sm:py-20 lg:py-28 bg-[#090b0b] border-t border-white/5 relative overflow-hidden"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-brand-yellow/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header with Framer Motion Reveal */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-yellow">
              Handcrafted Culinary Craft
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-white mt-2">
              Signature Items
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm md:text-base mt-2 leading-relaxed">
              A curated preview of authentic culinary creations transcribed directly from our café kitchen boards. Browse our full menu for all categories and dual-portion pricing.
            </p>
          </motion.div>

          {/* Primary Header CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="flex items-center gap-3 self-start md:self-auto"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-yellow hover:bg-[#ebd300] text-brand-black text-xs sm:text-sm font-semibold tracking-tight shadow-md transition-all group"
              >
                <span>View Full Menu</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Distinctive Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-stretch">
          {/* Left Column (5 cols): Spotlight Signature Item Card with 3D Depth & Motion */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-between rounded-3xl bg-brand-charcoal/50 border border-white/10 hover:border-brand-yellow/40 p-5 sm:p-7 relative overflow-hidden group shadow-xl transition-all duration-300"
            style={{ perspective: "1000px" }}
          >
            {/* Spotlight Food Image with Framer Motion Zoom */}
            <div className="relative aspect-[16/11] w-full rounded-2xl overflow-hidden border border-white/10 bg-brand-black mb-5">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative w-full h-full"
              >
                <Image
                  src="/images/category-burgers.webp"
                  alt={spotlightItem.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover"
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/images/placeholder_image.jpg";
                  }}
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/20 to-transparent pointer-events-none" />

              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-black bg-brand-yellow px-2.5 py-0.5 rounded-full shadow-sm">
                  Spotlight
                </span>
                <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-300 bg-brand-black/80 px-2 py-0.5 rounded-full border border-white/10 backdrop-blur-sm">
                  {spotlightItem.category}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex items-baseline justify-between">
                <span className="text-xl sm:text-2xl font-bold text-brand-yellow drop-shadow-sm">
                  ₹{spotlightItem.price}
                </span>
              </div>
            </div>

            {/* Spotlight Details */}
            <div className="flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  {spotlightItem.isVeg !== null && (
                    <span
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        spotlightItem.isVeg ? "bg-emerald-400" : "bg-red-400"
                      }`}
                      title={spotlightItem.isVeg ? "Vegetarian" : "Non-Vegetarian"}
                    />
                  )}
                  <h3 className="text-lg sm:text-2xl font-serif font-medium text-white group-hover:text-brand-yellow transition-colors">
                    {spotlightItem.name}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {spotlightItem.description}
                </p>
              </div>

              {/* Action with Motion */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <span className="text-[11px] text-neutral-400">
                  Kitchen signature creation
                </span>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => addToCart(spotlightItem)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    isSpotlightAdded
                      ? "bg-emerald-500 text-white"
                      : "bg-brand-yellow text-brand-black hover:bg-[#ebd300]"
                  }`}
                  aria-label={`Add ${spotlightItem.name} to cart`}
                >
                  {isSpotlightAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Added to Cart</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart (₹{spotlightItem.price})</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Right Column (7 cols): Editorial Grid of 4 Genuine Items */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
            {listItems.map((item, i) => {
              const isJustAdded = addedFeedbackId === item.id;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4, borderColor: "rgba(255, 229, 0, 0.35)" }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{
                    duration: 0.45,
                    ease: [0.16, 1, 0.3, 1],
                    delay: i * 0.08,
                  }}
                  className="rounded-2xl bg-brand-charcoal/40 hover:bg-brand-charcoal/70 border border-white/10 p-5 flex flex-col justify-between transition-all duration-200 group/card"
                >
                  <div>
                    {/* Header: Indicator, Category & Price */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        {item.isVeg !== null && (
                          <span
                            className={`w-2 h-2 rounded-full flex-shrink-0 ${
                              item.isVeg ? "bg-emerald-400" : "bg-red-400"
                            }`}
                            title={item.isVeg ? "Vegetarian" : "Non-Vegetarian"}
                          />
                        )}
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                          {item.category}
                        </span>
                      </div>

                      <span className="text-sm font-bold text-brand-yellow">
                        ₹{item.price}
                      </span>
                    </div>

                    {/* Dish Title */}
                    <h4 className="text-base font-serif font-medium text-white group-hover/card:text-brand-yellow transition-colors leading-snug">
                      {item.name}
                    </h4>

                    {/* Description */}
                    <p className="text-xs text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="mt-5 pt-3.5 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[11px] text-neutral-500">
                      Standard size
                    </span>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => addToCart(item)}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        isJustAdded
                          ? "bg-emerald-500 text-white"
                          : "bg-brand-yellow text-brand-black hover:bg-[#ebd300]"
                      }`}
                      aria-label={`Add ${item.name} to cart`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Editorial Action Banner with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 sm:mt-12 p-5 sm:p-7 rounded-2xl bg-gradient-to-r from-brand-charcoal/90 via-brand-charcoal/60 to-brand-charcoal/90 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left"
        >
          <div>
            <h3 className="text-base sm:text-lg font-serif font-medium text-white">
              Ready to explore our entire culinary catalogue?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Browse stone-baked pizzas, gourmet brioche burgers, steamed momos, pasta bowls & artisan shakes on our full menu page.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0 w-full sm:w-auto">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              href={buildWhatsAppDirectUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-brand-charcoal hover:bg-neutral-800 text-neutral-200 hover:text-white border border-white/15 text-xs font-semibold transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5 text-brand-yellow" />
              <span>Order on WhatsApp</span>
            </motion.a>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-brand-yellow hover:bg-[#ebd300] text-brand-black text-xs sm:text-sm font-semibold tracking-tight shadow-md transition-all"
              >
                <span>View Full Menu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
