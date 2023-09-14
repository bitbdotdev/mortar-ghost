import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import isGlob from 'is-glob';
import globToRegex from 'glob-to-regexp';
import parseGitignore from '../functions/parse-gitignore.js';

const sourceDir = './';
const outputZip = path.resolve(path.dirname(process.cwd()), 'output.zip');

const gitignore = parseGitignore('.gitignore');

const output = fs.createWriteStream(outputZip);
const archive = archiver('zip', {
  zlib: { level: 9 },
});

archive.pipe(output);

function shouldIgnore(filePath, gitignorePatterns) {
  return gitignorePatterns.some(pattern => {
    if (isGlob(pattern)) return globToRegex(pattern).test(filePath);
    return pattern === filePath;
  });
}

fs.readdirSync(sourceDir, { withFileTypes: true }).forEach(item => {
  const itemPath = path.join(sourceDir, item.name);
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
