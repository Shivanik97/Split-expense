/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'lg': '1280px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1536px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      colors: {
        'primary': '#336963',
        'secondary': '#6a8a9d',
        'tertiary': '#faf9f6'
      },
      fontFamily: {
        'sans': ['"Trebuchet MS", sans-serif'],
      },
    },
  },
  plugins: [],
}