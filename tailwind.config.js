/** @type {import('tailwindcss').Config} */
// tailwind.config.js

module.exports = {
  //by adding paths to this part of the config file, we're letting Tailwind know that we'll use its classes in each of these places
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./slices/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }