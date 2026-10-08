/** @type {import('tailwindcss').Config} */
/**
 * Laviedge logo identity — sampled from the official LD mark.
 * Towers  #0B3D91 → #1147A8  navy / royal
 * D curve #3AA0D8 → #5BB8E8  cyan highlight
 * Ribbon  #C9A227 / #D4B44A  gold wordmark
 * Paper   #FFFFFF
 * Life    #1A6B3C            tagline only
 * 60% paper / 25% navy-cyan / 10% gold / 5% life green
 * `forest` remains the blue-surface token name used across the site.
 */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#071833',
          900: '#0B3D91',
          800: '#0E3F96',
          700: '#1147A8',
          600: '#1E6EC4',
          500: '#2A88C8',
          400: '#3AA0D8',
        },
        ivory: {
          50: '#FFFFFF',
          100: '#F5F9FC',
          200: '#E8F1F8',
          300: '#D2E0EC',
          400: '#B4C5D4',
        },
        gold: {
          200: '#F0E3B8',
          300: '#E8D48A',
          400: '#D4B44A',
          500: '#C9A227',
          600: '#A67C1A',
          700: '#7A5C14',
        },
        life: {
          800: '#124830',
          700: '#1A6B3C',
          600: '#1E7A48',
          500: '#2A8A56',
          400: '#3D9B6A',
        },
        charcoal: {
          900: '#0A1628',
          800: '#1A2438',
          700: '#2A3448',
          600: '#3D4A5C',
          400: '#6B7584',
          300: '#8A929C',
          200: '#C5CAD1',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        brand: ['Outfit', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        brand: '0.2em',
        luxury: '0.14em',
        label: '0.1em',
      },
      boxShadow: {
        glass: '0 12px 40px rgba(11, 61, 145, 0.18)',
        gold: '0 10px 28px rgba(201, 162, 39, 0.2)',
        card: '0 8px 28px rgba(11, 61, 145, 0.08)',
        glow: '0 0 48px rgba(58, 160, 216, 0.28)',
      },
      backgroundImage: {
        'hero-veil':
          'linear-gradient(180deg, rgba(11,61,145,0.38) 0%, rgba(7,24,51,0.55) 48%, rgba(7,24,51,0.86) 100%)',
        mark:
          'linear-gradient(135deg, #0B3D91 0%, #1147A8 32%, #1E6EC4 58%, #3AA0D8 82%, #6EC8EC 100%)',
        'gold-sheen':
          'linear-gradient(135deg, #A67C1A 0%, #C9A227 42%, #E8D48A 58%, #D4B44A 100%)',
      },
      transitionTimingFunction: {
        luxe: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
