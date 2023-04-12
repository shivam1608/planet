/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        'gray': {
          800: '#212121',
          900: '#121212',
        },
      },
      fontFamily: {
        'ubuntu': ['Ubuntu', 'sans-serif']
      },
      textColor : {
        "primary" : "var(--color-primary)"
      },
      backgroundColor : {
        "primary" : "var(--color-primary)",
      },
      borderColor : {
        "primary" : "var(--color-primary)",
      },
      accentColor : {
        "primary" : "var(--color-primary)"
      },
      fill : {
        "primary" : "var(--color-primary)"
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}