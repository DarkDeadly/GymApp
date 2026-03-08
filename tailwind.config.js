/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*", "./Features/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors : {
        main : {
          yellowGreen : "#A0DB50",
          customGray : "#212121",
          primaryBg : "#141414"
        },
      }
    },
  },
  plugins: [],
}