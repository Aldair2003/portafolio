/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Modo oscuro basado en clase 'dark' en html
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#232222',
        'dark-bg-light': '#2a2a2a',
      },
    },
  },
  plugins: [],
};

