import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // AHDE VEFA brand palette (design.md §3)
        brand: {
          green: "#2A6A48", // Primary Green
          turquoise: "#04B6CA", // Action Turquoise
          "turquoise-dark": "#039DAF",
          dark: "#123D2B", // Dark Green
          mint: "#EEF8F4", // Soft Mint
          cream: "#FFF8EF", // Warm Cream
          gold: "#F4B740", // Donation Gold
        },
        ink: "#1F2933", // Dark Text
        muted: "#667085", // Muted Text
        hairline: "#E5E7EB", // Light Border
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "8px",
        md: "14px",
        lg: "20px",
        xl: "28px",
      },
      maxWidth: {
        container: "1280px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(16, 24, 40, 0.06), 0 1px 2px rgba(16, 24, 40, 0.04)",
        "card-hover": "0 12px 32px rgba(16, 24, 40, 0.10)",
        donation: "0 12px 40px rgba(42, 106, 72, 0.14)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
