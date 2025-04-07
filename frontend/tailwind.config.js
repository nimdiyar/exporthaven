/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        background: "#F7F7F5",
        primary: "#B5C6B1",
        secondary: "#6f7e21 ",
        accent: "#DDA92E",
        "text-dark": "#333333",
        "text-primary": "#3A3A3A",
        "text-secondary": "#FFFFFF",
      },
      animation: {
        "ping-slow": "ping 3s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
    },
  },
  plugins: [],
};
