const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "500px",
      ...defaultTheme.screens,
    },

    extend: {
      fontFamily: {
        Courgette: ["Courgette", "cursive"],
      },
      backgroundImage: {
        wave: "url('/Users/poloaguirre/Desktop/The_Odin_Project/Blog/client/src/assets/images/wave-haikei.svg')",
        waveMd:
          "url('/Users/poloaguirre/Desktop/The_Odin_Project/Blog/client/src/assets/images/wave-md.svg')",
        waveSm:
          "url('/Users/poloaguirre/Desktop/The_Odin_Project/Blog/client/src/assets/images/wave-sm.svg')",

        waveMobile:
          "url('/Users/poloaguirre/Desktop/The_Odin_Project/Blog/client/src/assets/images/wave-mobile.svg')",
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/line-clamp")],
};
