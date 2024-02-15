/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      fontFamily: {
          'hindi-guntur': ['Hind Guntur', "sans-serif"],
          'indie-flower': ['Indie Flower', 'cursive']
      },
      colors: {
        'brand': {
          '50': '#fff1f4',
          '100': '#fee5e9',
          '200': '#fdcedb',
          '300': '#fba6bc',
          '400': '#f981a3',
          '500': '#f14278',
          '600': '#dd2164',
          '700': '#bb1555',
          '800': '#9c154d',
          '900': '#861548',
          '950': '#4b0624',
        },
      },
    }
  },

  plugins: [],
};

module.exports = config;
