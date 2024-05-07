/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'blue': '#151F6D',
				'red': '#dc3545',
				'invalid': '#fe0000',
			},
			fontFamily: {
				sans: ['Public Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif' ],
				// serif: ['Roboto Slab'],
			},
			fontSize: {
				'big': 'var(--text-big)',
				'h1': 'var(--h1)',
				'h2': 'var(--h2)',
				'h3': 'var(--h3)',
				'body': 'var(--text-body)',
				'small': 'var(--small)'
			},	
			fontWeight: {
				normal: '400',
				bold: '600',
				extrabold: '700'
			},
			spacing: {
				'0': '0',
				'.5': '.5rem',
				'1': '1rem',
				'1.5': '1.5rem',
				'2': '2rem',
				'2.5': '2.5rem',
				'3': '3rem',
				'3.5': '3.5rem',
				'4': '4rem',
				'4.5': '4.5rem',
				'5': '5rem',
				'5.5': '5.5rem',
				'6': '6rem',
				'6.5': '6.5rem',
				'7': '7rem',
				'7.5': '7.5rem',
				'8': '8rem',
				'8.5': '8.5rem',
				'9': '9rem',
				'9.5': '9.5rem',
				'10': '10rem',
				'10.5': '10.5rem',
				'11': '11rem',
				'11.5': '11.5rem',
				'12': '12rem',
				'12.5': '12.5rem',
				'13': '13rem',
				'13.5': '13.5rem',
				'14': '14rem',
				'14.5': '14.5rem',
				'15': '15rem',
				'15.5': '15.5rem',
				'16': '16rem',
				'16.5': '16.5rem',
				'17': '17rem',
				'17.5': '17.5rem',
				'18': '18rem',
				'18.5': '18.5rem',
				'19': '19rem',
				'19.5': '19.5rem',
				'20': '20rem',
				// Porcentajes
				'10%': '10%',
				'15%': '15%',
				'20%': '20%',
				'25%': '25%',
				'30%': '30%',
				'33%': '33%',
				'35%': '35%',
				'40%': '40%',
				'45%': '45%',
				'50%': '50%',
				'55%': '55%',
				'60%': '60%',
				'65%': '65%',
				'66%': '66%',
				'70%': '70%',
				'75%': '75%',
				'80%': '80%',
				'85%': '85%',
				'90%': '90%',
				'95%': '95%',
				'100%': '100%',
			},
			borderRadius: {
				'none': '0',
				'sm': '.125rem',
				DEFAULT: '.25rem',
				'lg': '.8rem',
				'full': '9999px',
			},
		},
		screens: {
			'xs': '375px',
			'sm': '640px',
			'md': '768px',
			'xg': '992px',
			'xl': '1064px',
			'2xl': '1280px',
			'3xl': '1536px',
			'4xl': '1920px',
			'5xl': '2560px'
		},
		container: {
			screens: {
				DEFAULT: '100%',
			}
		}
	},
	plugins: [
		function ({ addComponents }) {
			addComponents({
			  '.container': {
				'padding-left': 'var(--container-gap)',
				'padding-right': 'var(--container-gap)',
			  }
			})
		  }
	],
}
