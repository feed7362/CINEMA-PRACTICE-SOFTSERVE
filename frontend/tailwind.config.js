/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#2B59FF', // Твій основний колір
        'main-dark': '#0B0E14',  // Твій фон
      },
    },
  },
  plugins: [],
}