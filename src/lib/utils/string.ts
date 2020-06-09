export const randomString = (maxLength?: number): string =>
  `_${Math.random().toString(36).substring(2, maxLength)}`;

export const abbreviateThousand = (value: number): string =>
  value ? `${value.toString().slice(0, -3)}k` : '0';

export const formatDollars = (cents: string): string =>
  (parseInt(cents) / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

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
