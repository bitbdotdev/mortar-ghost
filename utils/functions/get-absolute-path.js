import { resolve } from 'path';

/**
 * Function to get an absolute path from the input.
 * The input must be a path relative to the project root.
 *
 * @param {string} path - The path value relative to the project root.
 * @returns {string} - The absolute path value for the input path.
 */
function getAbsolutePath(path) {
  return resolve(process.cwd(), path);
}

export default getAbsolutePath;
