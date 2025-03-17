const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#172c3c", // Azul oscuro
        secondary: "#274862", // Azul claro
        fondo: "#995052", // Vino Rosa
        fondo1: "#d96831", // Naranja
        fondo2: "#e6b33d", // Amarillo
        subtitlle: "#f5f5f5", // Blanco
        title: "#333333", // Gris
      },
    },
  },
  plugins: [],
});
