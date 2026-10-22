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
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12'
        },
        accent: {
          DEFAULT: '#fbbf24',
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309'
        },
        ink: {
          DEFAULT: '#2b1608',
          soft: '#6b4a35'
        },
        whatsapp: {
          DEFAULT: '#25d366',
          dark: '#1ebe5a',
          deep: '#128c7e'
        },
        warm: '#f97316'
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Bricolage Grotesque', 'DM Sans', 'sans-serif']
      },
      boxShadow: {
        glow: '0 18px 50px -12px rgba(249, 115, 22, 0.55)',
        soft: '0 20px 60px -20px rgba(124, 45, 18, 0.25)',
        card: '0 1px 0 rgba(255,255,255,.9) inset, 0 18px 40px -18px rgba(124, 45, 18, 0.28)'
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
