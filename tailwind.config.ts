/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary:   '#c8a96e',   // warm gold accent
        dark:      '#0d0d0d',
        dark2:     '#161616',
        dark3:     '#1f1f1f',
        light:     '#f5f5f0',
        muted:     '#888888',
        border:    '#2a2a2a',
      },
      fontFamily: {
        heading: ['var(--font-playfair)', 'Georgia', 'serif'],
        body:    ['var(--font-raleway)', 'Helvetica', 'sans-serif'],
        mono:    ['var(--font-dm-mono)', 'monospace'],
      },
      fontSize: {
        '8xl':  ['6rem',   { lineHeight: '1.05' }],
        '9xl':  ['7.5rem', { lineHeight: '1' }],
        '10xl': ['9rem',   { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
        '144': '36rem',
      },
      maxWidth: {
        '8xl': '90rem',
        '9xl': '100rem',
      },
      letterSpacing: {
        widest2: '0.25em',
        widest3: '0.35em',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-gold':   'linear-gradient(135deg, #c8a96e 0%, #e8c98e 50%, #c8a96e 100%)',
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'circ-out': 'cubic-bezier(0, 0.55, 0.45, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1000': '1000ms',
      },
      animation: {
        'fade-up':        'fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in':        'fadeIn 1s ease both',
        'slide-in-left':  'slideInLeft 0.9s cubic-bezier(0.16,1,0.3,1) both',
        'slide-in-right': 'slideInRight 0.9s cubic-bezier(0.16,1,0.3,1) both',
        'counter':        'counter 2s ease forwards',
        'line-grow':      'lineGrow 1s ease forwards',
        'shimmer':        'shimmer 2s infinite linear',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%':   { opacity: '0', transform: 'translateX(-60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%':   { opacity: '0', transform: 'translateX(60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        lineGrow: {
          '0%':   { width: '0' },
          '100%': { width: '60px' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      screens: {
        xs: '480px',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      gridTemplateColumns: {
        'portfolio': 'repeat(auto-fit, minmax(320px, 1fr))',
      },
    },
  },
  plugins: [],
}