/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx,svg}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'Lato':['"Lato"', 'sans-serif']
      }
    },
  },
  plugins: [],
}