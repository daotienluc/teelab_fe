/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        padding: {
          DEFAULT: "0.5rem",
          sm: "2rem",
          lg: "5rem",
          xl: "6rem",
          "2xl": "9rem",
        },
      },
    },
  },
  plugins: [],
};
