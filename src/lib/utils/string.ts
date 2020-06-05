export const randomString = (maxLength?: number): string =>
  `_${Math.random().toString(36).substring(2, maxLength)}`;

export const abbreviateThousand = (value: number): string =>
  value ? `${value.toString().slice(0, -3)}k` : '0';

export const formatDollars = (cents: string, isRounded = false): string =>
  (parseInt(cents) / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: isRounded ? 0 : 2,
    minimumFractionDigits: isRounded ? 0 : 2,
  });
