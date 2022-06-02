/**
 * Check if an input is either of types null, undefined, array, object, string
 * if input is an array, object or string and it is empty true is returned
 *
 * @param {*} input - the input to be checked
 * @returns {boolean} - true if empty else false
 */
const empty = 0;
export function isEmpty(input: any) {
  if (input === null || input === undefined || input === 'null') {
    return true;
  }

  if (Array.isArray(input) && input.length === empty) {
    return true;
  }

  if (Object.entries(input) && input.length === empty) {
    return true;
  }

  if (isPlainObject(input)) {
    return Object.keys(input).length === empty;
  }

  const notEmptyStringRegex = /^(?:.*(?:\n?))+.+$/m;
  const notEmptyStringMatches = notEmptyStringRegex.exec(input) || null;
  return notEmptyStringMatches === null;
}

/**
 * Check if an input is a real object
 *
 * @param {*} input - the input to be checked
 * @returns {boolean} - true if object is an object else null
 */
function isPlainObject(input: any) {
  return typeof input === 'object' && input !== null;
}
