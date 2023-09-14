import fs from 'fs/promises'; // Import the fs.promises module
import chokidar from 'chokidar';
import postcss from 'postcss';
import postcssrc from 'postcss-load-config';
import tailwindConfig from '../../tailwind.config.js';

/**
 * @type {import("postcss-load-config").ConfigContext}
 */
const ctx = {
  parser: true,
  map: 'inline',
  env: process.env.NODE_ENV,
};

async function compileCSS() {
  const start = performance.now();
  try {
    const { plugins, options } = await postcssrc(ctx); // Use async/await
    const css = await fs.readFile(options.from, 'utf8'); // Use fs.promises
    const result = await postcss(plugins).process(css, options); // Use async/await
    await fs.writeFile(options.to, result.css, 'utf8'); // Use fs.promises
    const end = performance.now();
    const duration = (end - start).toFixed(2);
    console.log(`CSS compiled in ${duration} ms\n`);
  } catch (e) {
    console.error(e);
  }
}

// Check if the "--watch" or "-w" flag is provided
const watchFlagIndex = process.argv.findIndex(
  arg => arg === '--watch' || arg === '-w'
);
const isWatchMode = watchFlagIndex !== -1;

if (isWatchMode) {
  if (ctx.env === 'production') {
    console.error('WARNING: File watcher cannot run in production mode.');
    process.exit(1);
  }

  compileCSS();
  const watcher = chokidar.watch([
    ...tailwindConfig.content,
    './tailwind.config.cjs',
    './assets/css/**/*.{css,js,cjs}',
  ]);
  watcher.on('change', () => {
    console.log('File change detected. Recompiling CSS...\n');
    compileCSS();
  });
} else {
  compileCSS();
}
