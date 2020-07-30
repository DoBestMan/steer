import format from 'date-fns/format';

export function getCurrentYear() {
  return new Date().getFullYear();
}

export function formatOrNull(
  value: string | number | Date,
  template = 'EEEE, MMMM d',
) {
  try {
    return format(new Date(value), template);
  } catch (e) {
    return null;
  }
}

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
