/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1e3a8a",
        accent: "#f59e0b",
        saffron: "#FF9933",
        green: "#138808",
      },
    },
  },
  plugins: [],
};