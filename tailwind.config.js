/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: ["./src/**/*.{html,js}", "./index.html"],
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'banner': "url('../img/utils/banner.webp')",
      },
      height: {
        '40rem': '40rem',
      },
      fontFamily: {
        anton: ['Anton', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
      },
      colors: {
        jaune: '#FFD15B',
        noir: '#1B1B1B',
        gris: {
          DEFAULT: '#7A7A7A',
          light: '#C6C6C6',
        },
      },
    },
  },
  plugins: [],
}

