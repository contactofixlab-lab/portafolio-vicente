/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./web/index.html",
    "./web/src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef4ff',
          100: '#e0eaff',
          200: '#c7d8ff',
          300: '#9bb9ff',
          400: '#6a95ff',
          500: '#2f7bff',
          600: '#4a4bf0',
          700: '#7a2cf0',
          800: '#4b1fb0',
          900: '#1a1250'
        },
        accent: {
          DEFAULT: '#22e5ff',
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490'
        },
        night: {
          DEFAULT: '#080c26',
          700: '#0f1747',
          800: '#0a1030'
        },
        ink: {
          DEFAULT: '#0a1030',
          soft: '#46517a'
        },
        whatsapp: {
          DEFAULT: '#25d366',
          dark: '#1ebe5a',
          deep: '#128c7e'
        },
        warm: '#4a4bf0'
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Bricolage Grotesque', 'DM Sans', 'sans-serif']
      },
      boxShadow: {
        glow: '0 18px 50px -12px rgba(74, 75, 240, 0.6)',
        neon: '0 0 28px rgba(34, 229, 255, 0.55), 0 0 60px rgba(122, 44, 240, 0.35)',
        soft: '0 20px 60px -20px rgba(20, 28, 110, 0.28)',
        card: '0 1px 0 rgba(255,255,255,.9) inset, 0 18px 40px -18px rgba(20, 28, 110, 0.3)'
      },
      animation: {
        'pulse-custom': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        shimmer: 'shimmer 2s infinite',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        morph: 'morph 12s ease-in-out infinite',
        marquee: 'marquee 38s linear infinite',
        'spin-slow': 'spin 24s linear infinite',
        'pulse-ring': 'pulse-ring 2.2s ease-out infinite'
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-16px) rotate(2deg)' }
        },
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' }
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        'pulse-ring': {
          '0%': { transform: 'scale(.8)', opacity: '.7' },
          '100%': { transform: 'scale(2.2)', opacity: '0' }
        }
      }
    }
  },
  plugins: []
}
