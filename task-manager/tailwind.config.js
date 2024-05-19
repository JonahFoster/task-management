const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');

const capitalizeFirst = plugin(function ({ addUtilities }) {
  const newUtilities = {
    ".capitalize-first:first-letter": {
      textTransform: "uppercase",
    },
  };
  addUtilities(newUtilities, ["responsive", "hover"]);
});

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      slate: colors.slate,
      blue: colors.blue,
      indigo: colors.indigo,
      black: colors.black,
      white: colors.white,
      gray: {
        DEFAULT: '#2B2C37',
        light: '#3E3F4E',
        muted: '#828FA3',
        lightest: '#E4EBFA',
        ...colors.slate,
      },
      green: colors.green,
      purple: {
        DEFAULT: '#635FC7',
        light: '#A8A4FF',
        ...colors.violet,
      },
      yellow: colors.amber,
      pink: colors.fuchsia,
      red: {
        DEFAULT: '#EA5555',
        light: '#FF9898',
        ...colors.red,
      },
      rose: colors.rose,
      amber: colors.amber,
      emerald: colors.emerald,
      darkBlue: '#000112',
      darkGray: '#20212C',
      offWhite: '#F4F7FD',
    },
    extend: {
      boxShadow: {
        table: "0px 4px 14px 0px rgba(0,0,0,0.06)",
        DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px 0 rgba(0, 0, 0, 0.02)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.02)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.01)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.01)",
        button: " 0px 4px 14px 0px rgba(0,0,0,0.06)",
      },
      outline: {
        blue: "2px solid rgba(0, 112, 244, 0.5)",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        urbanist: ["Urbanist", "sans-serif"],
        plusJakarta: ["'Plus Jakarta Sans'", "sans-serif"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.5" }],
        sm: ["0.875rem", { lineHeight: "1.5715" }],
        base: ["1rem", { lineHeight: "1.5", letterSpacing: "-0.01em" }],
        lg: ["1.125rem", { lineHeight: "1.5", letterSpacing: "-0.01em" }],
        xl: ["1.25rem", { lineHeight: "1.5", letterSpacing: "-0.01em" }],
        "2xl": ["1.5rem", { lineHeight: "1.33", letterSpacing: "-0.01em" }],
        "3xl": ["1.88rem", { lineHeight: "1.33", letterSpacing: "-0.01em" }],
        "4xl": ["2.25rem", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
        "5xl": ["3rem", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
        "6xl": ["3.75rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        h1: ["24px", { lineHeight: "30px", fontWeight: "bold" }],
        h2: ["18px", { lineHeight: "23px", fontWeight: "bold" }],
        h3: ["15px", { lineHeight: "19px", fontWeight: "bold" }],
        h4: ["12px", { lineHeight: "15px", fontWeight: "bold", letterSpacing: "2.4px" }],
        p: ["13px", { lineHeight: "23px", fontWeight: "500" }],
        boldText: ["12px", { lineHeight: "15px", fontWeight: "bold" }],
      },
      screens: {
        xs: "480px",
      },
      borderWidth: {
        3: "3px",
      },
      minWidth: {
        36: "9rem",
        44: "11rem",
        56: "14rem",
        60: "15rem",
        72: "18rem",
        80: "20rem",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
      zIndex: {
        60: "60",
      },
    },
  },
  plugins: [
    capitalizeFirst,
  ],
};
