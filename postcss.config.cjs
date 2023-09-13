const getAbsolutePath = require('./utils/functions/get-absolute-path.cjs');

module.exports = ({ env }) => ({
  from: getAbsolutePath('assets/css/main.css'),
  to: getAbsolutePath('assets/build/styles.css'),
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    ...(env === 'build' ? { autoprefixer: {} } : {}),
    ...(env === 'build' ? { cssnano: {} } : {}),
  },
});
