/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        velvet: {
          black: "#0f0f0f",
          gold: "#c8a96b",
          beige: "#e7ddcf",
          cream: "#f8f5f0",
          stone: "#8d8a85",
        },
      },
      boxShadow: {
        soft: "0 10px 30px rgba(15,15,15,0.08)",
        premium: "0 20px 50px rgba(15,15,15,0.12)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #c8a96b 0%, #e7ddcf 100%)",
      },
    },
  },
  plugins: [],
};