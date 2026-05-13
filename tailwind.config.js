/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'perch-orange': '#C45000',
        'perch-cream-light': '#FFF8F0',
        'perch-cream-dark': '#1A1410',
      },
    },
  },
  plugins: [],
}
