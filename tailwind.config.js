/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#BDEE63',
        'primaryGray': '#2d2d2d',
        'normalGray': '#3b3b3b',
        'background': '#181818',
        'darkBackground': '#1e1e1e'
      }
    },
  },
  plugins: [],
}