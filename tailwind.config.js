const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
const typography = require('tailwindcss/typography')

module.exports = {
  mode: 'jit',
  purge: ['./components/**/*.js', './pages/**/*.js'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        gray: colors.coolGray,
        // one dark colors
        code: {
          black: '#282c34',
          white: '#abb2bf',
          gray: '#7f848e',
          yellow: '#e5c07b',
          orange: '#d19a66',
          red: '#e06c75',
          purple: '#c678dd',
          blue: '#61afef',
          cyan: '#56b6c2',
          green: '#98c379',
          selection: 'rgba(148, 170, 209, 0.2)',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.600'),
            '& h2': {
              color: theme('colors.gray.700'),
            },
            '& code': {
              color: theme('colors.code.white'),
              backgroundColor: theme('colors.code.black'),
              padding: '0.125rem 0.5rem',
              margin: '0 0.25rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
              display: 'inline-block',
            },
            '& code::before': {
              content: '""',
            },
            '& code::after': {
              content: '""',
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
}
