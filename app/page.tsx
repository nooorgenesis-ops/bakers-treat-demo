"use client";

import React, { useState } from "react";
import { SplashScreen } from "@/components/SplashScreen";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { MenuPreview } from "@/components/MenuPreview";
import { About } from "@/components/About";
import { Gallery } from "@/components/Gallery";
import { Reviews } from "@/components/Reviews";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { FixedMobileBar } from "@/components/FixedMobileBar";

export default function HomePage() {
  const [isSplashSettled, setIsSplashSettled] = useState(false);

  const handleSplashComplete = () => {
    setIsSplashSettled(true);
  };

  return (
    <div className="relative min-h-screen bg-brand-black text-brand-white selection:bg-brand-yellow selection:text-brand-black">
      {/* Signature Brand Splash Screen */}
      <SplashScreen onComplete={handleSplashComplete} />

      {/* Persistent Navigation */}
      <Navbar isSplashSettled={isSplashSettled} />

      {/* Main Content Sections */}
      <main>
        {/* 1. Home / Hero */}
        <Hero isReady={isSplashSettled} />

        {/* 2. Signature Menu Preview */}
        <MenuPreview />

        {/* 3. About SR Baker’s Treat */}
        <About />

        {/* 4. Gallery Showcase */}
        <Gallery />

        {/* 5. Customer Reviews Invitation */}
        <Reviews />

        {/* 6. Contact and Visit Information */}
        <Contact />
      </main>

      {/* 7. Footer */}
      <Footer />

      {/* Slide-out Cart Drawer */}
      <CartDrawer />

      {/* Fixed Mobile Action Bar */}
      <FixedMobileBar />
    </div>
  );
}
