const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const isGlob = require('is-glob');
const globToRegex = require('glob-to-regexp');
const parseGitignore = require('../functions/parse-gitignore.cjs');

const sourceDir = './';
const outputZip = path.resolve(path.dirname(process.cwd()), 'output.zip');

const gitignore = parseGitignore('.gitignore');

const output = fs.createWriteStream(outputZip);
const archive = archiver('zip', {
  zlib: { level: 9 },
});

archive.pipe(output);

function shouldIgnore(path, gitignorePatterns) {
  return gitignorePatterns.some(pattern => {
    if (isGlob(pattern)) return globToRegex(pattern).test(path);
    return pattern === path;
  });
}

fs.readdirSync(sourceDir, { withFileTypes: true }).forEach(item => {
  const itemPath = `${item.path}${item.name}`;
  if (!shouldIgnore(item.name, gitignore) && item.name !== '.git') {
    console.log(item.name);
    if (item.isFile()) archive.file(itemPath, { name: item.name });
    else if (item.isDirectory()) archive.directory(itemPath, item.name);
  }
});

archive.finalize();

archive.on('end', () => {
  console.log(`Archive "${outputZip}" created successfully.`);
});

archive.on('error', err => {
  console.error('Error creating the archive:', err);
});
