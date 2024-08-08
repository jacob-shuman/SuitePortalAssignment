import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				inter: ['Inter']
			},
			colors: {
				primary: '#459798',
				secondary: '#214599'
			}
		}
	},
	plugins: []
} as Config;
