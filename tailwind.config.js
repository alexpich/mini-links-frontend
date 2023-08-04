/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        palette: {
          light: "#F5F3FF",
          primary: "#FFB78B",
          dark: "#FF9C5F",
        },
      },
      fontFamily: {
        primary: ["Poppins"],
        secondary: ['"Open Sans"'],
      },
    },
  },
  plugins: [],
};
