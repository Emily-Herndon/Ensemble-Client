/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}", 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
	darkMode: 'class',
	theme: {
		screens: {
      	'sm': '640px',
      	'md': '768px',
		'lg': '1024px',
    },
		extend: {
			fontFamily: {
        	'press-start': ['"Press Start 2P"', 'cursive'],
      },
		},
	},
	plugins: [
        require('flowbite/plugin')
    ]
}
