/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'speed-fondo': '#00000',
        'speed-superficie-1': '#303038',
        'speed-superficie-2': '#383840',
        'speed-acento': '#ffd93d',
        'speed-texto': '#faf8f5',
      },
      backgroundImage: {
        'glow-background': "radial-gradient(ellipse 50% 70% at 25% 25%, var(--color-speed-acento-glow), transparent 80%), radial-gradient(ellipse 50% 70% at 75% 75%, var(--color-speed-acento-glow), transparent 80%)",
      }
    },
  },
  plugins: [],
}
