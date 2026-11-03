// tailwind.config.js
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter Variable"', ...defaultTheme.fontFamily.sans],
        display: ['"Space Grotesk Variable"', '"Inter Variable"', ...defaultTheme.fontFamily.sans],
      },

      colors: {
        // Brand (names per build conventions). DEFAULT keeps bg-itred / text-itblue / shadow-itred/30 working.
        itred: {
          DEFAULT: '#C70039', // filled CTAs (white text = 6.0:1)
          hover: '#A8002F',   // CTA hover (white text = 7.8:1)
          soft: '#FF4D7D',    // red as small text on dark (6.2:1)
        },
        itblue: {
          DEFAULT: '#007BFF', // accents, icons, large text (4.97:1 on ink-950)
          hover: '#0062CC',
          soft: '#4DA3FF',    // link / body-size text on dark (7.5:1)
        },

        // v2 neutrals: blue-tinted darks so the brand blue sits naturally
        ink: {
          950: '#070A12', // page background
          900: '#0B1020', // raised sections
          800: '#111829', // cards
          700: '#1A2236', // borders / inputs
          600: '#263049',
          500: '#36425E',
        },
        fg: {
          DEFAULT: '#E8ECF4', // body text (16.7:1)
          muted: '#A3ADC2',   // secondary text (8.8:1)
          subtle: '#7D889E',  // captions, meta (5.5:1)
        },

        // LEGACY v1: delete once the last v1 page is rebuilt (Phase 5)
        itsilver: '#E0E0E0',
        itdark: '#1A1A1A',
        itgray: '#2A2A2A',
        itgray2: '#3A3A3A',
      },

      fontSize: {
        display: ['clamp(2.5rem, 1.4rem + 4.6vw, 5rem)', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
        h1: ['clamp(2.25rem, 1.5rem + 3vw, 3.75rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        h2: ['clamp(1.75rem, 1.3rem + 1.8vw, 2.75rem)', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        h3: ['clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)', { lineHeight: '1.25', letterSpacing: '-0.015em' }],
        lead: ['clamp(1.0625rem, 1rem + 0.35vw, 1.25rem)', { lineHeight: '1.6' }],
      },

      spacing: {
        section: 'clamp(4rem, 3rem + 4vw, 7.5rem)', // py-section
        header: '4.5rem',                           // matches --header-h
      },

      maxWidth: {
        content: '76rem',
      },

      borderRadius: {
        control: '0.625rem', // buttons, inputs
        card: '1rem',        // cards
        panel: '1.5rem',     // large panels / feature blocks
      },

      boxShadow: {
        'glow-red': '0 0 0 1px rgb(199 0 57 / 0.45), 0 10px 36px -10px rgb(199 0 57 / 0.6)',
        'glow-blue': '0 0 0 1px rgb(0 123 255 / 0.4), 0 10px 36px -10px rgb(0 123 255 / 0.55)',
      },

      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },

      keyframes: {
        'cable-draw': {
          from: { strokeDashoffset: 'var(--cable-length, 1000)' },
          to: { strokeDashoffset: '0' },
        },
        'node-pulse': {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.15)' },
        },
      },
      animation: {
        'cable-draw': 'cable-draw 3.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'node-pulse': 'node-pulse 2.8s ease-in-out infinite',
      },

      zIndex: {
        header: '50',
        overlay: '60',
      },
    },
  },
  plugins: [],
};