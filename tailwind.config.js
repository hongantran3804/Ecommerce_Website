/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        bodyFont: ["Source-Sans-Pro", "sans-serif"],
        headerFont: ["Julius Sans One", "sans-serif"],
      },
      colors: {
        "primary-orange": "#FF5722",
        navBackGroundColor: "hsl(276, 63%, 15%)",
        Green: "#128087",
        Purple: "#23003D",
        LightPurple: "#652C90",
        darkGreen: "hsl(183, 100%, 17%)",
        mediumPurple: "#44285D",
      },
      boxShadow: {
        navBoxShadow: "0.15em 0.15em 0.1em rgba(0, 0, 0, 0.1)",
      },
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
      monitor: "1920px",
    },
    boxShadow: {
      "3xl": "0 35px 60px -15px rgba(0, 0, 0, 60)",
    },
    gridTemplateColumns: {
      OptionCol: "repeat(2,600px)",
      prodCol: "repeat(4,1fr)"
    },
    dropShadow: {
      becomeCustomerHeading: "3px 3px 5px silver",
    },
  },
  plugins: [],
};
