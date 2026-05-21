/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts}'],
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        aura: '#4A7CC7',
        'aura-light': '#90B8E8',
        'aura-dark': '#0C1A4A'
      },
      fontFamily: {
        serif: ['Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['DM Sans', 'sans-serif']
      }
    }
  }
}
