/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts}'],
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        aura: '#5B90C8',
        'aura-light': '#9FD7F9',
        'aura-dark': '#1B2B52'
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'sans-serif']
      }
    }
  }
}
