/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        terracotta: {
          50: '#FDF7F4',
          100: '#FBECE6',
          200: '#F6D6C8',
          300: '#EEB7A2',
          400: '#DE8868',
          500: '#C85A32', // Core primary
          600: '#B64923',
          700: '#973A1A',
          800: '#7C3119',
          900: '#672A18',
        },
        sandalwood: {
          50: '#FCF9F2',
          100: '#F8F1E1',
          200: '#F0DEC0',
          300: '#E6C697',
          400: '#E89843', // Warm accent
          500: '#D67D28',
          600: '#B85E1C',
          700: '#944419',
        },
        indigoClay: {
          50: '#F3F5F7',
          100: '#E4E8ED',
          200: '#C8D2DC',
          300: '#9EB0C2',
          400: '#6C87A3',
          500: '#4D6C8C',
          600: '#3A5470',
          700: '#2F435A',
          800: '#283647',
          900: '#1E2A38', // Deep heading & contrast
          950: '#121A24'
        },
        khadi: '#FAF6F0',
        craftGreen: '#2D6A4F',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Rozha One', 'Cinzel', 'Georgia', 'serif'],
        devanagari: ['Noto Sans Devanagari', 'sans-serif']
      },
      boxShadow: {
        'craft': '0 4px 20px -2px rgba(200, 90, 50, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'craft-hover': '0 10px 25px -3px rgba(200, 90, 50, 0.15), 0 4px 10px -2px rgba(0, 0, 0, 0.06)',
        'glow': '0 0 20px rgba(232, 152, 67, 0.35)',
      }
    },
  },
  plugins: [],
}
