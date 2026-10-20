import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#080909",
          yellow: "#FFE500",
          cream: "#FFF9E8",
          beige: "#F4E8C9",
          charcoal: "#242424",
          white: "#FFFFFF",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "glow-yellow": "0 0 25px rgba(255, 229, 0, 0.25)",
        "subtle-card": "0 8px 30px rgba(8, 9, 9, 0.04)",
      },
    },
  },
  plugins: [],
};
export default config;
