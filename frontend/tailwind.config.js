/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        new: "calc(100vh - 300px)",
      },
    },
  },
  plugins: [],
};
