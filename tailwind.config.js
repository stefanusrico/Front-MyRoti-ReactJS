/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "2rem",
      },

      colors: {
        krem: "#FCE192",
        coklat: "#E8B266",
        "coklat-kuning": "#CF9647",
        "light-green": "#22c55e",
        "Sienna": "#CD8A40",
        "Raw-sienna": "#CD8A39",
      },
    },
  },
  plugins: [],
}
