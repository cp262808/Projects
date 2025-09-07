import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        w3green: "#04AA6D",
        w3dark: "#282A35",
        w3yellow: "#FFF4A3",
      },
      borderRadius: { xl: "12px" },
      boxShadow: { soft: "0 10px 24px rgba(0,0,0,.08)" },
    },
  },
  plugins: [],
};

export default config;
