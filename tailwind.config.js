/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blueprint: {
          deep: '#0B1F33',
          base: '#102A43',
          navy: '#12334D',
          panel: '#173B57',
          cyan: '#42C7E8',
          line: '#27B7D8',
          electric: '#1D9BF0',
          white: '#F5FAFC',
          pale: '#EAF5F8',
          muted: '#9BB4C5',
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
