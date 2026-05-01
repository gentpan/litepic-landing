/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Matches the LitePic admin primary color (--primary: #0052D9).
        // Keeping landing + admin on the same brand color so users see
        // a coherent product identity across litepic.io and the
        // self-hosted dashboard.
        brand: {
          DEFAULT: '#0052D9',
          hover: '#003DA6',
          soft: '#E6EEFB',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'PingFang SC', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'SF Mono', 'Menlo', 'monospace'],
      },
      borderRadius: {
        // Square corners across the site, matching the admin's
        // current visual direction.
        DEFAULT: '0',
        sm: '0',
        md: '0',
        lg: '0',
        xl: '0',
        '2xl': '0',
        full: '9999px',
      },
    },
  },
  plugins: [],
};
