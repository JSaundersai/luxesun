import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand
        gold: {
          DEFAULT: "#ccb04a",
          light: "#d9c36e",
          dark: "#b59a3a",
        },
        // Surfaces
        parchment: "#f5f4ed",
        ivory: "#faf9f5",
        "warm-sand": "#e8e6dc",
        // Dark
        "near-black": "#141413",
        "dark-surface": "#30302e",
        // Text
        "charcoal-warm": "#4d4c48",
        "olive-gray": "#5e5d59",
        "stone-gray": "#87867f",
        "dark-warm": "#3d3d3a",
        "warm-silver": "#b0aea5",
        // Borders
        "border-cream": "#f0eee6",
        "border-warm": "#e8e6dc",
        "ring-warm": "#d1cfc5",
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      borderRadius: {
        comfortable: "8px",
        generous: "12px",
        "very-round": "16px",
        "max-round": "32px",
      },
      boxShadow: {
        whisper: "rgba(0,0,0,0.05) 0px 4px 24px",
        "ring-gold": "#ccb04a 0px 0px 0px 0px, #ccb04a 0px 0px 0px 1px",
        "ring-warm": "#e8e6dc 0px 0px 0px 0px, #d1cfc5 0px 0px 0px 1px",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 1.2s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
