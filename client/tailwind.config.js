/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}', "../packages/ui/src/**/*.{ts,tsx}",
    "../packages/ui/dist/**/*.{js,ts,jsx,tsx,css}",],
    theme: {
      extend: {
        fontFamily: {
          sans: ['"Roboto"', 'ui-sans-serif', 'system-ui', 'sans-serif']
        }
      }
    }
  };