import format from 'date-fns/format';

export function getCurrentYear() {
  return new Date().getFullYear();
}

export function formatOrNull(
  value: string | number | Date,
  template = 'EEEE MMMM d',
) {
  try {
    return format(new Date(value), template);
  } catch (e) {
    return null;
  }
}
