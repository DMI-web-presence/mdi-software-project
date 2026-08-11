import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#151618",
        mist: "#f4f2ed",
        moss: "#63725c",
        signal: "#e45d36",
        denim: "#274568",
      },
      boxShadow: {
        soft: "0 18px 60px rgba(21, 22, 24, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;

