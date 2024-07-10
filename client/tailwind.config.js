/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
  ],
  extend: {
    colors: {
      'potters-clay': '#8c6b3d',
      'new-orleans': '#f2dda6',
      'tumbleweed': '#d9b678',
      'mongoose': '#baa779',
      'mondo': '#493e2c',
      'donkey-brown': '#a38f6f',
      'heathered-gray': '#bdb59a',
      'indian-khaki': '#c4c491',
      'espresso': '#643c1c',
    },
  },
};
