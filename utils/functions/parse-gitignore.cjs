const fs = require('fs');

function parseGitignore(filePath) {
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

module.exports = parseGitignore;
