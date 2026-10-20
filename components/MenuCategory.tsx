"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CategoryInfo, MenuItem, MenuItemVariant } from "@/data/menu";
import { useCart, getCartItemKey } from "@/lib/cart-context";
import { Plus, Minus, Check, ChevronDown, ChevronUp, AlertCircle, ShoppingBag } from "lucide-react";

interface MenuCategoryProps {
  category: CategoryInfo;
  items: MenuItem[];
  index: number; // For alternating desktop layout
}

export const MenuCategory: React.FC<MenuCategoryProps> = ({
  category,
  items,
  index,
}) => {
  const { items: cartItems, addToCart, updateQuantity, addedFeedbackId } = useCart();
  
  // Accordion state: ID of currently expanded item on mobile
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);

  // Active variant state per product ID
  const [selectedVariants, setSelectedVariants] = useState<Record<string, MenuItemVariant>>({});

  if (items.length === 0) return null;

  // Alternate on desktop: Even => items left/image right; Odd => image left/items right
  const isImageLeftOnDesktop = index % 2 === 1;

  const toggleExpand = (productId: string) => {
    setExpandedItemId((prev) => (prev === productId ? null : productId));
  };

  // Product List Component
  const ProductList = (
    <div className="flex-1 w-full divide-y divide-white/10">
      {items.map((product) => {
        const hasVariants = product.variants && product.variants.length > 0;
        const currentVariant =
          selectedVariants[product.id] || (hasVariants ? product.variants![0] : undefined);

        const currentTargetKey = currentVariant
          ? `${product.id}-${currentVariant.name}`
          : product.id;

        const inCartItem = cartItems.find((ci) => getCartItemKey(ci) === currentTargetKey);
        const currentQty = inCartItem?.quantity || 0;
        const isJustAdded = addedFeedbackId === product.id;
        const isExpanded = expandedItemId === product.id;

        const displayPrice = currentVariant
          ? currentVariant.price
          : product.price;

        return (
          <div
            key={product.id}
            className="py-3.5 transition-colors group"
          >
            {/* ROW HEADER: Tappable to expand */}
            <div
              onClick={() => toggleExpand(product.id)}
              className="flex items-center justify-between gap-3 cursor-pointer select-none"
            >
              {/* Product Name & Indicator */}
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                {product.isVeg !== null && (
                  <span
                    className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      product.isVeg ? "bg-emerald-400" : "bg-red-400"
                    }`}
                    title={product.isVeg ? "Vegetarian" : "Non-Vegetarian"}
                  />
                )}
                <h4 className="text-sm sm:text-base font-medium text-white group-hover:text-brand-yellow transition-colors truncate">
                  {product.name}
                </h4>
                {product.isPopular && (
                  <span className="hidden sm:inline-block text-[9px] uppercase font-bold text-brand-black bg-brand-yellow px-1.5 py-0.5 rounded">
                    Popular
                  </span>
                )}
              </div>

              {/* Right: Price & Quick Action & Chevron */}
              <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
                <span className="text-sm sm:text-base font-semibold text-brand-yellow whitespace-nowrap">
                  {displayPrice !== null ? `₹${displayPrice}` : "TBD"}
                </span>

                {/* Quick Add to Cart button (compact) */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product, currentVariant);
                  }}
                  disabled={!product.available}
                  className={`p-1.5 sm:px-3 sm:py-1 rounded-full text-xs font-semibold flex items-center gap-1 transition-all active:scale-90 focus:outline-none focus:ring-1 focus:ring-brand-yellow ${
                    !product.available
                      ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                      : isJustAdded
                      ? "bg-emerald-500 text-white"
                      : "bg-brand-yellow text-brand-black hover:bg-[#ebd300]"
                  }`}
                  aria-label={`Add ${product.name} to cart`}
                >
                  {isJustAdded ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Add</span>
                    </>
                  )}
                </button>

                {/* Chevron expand indicator */}
                <span className="text-neutral-400 group-hover:text-white transition-colors">
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </span>
              </div>
            </div>

            {/* ACCORDION DISCLOSURE with smooth AnimatePresence enter/exit */}
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  key={`acc-${product.id}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
              <div className="pt-3 pb-2 pl-4 pr-1 sm:pl-5 space-y-3 bg-brand-charcoal/30 rounded-xl mt-2.5 p-3 border border-white/5">
                {product.description && (
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {product.description}
                  </p>
                )}

                {/* Variant Selector Pills if product has multiple variants */}
                {hasVariants && (
                  <div className="flex items-center flex-wrap gap-2 pt-1">
                    <span className="text-[11px] text-neutral-400 font-medium">Select Option:</span>
                    {product.variants!.map((variant) => {
                      const isSelected = currentVariant?.name === variant.name;
                      return (
                        <button
                          key={variant.name}
                          type="button"
                          onClick={() =>
                            setSelectedVariants((prev) => ({
                              ...prev,
                              [product.id]: variant,
                            }))
                          }
                          className={`text-xs px-3 py-1 rounded-full border transition-all ${
                            isSelected
                              ? "bg-brand-yellow text-brand-black border-brand-yellow font-bold shadow-sm"
                              : "bg-brand-black/80 text-neutral-300 border-white/10 hover:border-white/30"
                          }`}
                        >
                          {variant.name} (₹{variant.price})
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Action controls when expanded */}
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    {currentQty > 0 ? (
                      <div className="flex items-center bg-brand-black rounded-full border border-white/15 p-0.5">
                        <button
                          type="button"
                          onClick={() => updateQuantity(currentTargetKey, -1)}
                          className="w-7 h-7 flex items-center justify-center text-neutral-300 hover:text-white rounded-full hover:bg-neutral-800 transition-colors"
                          aria-label={`Decrease ${product.name} quantity`}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-semibold text-white">
                          {currentQty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(currentTargetKey, 1)}
                          className="w-7 h-7 flex items-center justify-center text-neutral-300 hover:text-white rounded-full hover:bg-neutral-800 transition-colors"
                          aria-label={`Increase ${product.name} quantity`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-neutral-400">
                        Tap button to add to your order enquiry
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => addToCart(product, currentVariant)}
                    disabled={!product.available}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 ${
                      !product.available
                        ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                        : isJustAdded
                        ? "bg-emerald-500 text-white"
                        : "bg-brand-yellow text-brand-black hover:bg-[#ebd300]"
                    }`}
                  >
                    {isJustAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Cart (₹{displayPrice})</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Verification note if pending */}
                {product.priceVerificationStatus === "awaiting_owner_confirmation" && (
                  <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 pt-1">
                    <AlertCircle className="w-3 h-3 text-brand-yellow/80 flex-shrink-0" />
                    <span>Price transcribed from menu photography • Awaiting final owner confirmation</span>
                  </div>
                )}
              </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );

  // Category Image — Desktop ONLY, increased 70% in size (was w-72/xl:w-80, now w-[830px]/xl:w-[925px])
  const CategoryImage = (
    <div className="hidden lg:block w-[830px] xl:w-[925px] flex-shrink-0">
      <div className="sticky top-28">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-brand-charcoal"
        >
          <Image
            src={category.image}
            alt={category.imageAlt}
            fill
            sizes="(max-width: 1280px) 830px, 925px"
            className="object-cover transition-transform duration-700 hover:scale-105"
            loading="lazy"
            onError={(e) => { e.currentTarget.src = '/images/placeholder_image.jpg'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/85 via-transparent to-transparent pointer-events-none" />

          <div className="absolute bottom-4 left-5 right-5 text-white">
            <span className="text-[10px] font-bold text-brand-yellow uppercase tracking-wider">
              {category.name}
            </span>
            <p className="text-xs text-neutral-300 mt-0.5 line-clamp-2">
              {category.description}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );

  return (
    <motion.section
      id={category.id.toLowerCase().replace(/[\s&]+/g, "-")}
      className="py-8 border-b border-white/10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-80px" }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Category Heading & Subtext */}
      <div className="mb-5">
        <div className="flex items-center gap-3">
          <h3 className="text-xl sm:text-2xl font-serif font-medium text-white">
            {category.name}
          </h3>
          <span className="text-[11px] font-semibold text-brand-black bg-brand-yellow px-2 py-0.5 rounded-full">
            {items.length} {items.length === 1 ? "item" : "items"}
          </span>
        </div>
        <p className="text-xs text-neutral-400 mt-1 max-w-xl">
          {category.description}
        </p>
      </div>

      {/* Alternating Layout: On desktop, swap order based on isImageLeftOnDesktop */}
      <div className="flex flex-col lg:flex-row items-start gap-8">
        {isImageLeftOnDesktop ? (
          <>
            {CategoryImage}
            {ProductList}
          </>
        ) : (
          <>
            {ProductList}
            {CategoryImage}
          </>
        )}
      </div>
    </motion.section>
  );
};
