import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          background: "#FFFFFF",
          sunshine: "#F8E27A",
          charcoal: "#3A3A3A"
        }
      },
      fontFamily: {
        sans: ["'Inter'", ...fontFamily.sans]
      }
    }
  },
  plugins: []
};

export default config;
