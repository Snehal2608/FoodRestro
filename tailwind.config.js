// tailwind.config.js
/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    "./index.html", // Or path to your main HTML file
    "./src/**/*.{js,jsx,ts,tsx}", // THIS IS CRUCIAL FOR REACT COMPONENTS
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}