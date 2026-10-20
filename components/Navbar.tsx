"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, UtensilsCrossed } from "lucide-react";
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

  // Track window scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
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

  // Clean navigation links: specifically WITHOUT duplicate "Menu" link on mobile
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
            ? "bg-brand-black/95 backdrop-blur-md border-b border-white/10 shadow-lg py-3"
            : "bg-transparent py-4 md:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            {/* Logo on the Left */}
            <Link
              href="/#home"
              className="flex items-center group focus:outline-none focus:ring-2 focus:ring-brand-yellow rounded-lg flex-shrink-0"
              aria-label="SR Baker's Treat Café Home"
            >
              <div
                id="navbar-brand-logo-container"
                className={`relative w-36 sm:w-44 md:w-52 h-11 sm:h-12 md:h-14 transition-opacity duration-500 ${
                  isSplashSettled ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src="/logo/sr-bakers-treat-logo.png"
                  alt="SR Baker’s Treat Café Logo"
                  fill
                  priority
                  sizes="(max-width: 640px) 144px, (max-width: 768px) 176px, 208px"
                  className="object-contain object-left"
                />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-neutral-300 hover:text-brand-yellow transition-colors relative py-1 focus:outline-none focus:text-brand-yellow"
                >
                  {link.label}
                </Link>
              ))}

              {/* Distinct Menu Link for Desktop */}
              <Link
                href="/menu"
                className={`text-sm font-semibold px-4 py-1.5 rounded-full transition-all duration-200 border ${
                  isMenuPage
                    ? "bg-brand-yellow text-brand-black border-brand-yellow shadow-[0_0_15px_rgba(255,229,0,0.3)]"
                    : "bg-brand-charcoal text-white border-white/20 hover:border-brand-yellow/60 hover:text-brand-yellow"
                }`}
              >
                Explore Menu
              </Link>
            </nav>

            {/* Navbar Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* MOBILE HOMEPAGE: Replace cart icon with clear 'View Menu' button */}
              {!isMenuPage ? (
                <Link
                  href="/menu"
                  className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-yellow hover:bg-[#ecd400] text-brand-black text-xs font-bold tracking-tight shadow-sm active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                  aria-label="View Café Menu"
                >
                  <UtensilsCrossed className="w-3.5 h-3.5" />
                  <span>View Menu</span>
                </Link>
              ) : (
                /* ON /menu (both mobile and desktop): Show cart button with live badge */
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2 sm:p-2.5 rounded-full bg-brand-charcoal hover:bg-neutral-800 text-neutral-200 hover:text-brand-yellow border border-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                  aria-label={`View order cart (${totalItems} items)`}
                >
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-brand-yellow" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-brand-yellow text-brand-black text-[10px] sm:text-[11px] font-bold rounded-full flex items-center justify-center shadow-md">
                      {totalItems}
                    </span>
                  )}
                </button>
              )}

              {/* DESKTOP ONLY: Cart trigger on homepage */}
              {!isMenuPage && (
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="hidden lg:flex relative p-2.5 rounded-full bg-brand-charcoal hover:bg-neutral-800 text-neutral-200 hover:text-brand-yellow border border-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                  aria-label={`View order cart (${totalItems} items)`}
                >
                  <ShoppingBag className="w-5 h-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-yellow text-brand-black text-[11px] font-bold rounded-full flex items-center justify-center shadow-md">
                      {totalItems}
                    </span>
                  )}
                </button>
              )}

              {/* Desktop WhatsApp Order CTA */}
              <div className="hidden sm:block">
                <WhatsAppButton size="sm" label="Order on WhatsApp" />
              </div>

              {/* Mobile Hamburger Toggle Button */}
              <button
                onClick={() => setMobileDrawerOpen(true)}
                className="lg:hidden p-2 rounded-lg bg-brand-charcoal text-neutral-200 hover:text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-yellow active:scale-95 transition-all"
                aria-label="Open navigation menu"
                aria-expanded={mobileDrawerOpen}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE NAVIGATION DRAWER WITH FULL-VIEWPORT BLUR OVERLAY */}
      {mobileDrawerOpen && (
        <div
          className="fixed inset-0 z-50 overflow-hidden lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          {/* Subtle dark backdrop with smooth background blur on the page behind the drawer */}
          <div
            className="fixed inset-0 bg-brand-black/75 backdrop-blur-md transition-opacity duration-200"
            onClick={() => setMobileDrawerOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer container: Sharp, clean, high contrast */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-12">
            <div className="w-screen max-w-xs sm:max-w-sm bg-[#0a0c0c] border-l border-white/10 shadow-2xl flex flex-col justify-between p-6">
              {/* Drawer Top Header with Logo & Clear Close Button */}
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div className="relative w-36 h-10">
                    <Image
                      src="/logo/sr-bakers-treat-logo.png"
                      alt="SR Baker’s Treat Café Logo"
                      fill
                      sizes="144px"
                      className="object-contain object-left"
                    />
                  </div>

                  <button
                    onClick={() => setMobileDrawerOpen(false)}
                    className="p-2 rounded-full bg-brand-charcoal text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                    aria-label="Close navigation drawer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Navigation Links: strictly without duplicate Menu link */}
                <nav className="mt-8 flex flex-col space-y-3">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileDrawerOpen(false)}
                      className="px-4 py-3 rounded-xl text-base font-medium text-neutral-200 hover:text-brand-black hover:bg-brand-yellow transition-all duration-150"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Drawer Footer Actions */}
              <div className="pt-6 border-t border-white/10 space-y-3">
                <WhatsAppButton
                  size="md"
                  className="w-full justify-center"
                  label="Direct WhatsApp Enquiry"
                />
                <p className="text-[11px] text-neutral-400 text-center">
                  Panemangalore, Bantwal • Karnataka
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
