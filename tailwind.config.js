/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "slate-1": "#111113",
        "slate-2": "#18191b",
        "slate-3": "#212225",
      },
    },
  },
  plugins: [],
};
