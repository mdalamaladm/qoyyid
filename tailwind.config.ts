import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './contexts/**/*.{js,ts,jsx,tsx,mdx}',
    './utils/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        qoyyid: {
          main: '#FCFDF2',
          secondary: '#FFE9B1',
          'accent': '#7743DB',
          'dark-accent': '#3B3486',
          error: '#E23645',
          warning: '#EDC25E',
          success: '#84D959',
          black: '#1F242E',
          info: '#3B3486',
          'dark-gray': '#414958',
          'dark-gray-thin': '#414958af',
          gray: '#C8CBD0',
          'light-gray': '#F2F2F3',
        }
      }
    },
  },
  plugins: [],
}
export default config
