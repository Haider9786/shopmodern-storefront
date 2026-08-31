/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#3525CD",
          "primary-hover": "#2B1DAE",
          secondary: "#006C49",
          "secondary-hover": "#005236",
          surface: "#F9F9FF",
          "surface-container": "#E7EEFE",
          "on-surface": "#151C27",
          "on-surface-variant": "#464555",
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        "2xl": "1rem",
      },
    },
  },
  plugins: [],
};