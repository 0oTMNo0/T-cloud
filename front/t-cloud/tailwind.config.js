/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    './src/**/*.{js,ts,jsx,tsx}',
    "./components/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    fontFamily:{
      IR:'IRANSans',
    },
    extend: {
      colors: {
        myblack: "#232323",
        mywhite: "#fefefe",
        mybackground: "#f3f3f3",
        myprimary: {
          100: '#69369E',
          200: '#7951A8',
        },
      },
    },
  },
  plugins: [
     require('flowbite/plugin')
  ],
}
