/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        bgSoft: 'var(--bgSoft)',
        accent: 'var(--accent)',
        'accent-2': 'var(--accent-2)',
        text: 'var(--text)',
        textSoft: 'var(--textSoft)',
        muted: 'var(--muted)',
        primary: 'var(--accent)', // Map primary to accent for backward compatibility
      },
      fontFamily: {
        body: ['var(--font-body)', 'sans-serif'],
        heading: ['var(--font-heading)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
