module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.15)',
      }
    },
  },
  variants: {
    extend: {
      boxShadow: ['active'],
      transitionProperty: ['active', 'hover'],
    },
  },
  plugins: [],
}
