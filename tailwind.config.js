import withMT from "@material-tailwind/html/utils/withMT";
const {nextui} = require('@nextui-org/theme');
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default withMT({
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/modal.js",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: "'Lato', sans-serif",
      },
    },
  },
  plugins: [require("daisyui"), nextui(), flowbite.plugin()],
});
