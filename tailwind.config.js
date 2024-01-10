/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT ({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'playfair': 'Playfair Display',
        'montserrat': 'Montserrat ExtraBold'
      },
      keyframes:{
        rightleft:{
          'from': {transform: 'translateX(100%)'},
          'to': {transform: 'translateX(0%)'},
        },
        leftright:{
          'from': {transform: 'translateX(0%)'},
          'to': {transform: 'translateX(100%)'},
        },
        moveupdisappear: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '1' },
          '50%': { transform: 'translateY(-50px) scale(1.5)', opacity: '0.5' },
          '100%': { transform: 'translateY(-100px) scale(2)', opacity: '0' },
        },
        moveuptopright: {
          '0%': { transform: 'translateY(0) translateX(0)'},
          '50%': { transform: 'translateY(-50%) translateX(50%)'},
          '100%': { transform: 'translateY(-100%) translateX(70%)'},
        },
        moveuptopleft: {
          '0%': { transform: 'translateY(0) translateX(0)'},
          '50%': { transform: 'translateY(-50%) translateX(-50%)'},
          '100%': { transform: 'translateY(-100%) translateX(-90%)'},
        },
        moveuptop: {
          '0%': { transform: 'translateY(0) translateX(0)'},
          '50%': { transform: 'translateY(-50%) translateX(-1%)'},
          '100%': { transform: 'translateY(-100%) translateX(-2%)'},
        },
        fadeapper: {
          '0%': { opacity: '0' },
          '50%': { opacity: '0.5' },
          '100%': { opacity: '1' },
        },
        fadedesapper: {
          '0%': { opacity: '1' },
          '50%': { opacity: '0.5' },
          '100%': { opacity: '0' },
        },
      },
      animation:{
        rightleft: 'rightleft 0.5s ease-in-out',
        leftright: 'leftright 0.5s ease-in-out',
        moveupdisappear: 'moveupdisappear 1s ease-in-out',
        moveuptopright: 'moveuptopright 0.5s ease-in-out',
        moveuptopleft: 'moveuptopleft 0.5s ease-in-out',
        moveuptop: 'moveuptop 0.5s ease-in-out',
        fadeapper: 'fadeapper 1s ease-in-out',
        fadedesapper: 'fadedesapper 0.3s ease-in-out',
      }
    },
  },
  plugins: [],
});