/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "cr-sm": { "min": "600px", "max": "720px" },
        "cr-md": { "min": "720px", "max": "1080px" },
      },
    },
  },
  plugins: [],
}