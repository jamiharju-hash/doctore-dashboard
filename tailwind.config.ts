import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        terminal: {
          950: "#07111F",
          900: "#0E1B2A",
          800: "#12243A",
          700: "#18324A",
          accent: "#00C2A8",
          cyan: "#7AD7FF"
        }
      },
      boxShadow: {
        glow: "0 0 35px rgba(0, 194, 168, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
