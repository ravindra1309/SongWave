/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:'#30A2FF',
        secondary:"#394867",
        active : "#1976D2",
      },
    },
  },
  plugins: [],
}