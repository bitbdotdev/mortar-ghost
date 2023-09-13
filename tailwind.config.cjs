const borderRadius = require('./assets/css/tw-presets/border-radius.cjs').theme,
  colors = require('./assets/css/tw-presets/colors.cjs').theme,
  fontFamily = require('./assets/css/tw-presets/font-family.cjs').theme,
  fontSize = require('./assets/css/tw-presets/font-size.cjs').theme,
  spacing = require('./assets/css/tw-presets/spacing.cjs').theme,
  typography = require('./assets/css/tw-presets/typography.cjs').theme;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.hbs'],
  darkMode: 'class',
  theme: {
    ...borderRadius,
    ...fontSize,
    ...spacing,
    extend: {
      ...colors,
      ...fontFamily,
      ...typography,
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
