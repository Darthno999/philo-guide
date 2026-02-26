/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				dark: {
					50: '#f0f0f5',
					100: '#d9dae3',
					200: '#b3b5c7',
					300: '#8d90ab',
					400: '#676b8f',
					500: '#4a4e73',
					600: '#363a5c',
					700: '#262944',
					800: '#181a2e',
					900: '#0d0e1a',
					950: '#07080f',
				},
				accent: {
					50: '#eef5ff',
					100: '#d9e8ff',
					200: '#bbd8ff',
					300: '#8bc1ff',
					400: '#54a0ff',
					500: '#2d7cf7',
					600: '#1760ec',
					700: '#104ad9',
					800: '#133db0',
					900: '#15378b',
					950: '#122354',
				},
				success: {
					400: '#4ade80',
					500: '#22c55e',
					600: '#16a34a',
				},
				warning: {
					400: '#facc15',
					500: '#eab308',
					600: '#ca8a04',
				},
				danger: {
					400: '#f87171',
					500: '#ef4444',
					600: '#dc2626',
				},
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
				mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
			},
			animation: {
				'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'fade-in': 'fadeIn 0.5s ease-out',
				'slide-up': 'slideUp 0.4s ease-out',
				'slide-in-left': 'slideInLeft 0.3s ease-out',
				'count': 'count 0.3s ease-out',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				slideUp: {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				slideInLeft: {
					'0%': { opacity: '0', transform: 'translateX(-20px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' },
				},
				count: {
					'0%': { transform: 'scale(1.2)', opacity: '0.7' },
					'100%': { transform: 'scale(1)', opacity: '1' },
				},
			},
		},
	},
	plugins: [],
}
