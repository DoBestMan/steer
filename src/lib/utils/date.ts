import format from 'date-fns/format';

export const defaultDateTemplate = 'EEEE, MMMM d';

export function getCurrentYear() {
  return new Date().getFullYear();
}

/**
 * Returns a formatted date if a valid one is passed
 * or null if the value passed isn't a valid date
 *
 * @param {string |  number | Date} value - The date value
 * @param {string} template - The formatting template for the returned date
 */
export function formatOrNull(
  value: string | number | Date,
  template = defaultDateTemplate,
) {
  try {
    return format(new Date(value), template);
  } catch (e) {
    return null;
  }
}

/**
 * Returns true if date passed is in the `MM/d/yyyy` format and false
 * if not or if that param is null.
 *
 * @param {string | null} data - The date
 */
export function isValidPurchaseDate(date: string | null): boolean {
  if (date) {
    const d = new Date(date);
    const [month, day, year] = date.split('/');
    const formattedMonth = parseInt(month);
    const formattedDay = parseInt(day);
    const formattedYear = parseInt(year);

    // need to reduce month value by 1 to accommodate new Date formats for month
    const zeroIndexMonth = formattedMonth - 1;

    const isValidMonth = d.getMonth() === zeroIndexMonth && month.length === 2;
    const isValidDay = d.getDate() === formattedDay && day.length === 2;
    const isValidYear = d.getFullYear() === formattedYear && year.length === 4;

    if (isValidMonth && isValidDay && isValidYear) {
      return true;
    }
  }
  return false;
}
