/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./app.jsx", "./mbe-unified.js"],
  // Preserve the Play CDN's effective default theme. The old pre-CDN
  // `tailwind` assignment was overwritten when the CDN initialized.
  theme: {
    extend: {},
  },
  plugins: [],
};
