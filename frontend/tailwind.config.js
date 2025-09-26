/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Semua file React
    "../backend/resources/views/**/*.blade.php", // Jika ada blade
    "../backend/resources/js/**/*.{js,jsx,ts,tsx}", // Kalau backend juga punya React/Vue
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
