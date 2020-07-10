/*
 * Splits diameter/category string at second `-` to get content on either side
 * eg: size: `12-inch-winter-tires`
 * returns {
 *   diameter: '12-inch',
 *   category: 'winter-tires'
 * }
 */
export function getDiameterCategory(size: string | string[]) {
  if (!size || typeof size !== 'string') {
    console.warn('Tire size must be a string');
    return {
      category: '',
      diameter: '',
    };
  }

  const regexArr = size.split(/(\d+-\w+)(-)(.*)/);
  return {
    category: regexArr[3],
    diameter: regexArr[1],
  };
}
