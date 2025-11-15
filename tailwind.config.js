/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        itred: '#C70039',
        itblue: '#007BFF',
        itsilver: '#E0E0E0',
        itdark: '#1A1A1A',
        itgray: '#2A2A2A',
        itgray2: '#3A3A3A',
      },
      backgroundImage: {
        'dark-gradient': 'linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%)',
        'tech-gradient': 'linear-gradient(to bottom, rgba(0, 123, 255, 0.05), rgba(199, 0, 57, 0.02))',
      },
    },
  },
  plugins: [],
};
