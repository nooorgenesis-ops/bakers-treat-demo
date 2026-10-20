"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Utensils, MessageCircle, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { buildWhatsAppDirectUrl } from "@/lib/whatsapp";

export const FixedMobileBar: React.FC = () => {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();
  const isMenuPage = pathname === "/menu";

  return (
    <aside
      aria-label="Quick Actions"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-brand-black/95 backdrop-blur-md border-t border-white/10 px-4 py-2.5 shadow-[0_-8px_20px_rgba(0,0,0,0.6)]"
    >
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        {/* Toggle Menu or Home */}
        {isMenuPage ? (
          <Link
            href="/"
            className="flex-1 min-h-[44px] flex items-center justify-center gap-2 rounded-full bg-brand-charcoal text-white text-xs font-semibold border border-white/10 active:scale-95 transition-all"
          >
            <span>Home Page</span>
          </Link>
        ) : (
          <Link
            href="/menu"
            className="flex-1 min-h-[44px] flex items-center justify-center gap-2 rounded-full bg-brand-charcoal text-white text-xs font-semibold border border-white/10 active:scale-95 transition-all"
          >
            <Utensils className="w-3.5 h-3.5 text-brand-yellow" />
            <span>View Menu</span>
          </Link>
        )}

        {/* View Cart button if items in cart */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative min-h-[44px] px-3.5 flex items-center justify-center rounded-full bg-brand-charcoal text-white border border-white/10 active:scale-95 transition-all"
          aria-label={`Open Cart (${totalItems} items)`}
        >
          <ShoppingBag className="w-4 h-4 text-brand-yellow" />
          {totalItems > 0 && (
            <span className="ml-1.5 text-xs font-bold text-brand-yellow">
              {totalItems}
            </span>
          )}
        </button>

        {/* Direct WhatsApp Order CTA */}
        <a
          href={buildWhatsAppDirectUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-h-[44px] flex items-center justify-center gap-1.5 rounded-full bg-brand-yellow text-brand-black text-xs font-semibold shadow-md active:scale-95 transition-all"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>
      </div>
    </aside>
  );
};
