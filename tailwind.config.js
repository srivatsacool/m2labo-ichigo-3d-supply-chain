/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ichigo: {
          backdrop: '#0A1C2E',
          navy: '#102A43',
          secondary: '#173B57',
          cyan: '#42C7E8',
          lightCyan: '#A9E8F5',
          offWhite: '#F4F7F8',
          grey: '#8C9BA5',
          amber: '#E9A23B',
          red: '#D9534F',
          green: '#3CA77A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
};
