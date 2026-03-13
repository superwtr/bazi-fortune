import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        wood: "#4CAF50",
        fire: "#E53935",
        earth: "#FFB300",
        metal: "#B0BEC5",
        water: "#1E88E5",
        cinnabar: "#C43C2D",
        jade: "#5B8C5A",
        gold: "#D4A843",
      },
      fontFamily: {
        sans: ["DM Sans", "Noto Sans SC", "system-ui", "sans-serif"],
        chinese: ["Noto Sans SC", "PingFang SC", "sans-serif"],
        mono: ["DM Mono", "SF Mono", "monospace"],
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
