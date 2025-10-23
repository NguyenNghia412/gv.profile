import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        myriad: ["myriadpro-semibold"],
      },
      backgroundColor: {
        blue: '#ff0'
      }
    },
  },
  plugins: [],
};

export default config;
