import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { businessConfig } from "@/data/config";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SR Baker’s Treat Café | Panemangalore, Bantwal",
  description:
    "Experience luxury café bites, artisan stone-fired pizzas, gourmet burgers, steamed momos, decadent shakes, and handcrafted desserts at SR Baker’s Treat Café, Panemangalore.",
  keywords: [
    "SR Baker's Treat",
    "Cafe Panemangalore",
    "Bakery Bantwal",
    "Burgers Panemangalore",
    "Pizza Bantwal",
    "Bakers Treat Cafe",
  ],
  authors: [{ name: businessConfig.brandName }],
  openGraph: {
    title: "SR Baker’s Treat Café — Panemangalore",
    description: "Your cravings, beautifully served. Discover artisan café food and easy WhatsApp ordering.",
    url: "https://srbakerstreat.demo",
    siteName: businessConfig.brandName,
    locale: "en_IN",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#080909",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable} scroll-smooth`}>
      <body className="bg-brand-black text-brand-white font-sans antialiased selection:bg-brand-yellow selection:text-brand-black min-h-screen">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
