import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#050403",
        ink: "#0b0908",
        panel: "#100c0b",
        crimson: {
          DEFAULT: "#8a1f1a",
          dim: "#3a0f0d",
          bright: "#d23b2e",
        },
        cyan: {
          DEFAULT: "#5fd1d9",
          dim: "#1f4a4d",
        },
        bone: "#f2ece1",
        smoke: "#948d83",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        widest2: "0.32em",
      },
      backgroundImage: {
        "grain": "url('/textures/grain.svg')",
      },
    },
  },
  plugins: [],
};

export default config;
