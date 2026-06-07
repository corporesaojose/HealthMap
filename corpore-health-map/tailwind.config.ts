import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lime: "#D7E94A",
        petroleum: "#0D2B2B",
        teal: "#2F6F6E",
        sage: "#A6B8A9",
        offwhite: "#F7F8F6",
        mistgray: "#E6E9E5",
        "blue-clinical": "#E6F0F7",
        "lavender-soft": "#EDE9F7",
        "sand-light": "#F4EFE6",
        "peach-soft": "#FFE9DC",
        "gray-light": "#D8DDE1",
        "blue-mist": "#B7C6D6",
      },
      fontFamily: {
        sora: ["var(--font-sora)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
