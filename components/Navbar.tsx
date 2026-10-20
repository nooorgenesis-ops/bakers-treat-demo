"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, UtensilsCrossed, Utensils, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { WhatsAppButton } from "./WhatsAppButton";

interface NavbarProps {
  isSplashSettled?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isSplashSettled = true }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const pathname = usePathname();
  const isMenuPage = pathname === "/menu";

  // Track window scroll with lightweight passive listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileDrawerOpen(false);
  }, [pathname]);

  // Handle escape key and lock body scroll when drawer is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileDrawerOpen) {
        setMobileDrawerOpen(false);
      }
    };

    if (mobileDrawerOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileDrawerOpen]);

  // Navigation links without duplicate "Menu" link for mobile
  const navLinks = [
    { label: "Home", href: "/#home" },
    { label: "About", href: "/#about" },
    { label: "Gallery", href: "/#gallery" },
    { label: "Reviews", href: "/#reviews" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled || isMenuPage
            ? "bg-[#080909]/95 backdrop-blur-md border-b border-white/10 shadow-lg py-2.5 sm:py-3"
            : "bg-transparent py-3.5 sm:py-4 md:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Logo on the Left - Strictly locked aspect ratio, no stretching */}
            <Link
              href="/#home"
              className="flex items-center group focus:outline-none focus:ring-2 focus:ring-brand-yellow rounded-lg flex-shrink-0"
              aria-label="SR Baker's Treat Café Home"
            >
              <div
                id="navbar-brand-logo-container"
                className={`relative w-32 sm:w-40 md:w-48 h-9 sm:h-11 md:h-12 flex-shrink-0 max-h-12 transition-opacity duration-300 ${
                  isSplashSettled ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                style={{ aspectRatio: "180/48" }}
              >
                <Image
                  src="/logo/sr-bakers-treat-logo.png"
                  alt="SR Baker’s Treat Café Logo"
                  fill
                  priority
                  sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 192px"
                  className="object-contain object-left max-h-full"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/images/placeholder_image.jpg";
                  }}
                />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => {
                const isHomeActive = link.label === "Home" && !isMenuPage;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`text-sm font-medium transition-colors relative py-1 focus:outline-none active:scale-95 ${
                      isHomeActive
                        ? "text-white font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-brand-yellow"
                        : "text-neutral-300 hover:text-brand-yellow"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Navbar Actions: Desktop only has 'View Menu', Contact Us button removed on desktop */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              {/* Desktop CTA: View Menu only */}
              <div className="hidden lg:flex items-center">
                <Link
                  href="/menu"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-yellow hover:bg-[#ebd300] text-brand-black text-xs font-bold tracking-tight shadow-[0_0_20px_rgba(255,229,0,0.25)] transition-all active:scale-95"
                >
                  <Utensils className="w-3.5 h-3.5" />
                  <span>View Menu</span>
                  <ArrowRight className="w-3 h-3 ml-0.5" />
                </Link>
              </div>

              {/* MOBILE ACTIONS */}
              {!isMenuPage ? (
                /* Mobile Homepage: 'View Menu' Button */
                <Link
                  href="/menu"
                  className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-yellow hover:bg-[#ecd400] text-brand-black text-xs font-bold tracking-tight shadow-sm active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-brand-yellow flex-shrink-0"
                  aria-label="View Café Menu"
                >
                  <UtensilsCrossed className="w-3.5 h-3.5" />
                  <span>View Menu</span>
                </Link>
              ) : (
                /* ON /menu: Show Cart Button with Live Count */
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2 sm:p-2.5 rounded-full bg-brand-charcoal hover:bg-neutral-800 text-neutral-200 hover:text-brand-yellow border border-white/10 transition-colors active:scale-90 focus:outline-none focus:ring-2 focus:ring-brand-yellow flex-shrink-0"
                  aria-label={`View order cart (${totalItems} items)`}
                >
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-brand-yellow" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-brand-yellow text-brand-black text-[10px] sm:text-[11px] font-bold rounded-full flex items-center justify-center shadow-md animate-in zoom-in-50 duration-150">
                      {totalItems}
                    </span>
                  )}
                </button>
              )}

              {/* Mobile Hamburger Toggle Button */}
              <button
                onClick={() => setMobileDrawerOpen(true)}
                className="lg:hidden p-2 rounded-lg bg-brand-charcoal text-neutral-200 hover:text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-yellow active:scale-90 transition-all flex-shrink-0"
                aria-label="Open navigation menu"
                aria-expanded={mobileDrawerOpen}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE NAVIGATION DRAWER WITH ANIMATED BLUR OVERLAY */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <div
            className="fixed inset-0 z-50 overflow-hidden lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            {/* Subtle dark backdrop with smooth background blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="fixed inset-0 bg-brand-black/80 backdrop-blur-md"
              onClick={() => setMobileDrawerOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer container: Fixed to right, full height, width max-w-[300px] sm:max-w-xs */}
            <div className="fixed inset-y-0 right-0 max-w-full flex pl-8 pointer-events-none">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                className="w-screen max-w-[280px] sm:max-w-xs h-full h-[100dvh] bg-[#090b0b] border-l border-white/10 shadow-2xl flex flex-col justify-between p-5 sm:p-6 pointer-events-auto overflow-y-auto"
              >
                {/* Drawer Top Header with Logo & Clear Close Button */}
                <div>
                  <div className="flex items-center justify-between pb-5 border-b border-white/10">
                    <div className="relative w-32 h-9">
                      <Image
                        src="/logo/sr-bakers-treat-logo.png"
                        alt="SR Baker’s Treat Café Logo"
                        fill
                        sizes="128px"
                        className="object-contain object-left"
                      />
                    </div>

                    <button
                      onClick={() => setMobileDrawerOpen(false)}
                      className="p-2 rounded-full bg-brand-charcoal text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-yellow active:scale-90"
                      aria-label="Close navigation drawer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Navigation Links: strictly without duplicate Menu link */}
                  <nav className="mt-6 flex flex-col space-y-1.5">
                    {navLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => setMobileDrawerOpen(false)}
                        className="px-3.5 py-2.5 rounded-xl text-sm sm:text-base font-medium text-neutral-200 hover:text-brand-black hover:bg-brand-yellow transition-all duration-150 active:scale-[0.98]"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>

                {/* Drawer Footer Actions */}
                <div className="pt-5 border-t border-white/10 space-y-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
                  <Link
                    href="/menu"
                    onClick={() => setMobileDrawerOpen(false)}
                    className="w-full py-2.5 px-4 rounded-xl bg-brand-yellow text-brand-black font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md active:scale-95"
                  >
                    <Utensils className="w-3.5 h-3.5" />
                    <span>View Full Menu</span>
                  </Link>

                  <WhatsAppButton
                    size="md"
                    className="w-full justify-center text-xs"
                    label="Direct WhatsApp Enquiry"
                  />
                  <p className="text-[10px] text-neutral-400 text-center">
                    Panemangalore, Bantwal • Karnataka
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
