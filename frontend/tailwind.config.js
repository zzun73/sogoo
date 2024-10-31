/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "paper-pattern": "url('/src/assets/paper1.jpg')",
        "black-paper": "url('/src/assets/black-paper.jpg')",
      },
    },
  },
  plugins: [],
};
