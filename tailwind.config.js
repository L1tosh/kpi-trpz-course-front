/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        darkBlue: "#303c56",
        ordinaryBlue: "#3a4a64",
        selectedBlue: "#47536d",
      }
    },
  },
  plugins: [],
}

