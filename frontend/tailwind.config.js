/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			borderRadius: {
				"r5": "5px"
			},
			colors: {
				dark: "#434343",
				vio: "#afa6b7",
				dvio: "#9C90A8",
				ind: "#6c40d9",
				gl: "#F3F3F3",
			},
			fontSize: {
				"12": "12px",
				"14": "14px",
				"15": "15px",
				"20": "20px",
				"25": "25px",
				"30": "30px",
				"35": "35px",
				"40": "40px"
			},
		},
	},
	plugins: [],
}