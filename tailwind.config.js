/** @type {import('tailwindcss').Config} */
module.exports = {
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
}

