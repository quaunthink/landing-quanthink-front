/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        qt: {
          bg: "#0A0F1C",
          panel: "#0F1528",
          ink: "#E8ECF8",
          muted: "#A6B1D6",
          primary: "#1C5DDB",
          primary2: "#2A6EF2",
          ring: "#6FA4FF",
        },
      },
      boxShadow: {
        glow: "0 10px 30px rgba(28,93,219,0.35)",
      },
      borderRadius: {
        xxl: "1.25rem",
      },
    },
  },
  plugins: [],
};
