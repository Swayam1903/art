import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F7F5F0",
        foreground: "#111111",
        card: "#FFFFFF",
        muted: "#6B6B6B",
        accent: {
          DEFAULT: "#B08D57", // Bronze
          light: "#D4B483", // Light Bronze
          dark: "#0B0B0C", // Reverting to Accent Black for general high contrast usage
          foreground: "#FFFFFF",
        },
        border: "#E6E1D9",
      },
      fontFamily: {
        serif: ["var(--font-syne)", "sans-serif"],
        sans: ["Satoshi", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
