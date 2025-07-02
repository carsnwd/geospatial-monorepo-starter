/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'], // Ensure it scans your components
    theme: {
      extend: {
        fontFamily: {
          sans: ['"Roboto"', 'ui-sans-serif', 'system-ui', 'sans-serif']
        }
      }
    }
  };