"use client";

import React, { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { FixedMobileBar } from "@/components/FixedMobileBar";
import { MenuCategory } from "@/components/MenuCategory";
import { menuCategories, menuItems, menuReviewList, MenuCategoryType } from "@/data/menu";
import { Search, ShoppingBag, X, AlertCircle, ChevronDown, ChevronUp, FileText } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategoryType | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showReviewNotes, setShowReviewNotes] = useState(false);
  const { totalItems, setIsCartOpen, subtotal } = useCart();

  // Filter items by search query and category
  const filteredCategories = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return menuCategories
      .filter((cat) => (selectedCategory === "All" ? true : cat.id === selectedCategory))
      .map((cat) => {
        const items = menuItems.filter((item) => {
          const matchesCat = item.category === cat.id;
          const matchesQuery =
            query === "" ||
            item.name.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query) ||
            (item.variants && item.variants.some((v) => v.name.toLowerCase().includes(query)));
          return matchesCat && matchesQuery;
        });
        return { category: cat, items };
      })
      .filter((entry) => entry.items.length > 0);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-brand-black text-white selection:bg-brand-yellow selection:text-brand-black">
      {/* Top Navbar */}
      <Navbar isSplashSettled={true} />

      <main className="pt-24 sm:pt-28 pb-20 lg:pt-36 lg:pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Menu Header with Framer Motion Reveals */}
        <div className="border-b border-white/10 pb-6 sm:pb-8 mb-6 sm:mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-2 mb-2"
              >
                <Link
                  href="/"
                  className="text-xs text-neutral-400 hover:text-brand-yellow transition-colors"
                >
                  Home
                </Link>
                <span className="text-neutral-600">/</span>
                <span className="text-xs text-brand-yellow font-medium">Menu</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-white tracking-tight"
              >
                The Café Menu
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xs sm:text-sm md:text-base text-neutral-400 mt-2 leading-relaxed"
              >
                Explore our full culinary collection transcribed from our kitchen boards and menu photography. All items, sizes, and dual prices are preserved for easy WhatsApp ordering.
              </motion.p>

              {/* Status Notice */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-charcoal text-[11px] text-neutral-300 border border-white/10"
              >
                <AlertCircle className="w-3.5 h-3.5 text-brand-yellow flex-shrink-0" />
                <span className="truncate">Photographic Source Transcription • Marked as Awaiting Owner Confirmation</span>
              </motion.div>
            </div>

            {/* Header Actions: Cart & WhatsApp Order with Motion */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-brand-charcoal hover:bg-neutral-800 text-white border border-white/10 transition-colors text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                aria-label={`Open Cart with ${totalItems} items`}
              >
                <ShoppingBag className="w-4 h-4 text-brand-yellow" />
                <span>Enquiry Cart</span>
                {totalItems > 0 && (
                  <span className="bg-brand-yellow text-brand-black px-2 py-0.5 rounded-full text-[11px] font-bold">
                    {totalItems} (₹{subtotal})
                  </span>
                )}
              </motion.button>

              <div className="hidden sm:block">
                <WhatsAppButton size="sm" label="Enquire on WhatsApp" />
              </div>
            </motion.div>
          </div>

          {/* Search Field & Controls with Motion */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-6 sm:mt-8 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between"
          >
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search burgers, pizza, momos, fried chicken, pasta..."
                className="w-full bg-brand-charcoal/70 border border-white/10 rounded-full pl-10 pr-10 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow transition-all"
                aria-label="Search menu items"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Dietary legend & Owner Audit Toggle */}
            <div className="flex items-center gap-4 text-xs text-neutral-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span>Vegetarian</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span>Non-Veg</span>
              </span>
              <button
                type="button"
                onClick={() => setShowReviewNotes(!showReviewNotes)}
                className="hidden sm:inline-flex items-center gap-1 text-brand-yellow hover:underline ml-2"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Review Notes ({menuReviewList.length})</span>
                {showReviewNotes ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            </div>
          </motion.div>

          {/* Optional Review Notes Panel for Discrepancies / Conflicts */}
          {showReviewNotes && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 rounded-2xl bg-neutral-900 border border-brand-yellow/20 space-y-2 text-xs"
            >
              <div className="font-semibold text-brand-yellow flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                <span>Owner Review & Discrepancy Log (Preserved for Sign-Off)</span>
              </div>
              <ul className="space-y-1.5 text-neutral-300">
                {menuReviewList.map((issue) => (
                  <li key={issue.productId} className="flex items-start gap-2 border-b border-white/5 pb-1">
                    <span className="text-brand-yellow font-medium">{issue.productName}:</span>
                    <span className="text-neutral-300">{issue.details}</span>
                    <span className="text-neutral-500">[{issue.sources.join(", ")}]</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Category Filter Pills with Staggered Motion */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 sm:mt-5 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none"
          >
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory("All")}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-brand-yellow ${
                selectedCategory === "All"
                  ? "bg-brand-yellow text-brand-black shadow-md font-bold"
                  : "bg-brand-charcoal text-neutral-300 hover:text-white hover:bg-neutral-800 border border-white/5"
              }`}
            >
              All Categories ({menuItems.length})
            </motion.button>
            {menuCategories.map((cat) => (
              <motion.button
                whileTap={{ scale: 0.95 }}
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-brand-yellow ${
                  selectedCategory === cat.id
                    ? "bg-brand-yellow text-brand-black shadow-md font-bold"
                    : "bg-brand-charcoal text-neutral-300 hover:text-white hover:bg-neutral-800 border border-white/5"
                }`}
              >
                {cat.name}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Menu Categories with Alternating Desktop Layout & Scroll Reveal */}
        {filteredCategories.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-brand-charcoal/20 rounded-3xl border border-white/5"
          >
            <p className="text-base font-serif text-white">No items found matching your filter</p>
            <p className="text-xs text-neutral-400 mt-1">
              Try adjusting your search query or selecting &quot;All Categories&quot;.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 rounded-full bg-brand-yellow text-brand-black text-xs font-semibold hover:bg-[#ebd300] active:scale-95"
            >
              Reset Filters
            </button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filteredCategories.map(({ category, items }, index) => (
              <MenuCategory
                key={category.id}
                category={category}
                items={items}
                index={index}
              />
            ))}
          </div>
        )}

        {/* Presentation Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="mt-14 sm:mt-16 p-4 rounded-xl bg-brand-charcoal/40 border border-white/10 text-xs text-neutral-400 text-center max-w-2xl mx-auto"
        >
          <strong className="text-brand-yellow font-semibold">Verification Notice:</strong> Menu items and prices are transcribed from café source photographs and marked as awaiting owner confirmation. Ordering via WhatsApp sends an enquiry summary for live availability and pricing confirmation.
        </motion.div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Fixed Mobile Bottom Bar */}
      <FixedMobileBar />
    </div>
  );
}
