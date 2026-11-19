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
        background: "#09090B",
        card: "#121216",
        "card-hover": "#181820",
        "card-elevated": "#1A1A22",
        border: "#27272A",
        "border-glow": "rgba(236, 72, 153, 0.3)",
        vice: {
          pink: "#EC4899",
          "pink-light": "#F472B6",
          "pink-glow": "rgba(236, 72, 153, 0.4)",
          cyan: "#06B6D4",
          "cyan-light": "#22D3EE",
          "cyan-glow": "rgba(6, 182, 212, 0.4)",
          purple: "#A855F7",
          sunset: "#F97316",
          gold: "#FBBF24",
        },
      },
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "'JetBrains Mono'",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      boxShadow: {
        "neon-pink": "0 0 20px -3px rgba(236, 72, 153, 0.35)",
        "neon-cyan": "0 0 20px -3px rgba(6, 182, 212, 0.35)",
        "neon-split": "0 0 15px -3px rgba(236, 72, 153, 0.25), 0 0 15px -3px rgba(6, 182, 212, 0.25)",
        "inner-glow": "inset 0 1px 1px 0 rgba(255, 255, 255, 0.05)",
      },
      animation: {
        "pulse-subtle": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 12s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
