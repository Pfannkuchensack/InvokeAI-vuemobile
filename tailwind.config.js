/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    '@tailwindcss/forms'
  ],
}

