/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat, sans-serif"],
      },

      keyframes: {
        icon: {
          "0%": {
            width: "0px",
            fontSize: "0px",
            paddingLeft: "0px",
            paddingRight: "0px",
          },
          "49%": { width: "100%" },
          "100%": {
            width: "100%",
            fontSize: "clamp(.8rem, 2.3vw, 1.5rem)",
            paddingLeft: "32px",
            paddingRight: "32px",
          },
        },
        iconOut: {
          "0%": {
            width: "100%",
            fontSize: "clamp(.8rem, 2.3vw, 1.5rem)",
            paddingLeft: "32px",
            paddingRight: "32px",
          },
          "49%": { width: "100%" },
          "100%": {
            width: "0px",
            fontSize: "0px",
            paddingLeft: "0px",
            paddingRight: "0px",
          },
        },
      },
      animation: {
        icon: "icon 300ms ease-in-out both",
        iconOut: "iconOut 300ms ease-in-out both",
      },
      colors: {
        palette: "#EDE0D4",
        "palette-2": "#E6CCB2",
        "palette-3": "#DDB892",
        "palette-4": "#7F5539",
        "palette-5": "#9C6644",
        calendar: "#523726",
      },
      boxShadow: {
        shadow: "0px 5px 15px 0px rgba(0,0,0,.35)",
        card: "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;",
      },
      fontSize: {
        dynamicTitle:
          "clamp(1.953rem, calc(1.953rem + ((1vw - 0.2rem) * 0.488)), 2.441rem);",
        dynamicTitle2:
          "clamp(2.441rem, calc(2.441rem + ((1vw - 0.2rem) * 0.611)), 3.052rem);",
        dynamicTitle3:
          "clamp(1.563rem, calc(1.563rem + ((1vw - 0.2rem) * 0.39)), 1.953rem);",
        dynamicDesc:
          "clamp(1.25rem, calc(1.25rem + ((1vw - 0.2rem) * 0.313)), 1.563rem);",
        dynamicLogo:
          "clamp(1.563rem, calc(1.563rem + ((1vw - 0.2rem) * 0.39)), 1.953rem);",
        dynamicBtn:
          "clamp(1.25rem, calc(1.25rem + ((1vw - 0.2rem) * 0.313)), 1.563rem);",
        dynamicList:
          "clamp(1rem, calc(1rem + ((1vw - 0.2rem) * 0.25)), 1.25rem);",
        dynamicMedium:
          "clamp(0.8rem, calc(0.8rem + ((1vw - 0.2rem) * 0.2)), 1rem);",
        dynamicSmall:
          "clamp(0.64rem, calc(0.64rem + ((1vw - 0.2rem) * 0.16)), 0.8rem);",
        dynamicFormInput:
          "clamp(1rem, calc(1rem + ((1vw - 0.2rem) * 0.25)), 1.25rem);",
        dynamicFormLabel:
          "clamp(1.25rem, calc(1.25rem + ((1vw - 0.2rem) * 0.313)), 1.563rem);",
        dynamicHelperText:
          "clamp(0.8rem, calc(0.8rem + ((1vw - 0.2rem) * 0.2)), 1rem);",
        dynamicErrorMessage:
          "clamp(0.8rem, calc(0.8rem + ((1vw - 0.2rem) * 0.2)), 1rem);",
      },
      screens: {
        mobile: "768px",
        tablet: "992px",
        nav: "1200px",
        laptop: "1366px",
        desktop: "1920px",
        tall: { raw: "(max-height: 650px)" },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
