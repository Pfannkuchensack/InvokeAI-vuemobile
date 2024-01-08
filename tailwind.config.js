/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {
			// text-[#ddf50a]
			colors: {
				'yellow': '#ddf50a',
			},
		},
  },
  plugins: [
    '@tailwindcss/forms'
  ],
}

