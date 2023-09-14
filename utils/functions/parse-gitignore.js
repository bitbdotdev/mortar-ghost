import fs from 'fs';

/**
 * Parses the contents of a .gitignore file and returns an array of patterns.
 *
 * @param {string} filePath - The path to the .gitignore file to parse.
 * @returns {string[]} An array of patterns from the .gitignore file.
 */
export default function parseGitignore(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');

    const lines = content.split('\n');

    const patterns = lines.filter(line => {
      const trimmedLine = line.trim();
      return trimmedLine !== '' && !trimmedLine.startsWith('#');
    });

    return patterns.map(pattern => pattern.replace(/(\/\r|\r|\\|\/)$/, ''));
  } catch (e) {
    console.error('Error reading .gitignore file:', e);
    return [];
  }
}
