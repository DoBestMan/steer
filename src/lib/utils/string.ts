export const randomString = (maxLength?: number): string =>
  `_${Math.random().toString(36).substring(2, maxLength)}`;

export const abbreviateThousand = (value: number): string =>
  value ? `${value.toString().slice(0, -3)}k` : '0';

export const formatDollars = (cents: string | number): string => {
  const finalCents = typeof cents === 'string' ? parseInt(cents) : cents;
  return (finalCents / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const ordinalSuffixOf = (i: number): string => {
  const j = i % 10;
  const k = i % 100;

  if (j === 1 && k !== 11) {
    return i + 'st';
  }
  if (j === 2 && k !== 12) {
    return i + 'nd';
  }
  if (j === 3 && k !== 13) {
    return i + 'rd';
  }
  return i + 'th';
};

export const truncateText = (
  str: string,
  length: number,
  ending = '',
): string => {
  if (str.length > length) {
    return str.substring(0, length - ending.length).trim() + ending;
  }
  return str;
};

export const numbersOnly = (text: string): string =>
  text.match(/\d+/g)?.join('') || '';
