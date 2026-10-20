"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Phone, MapPin, ArrowUp } from "lucide-react";
import { businessConfig } from "@/data/config";
import { WhatsAppButton } from "./WhatsAppButton";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-brand-black text-neutral-400 border-t border-white/10 pt-16 pb-24 lg:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Logo (Exact Asset) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative w-48 h-14">
              <Image
                src="/logo/sr-bakers-treat-logo.png"
                alt="SR Baker’s Treat Café Logo"
                fill
                sizes="192px"
                className="object-contain object-left"
              />
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-sm leading-relaxed">
              {businessConfig.tagline} Handcrafted burgers, stone-fired pizza, Himalayan momos, and signature thickshakes in Panemangalore.
            </p>
            <div className="pt-2">
              <WhatsAppButton size="sm" label="Order on WhatsApp" />
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/#home" className="hover:text-brand-yellow transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-brand-yellow transition-colors">
                  About the Café
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-brand-yellow font-semibold text-white transition-colors">
                  Full Menu & Categories
                </Link>
              </li>
              <li>
                <Link href="/#gallery" className="hover:text-brand-yellow transition-colors">
                  Photo Showcase
                </Link>
              </li>
              <li>
                <Link href="/#reviews" className="hover:text-brand-yellow transition-colors">
                  Guest Reviews
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-brand-yellow transition-colors">
                  Contact & Location
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Summary */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Contact & Social
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-yellow flex-shrink-0 mt-0.5" />
                <span>Panemangalore, Bantwal, Karnataka 574231</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-yellow flex-shrink-0" />
                <a href={`tel:${businessConfig.phonePrimary}`} className="hover:underline">
                  {businessConfig.phonePrimary}
                </a>
                <span className="text-neutral-600">/</span>
                <a href={`tel:${businessConfig.phoneAlternate}`} className="hover:underline">
                  {businessConfig.phoneAlternate}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Instagram className="w-4 h-4 text-brand-yellow flex-shrink-0" />
                <a
                  href={businessConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-yellow transition-colors"
                >
                  {businessConfig.instagramHandle}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} {businessConfig.brandName}. All rights reserved. Demo presentation concept.
          </div>

          <div className="flex items-center gap-6">
            <span>Panemangalore, Karnataka</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors focus:outline-none"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
