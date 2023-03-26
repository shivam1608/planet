/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textColor : {
        "primary" : "var(--color-primary)"
      },
      backgroundColor : {
        "primary" : "var(--color-primary)",
      },
      accentColor : {
        "primary" : "var(--color-primary)"
      }
    },
  },
  plugins: [],
}