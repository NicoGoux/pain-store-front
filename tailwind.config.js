/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{js,jsx}'],
	theme: {
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			'background-color': '#0f0f0f',
			'card-background-color': '#1a1a1a',
			'primary-button-bg-color': '#f7931e',
			'secondary-button-bg-color': '#1a1a1a',
			'border-color': '#f7931e',
			'primary-font-color': '#ffffff',
			'secondary-font-color': '#f7931e',
			'primary-button-font-color': '#1a1a1a',
			'secondary-button-font-color': '#f7931e',
			'primary-input-color': '#1a1a1a',
			'primary-input-font-color': '#ffffff',
			'secondary-input-color': '#f7931e',
			'secondary-input-font-color': '#1a1a1a',
			'error-label-color': '#e2504c',
		},
		screens: {
			xsm: '500px',

			sm: '750px',
			// => @media (min-width: 640px) { ... }

			md: '875px',
			// => @media (min-width: 768px) { ... }

			lg: '1024px',
			// => @media (min-width: 1024px) { ... }

			xl: '1280px',
			// => @media (min-width: 1280px) { ... }

			'2xl': '1536px',
			// => @media (min-width: 1536px) { ... }
		},
		extend: {},
	},
	plugins: [],
};
