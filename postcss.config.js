import getAbsolutePath from './utils/functions/get-absolute-path.js';

export default ({ env }) => ({
  from: getAbsolutePath('assets/css/main.css'),
  to: getAbsolutePath('assets/build/styles.css'),
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    ...(env === 'build' ? { autoprefixer: {} } : {}),
    ...(env === 'build' ? { cssnano: {} } : {}),
  },
});
