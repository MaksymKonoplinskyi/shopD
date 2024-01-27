/** @type {import('tailwindcss').Config} */


export default {
  content: [
    "./src/App.tsx",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Montserrat'],
      header: ['Julius Sans One'],
      // krona: ['Krona One', 'serif'],
      // font-family: 'Krona One', sans-serif;
    },
    
    extend: {},
  },
  plugins: [],
}

//'./src/**/**/*.{html,tsx}'