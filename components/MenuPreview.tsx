"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { menuItems, MenuCategoryType } from "@/data/menu";
import { useCart } from "@/lib/cart-context";
import { ArrowRight, Plus, Check } from "lucide-react";

const previewCategories: { label: string; value: MenuCategoryType | "All" }[] = [
  { label: "All Favourites", value: "All" },
  { label: "Burgers", value: "Burgers" },
  { label: "Pizza", value: "Pizza" },
  { label: "Momos", value: "Momos" },
  { label: "Shakes & Drinks", value: "Shakes & Cold Beverages" },
];

export const MenuPreview: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<MenuCategoryType | "All">("All");
  const { addToCart, addedFeedbackId } = useCart();

  const filteredItems = menuItems
    .filter((item) => (activeCategory === "All" ? item.isPopular : item.category === activeCategory))
    .slice(0, 6);

  return (
    <section id="menu-preview" className="py-20 lg:py-28 bg-[#0e1010] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-yellow">
              The Café Collection
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-white mt-2">
              Signature Menu Preview
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-2">
              A curated selection of guest favourites. Browse below or visit our dedicated menu page for the full collection and category views.
            </p>
          </div>

          <Link
            href="/menu"
            className="inline-flex items-center gap-2 self-start md:self-auto text-sm font-semibold text-brand-yellow hover:text-[#ebd300] transition-colors group pb-1 border-b border-brand-yellow/30 hover:border-brand-yellow"
          >
            <span>View Full Menu & Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8">
          {previewCategories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-yellow ${
                activeCategory === cat.value
                  ? "bg-brand-yellow text-brand-black font-semibold shadow-md"
                  : "bg-brand-charcoal text-neutral-300 hover:text-white hover:bg-neutral-800 border border-white/5"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map((item, i) => {
              const isJustAdded = addedFeedbackId === item.id;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
                  className="bg-brand-charcoal/50 hover:bg-brand-charcoal/80 border border-white/10 hover:border-brand-yellow/40 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 group"
                >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full flex-shrink-0 ${
                          item.isVeg ? "bg-emerald-400" : "bg-red-400"
                        }`}
                        title={item.isVeg ? "Vegetarian" : "Non-Vegetarian"}
                      />
                      <span className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">
                        {item.category}
                      </span>
                    </div>

                    <span className="text-base font-semibold text-brand-yellow">
                      ₹{item.price}
                    </span>
                  </div>

                  <h3 className="text-base font-serif font-medium text-white group-hover:text-brand-yellow transition-colors">
                    {item.name}
                  </h3>

                  <p className="text-xs text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] text-neutral-500">
                    Sample price
                  </span>

                  <button
                    onClick={() => addToCart(item)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand-yellow ${
                      isJustAdded
                        ? "bg-emerald-500 text-white"
                        : "bg-brand-yellow text-brand-black hover:bg-[#ebd300]"
                    }`}
                    aria-label={`Add ${item.name} to order`}
                  >
                    {isJustAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                </div>
                </motion.div>
              );
            })}
          </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-brand-charcoal/80 to-brand-charcoal/40 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-base font-serif font-medium text-white">
              Looking for our complete list of categories and meals?
            </h4>
            <p className="text-xs text-neutral-400 mt-0.5">
              Explore our full menu page with alternating desktop editorial layouts and clean mobile browsing.
            </p>
          </div>
          <Link
            href="/menu"
            className="px-6 py-2.5 rounded-full bg-brand-yellow hover:bg-[#ebd300] text-brand-black text-sm font-semibold whitespace-nowrap shadow-md transition-colors"
          >
            Open Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
};
