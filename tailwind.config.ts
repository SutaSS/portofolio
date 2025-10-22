import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Tailwind v4 syntax
        "navy-blue": "#1A2A44",
        "olive-green": "#708D81", 
        "neon-aqua": "#7FFFD4",
        "dark-bg": "#0D1B2A",
        "soft-white": "#F5F5F5",
      },
      fontFamily: {
        orbitron: ["var(--font-orbitron)", "monospace"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;