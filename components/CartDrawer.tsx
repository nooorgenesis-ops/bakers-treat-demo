"use client";

import React, { useEffect } from "react";
import { useCart, getCartItemKey } from "@/lib/cart-context";
import { buildWhatsAppOrderUrl } from "@/lib/whatsapp";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

export const CartDrawer: React.FC = () => {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, clearCart, subtotal, totalItems } =
    useCart();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const whatsappUrl = buildWhatsAppOrderUrl(items, subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label="Order Cart">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brand-black/75 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-brand-black border-l border-white/10 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-brand-charcoal flex items-center justify-center text-brand-yellow">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-lg font-serif font-semibold text-white tracking-wide">
                  Your Order Enquiry
                </h2>
                <p className="text-xs text-neutral-400">
                  {totalItems} {totalItems === 1 ? "item" : "items"} selected
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-neutral-400 hover:text-white rounded-full hover:bg-brand-charcoal transition-colors focus:outline-none focus:ring-2 focus:ring-brand-yellow"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-brand-charcoal/80 flex items-center justify-center text-neutral-500 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-medium text-white mb-1">Your cart is empty</h3>
                <p className="text-sm text-neutral-400 max-w-xs mb-6">
                  Browse our handcrafted menu and add your favourite items to start an order enquiry.
                </p>
                <Link
                  href="/menu"
                  onClick={() => setIsCartOpen(false)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-yellow text-brand-black text-sm font-semibold hover:bg-[#ebd300] transition-colors"
                >
                  <span>Explore Menu</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              items.map((item) => {
                const itemKey = getCartItemKey(item);
                const unitPrice = item.selectedVariant?.price ?? item.product.price ?? 0;
                const lineTotal = unitPrice * item.quantity;

                return (
                  <div
                    key={itemKey}
                    className="p-4 rounded-xl bg-brand-charcoal/60 border border-white/5 flex items-start justify-between gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {item.product.isVeg !== null && (
                          <span
                            className={`w-2 h-2 rounded-full flex-shrink-0 ${
                              item.product.isVeg ? "bg-emerald-400" : "bg-red-400"
                            }`}
                            title={item.product.isVeg ? "Vegetarian" : "Non-Vegetarian"}
                          />
                        )}
                        <h4 className="text-sm font-medium text-white truncate">
                          {item.product.name}
                        </h4>
                      </div>

                      {item.selectedVariant && (
                        <div className="text-xs text-brand-yellow font-medium mt-0.5">
                          Variant: {item.selectedVariant.name}
                        </div>
                      )}

                      <p className="text-xs text-neutral-400 mt-1">
                        ₹{unitPrice} each
                      </p>
                      <div className="text-xs font-semibold text-brand-yellow mt-1">
                        Line total: ₹{lineTotal}
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-brand-black rounded-lg border border-white/10 p-1">
                        <button
                          onClick={() => updateQuantity(itemKey, -1)}
                          className="w-6 h-6 flex items-center justify-center text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-7 text-center text-xs font-semibold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(itemKey, 1)}
                          className="w-6 h-6 flex items-center justify-center text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(itemKey)}
                        className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer with subtotal and WhatsApp checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-brand-black/90 space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-sm text-neutral-400">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">₹{subtotal}</span>
                </div>
                <div className="flex justify-between items-center text-base font-semibold text-white pt-2 border-t border-white/5">
                  <span>Estimated Total</span>
                  <span className="text-brand-yellow text-lg">₹{subtotal}</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-neutral-900 border border-white/5 text-[11px] text-neutral-400 leading-relaxed">
                <span className="font-semibold text-neutral-300">Notice:</span> Prices transcribed from café menu photographs and awaiting final owner confirmation. The café team will confirm item availability, final total, and delivery charges on WhatsApp.
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-full bg-brand-yellow hover:bg-[#ebd300] text-brand-black font-semibold text-sm flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(255,229,0,0.25)] transition-all active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Checkout on WhatsApp</span>
              </a>

              <div className="flex justify-between items-center pt-1">
                <button
                  onClick={clearCart}
                  className="text-xs text-neutral-500 hover:text-red-400 underline transition-colors"
                >
                  Clear Cart
                </button>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-xs text-neutral-400 hover:text-white transition-colors"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
