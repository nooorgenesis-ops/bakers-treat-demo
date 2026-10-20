"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface GalleryItem {
  id: string;
  title: string;
  tag: string;
  image: string;
  alt: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: "g-1",
    title: "Gourmet Burgers & Crisp Fries",
    tag: "Signature Buns",
    image: "/images/hero-banner.jpg",
    alt: "Artisan gourmet burger layered with melted cheese and fresh fries",
  },
  {
    id: "g-2",
    title: "Stone-Baked Herb Pizza",
    tag: "Oven Classics",
    image: "/images/category-pizza.webp",
    alt: "Stone-baked thin-crust pizza topped with melted mozzarella and basil",
  },
  {
    id: "g-3",
    title: "Steamed Himalayan Momos",
    tag: "Dumpling Craft",
    image: "/images/category-momos.webp",
    alt: "Steamed Asian dumplings served in traditional bamboo steamer with spicy chutney",
  },
  {
    id: "g-4",
    title: "Loaded Peri-Peri French Fries",
    tag: "Crispy Sides",
    image: "/images/category-fries.webp",
    alt: "Crispy seasoned fries served with creamy dipping sauces in rustic bowl",
  },
  {
    id: "g-5",
    title: "Belgian Chocolate Thickshake",
    tag: "Chilled Sips",
    image: "/images/category-shakes.webp",
    alt: "Tall glass of chocolate milkshake with whipped topping and biscuit garnish",
  },
  {
    id: "g-6",
    title: "Molten Chocolate Lava Cake",
    tag: "Sweet Indulgence",
    image: "/images/category-desserts.webp",
    alt: "Warm chocolate lava cake with flowing center and vanilla ice cream",
  },
];

export const Gallery: React.FC = () => {
  return (
    <section id="gallery" className="py-20 lg:py-28 bg-[#0c0d0d] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-yellow">
            Visual Highlights
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-white mt-2">
            The Café Showcase
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-2">
            A glimpse into the textures, flavors, and moments crafted for our guests. Placeholder gallery prepared for upcoming official café photography.
          </p>
        </div>

        {/* Responsive Grid with staggered motion */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.1 }}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-brand-charcoal border border-white/10 shadow-lg"
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/images/placeholder_image.jpg";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-brand-yellow bg-brand-black/70 px-2 py-0.5 rounded backdrop-blur-sm">
                  {item.tag}
                </span>
                <h3 className="text-sm font-medium text-white mt-1.5 drop-shadow-sm">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-neutral-500 mt-8">
          * Representative visual showcase for presentation demo. Official in-café photography will replace placeholders.
        </p>
      </div>
    </section>
  );
};
