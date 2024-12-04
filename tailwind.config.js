/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          a0: '#3902e9',
          a20: '#5f2ded',
          a40: '#7b49f0',
          a60: '#9263f3',
          a80: '#a77df6',
          a100: '#bb96f9',
        },
        surface: {
          a0: '#121212',
          a20: '#282828',
          a40: '#3f3f3f',
          a60: '#575757',
          a80: '#717171',
          a100: '#8b8b8b',
        },
        mixed: {
          a0: '#1b1425',
          a20: '#30293a',
          a40: '#47404f',
          a60: '#5e5866',
          a80: '#77727e',
          a100: '#918c96',
        },
      },
    },
  },
  plugins: [],
}