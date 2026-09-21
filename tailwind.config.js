/** @type {import('tailwindcss').Config} */
// Design tokens - 08-REDESIGN-BRIEF $8, 02-PROJECT-KNOWLEDGE $3.
// Brand colours are fixed. Derived tokens approved by Eugene 19 Sep 2026.
// Rules: itred is a button FILL only (never text on dark). itblue is for
// focus rings and non-text UI only. Text links use `link` on light
// surfaces and `link-dark` on itdark bands.
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Montserrat',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      colors: {
        // Brand - unchanged
        itred: '#C70039',
        'itred-hover': '#A30030',
        itblue: '#007BFF',
        itsilver: '#E0E0E0',
        itdark: '#1A1A1A',
        itgray: '#2A2A2A',
        itgray2: '#3A3A3A',

        // Derived - light system
        surface: {
          DEFAULT: '#FFFFFF',
          alt: '#F6F7F9',
        },
        border: '#E3E6EA',
        muted: '#5B6470', // 6.0:1 on white
        link: {
          DEFAULT: '#0062CC', // 5.8:1 on white
          dark: '#4DA3FF', // 6.6:1 on itdark
        },
      },
      fontSize: {
        // [size, lineHeight] - mobile first, *-lg from the lg breakpoint
        small: ['0.875rem', { lineHeight: '1.5' }], // 14px
        body: ['1rem', { lineHeight: '1.6' }], // 16px
        'body-lg': ['1.0625rem', { lineHeight: '1.6' }], // 17px
        h3: ['1.25rem', { lineHeight: '1.35' }], // 20px
        'h3-lg': ['1.375rem', { lineHeight: '1.35' }], // 22px
        h2: ['1.5rem', { lineHeight: '1.25' }], // 24px
        'h2-lg': ['2.125rem', { lineHeight: '1.2' }], // 34px
        h1: ['2rem', { lineHeight: '1.2' }], // 32px
        'h1-lg': ['3.25rem', { lineHeight: '1.1' }], // 52px
      },
      borderRadius: {
        btn: '6px', // buttons and inputs
        card: '10px', // cards
      },
      transitionDuration: {
        DEFAULT: '150ms',
      },
    },
  },
  plugins: [],
};
