import typographyPlugin from '@tailwindcss/typography';
import borderRadius from './assets/css/tw-presets/border-radius.js';
import colors from './assets/css/tw-presets/colors.js';
import fontFamily from './assets/css/tw-presets/font-family.js';
import fontSize from './assets/css/tw-presets/font-size.js';
import spacing from './assets/css/tw-presets/spacing.js';
import typography from './assets/css/tw-presets/typography.js';

/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: ['./**/*.hbs'],
  darkMode: 'class',
  theme: {
    ...borderRadius.theme,
    ...fontSize.theme,
    ...spacing.theme,
    extend: {
      ...colors.theme,
      ...fontFamily.theme,
      ...typography.theme,
    },
  },
  plugins: [typographyPlugin],
};

export default tailwindConfig;
