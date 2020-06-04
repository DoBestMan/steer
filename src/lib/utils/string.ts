export const randomString = (maxLength?: number): string =>
  `_${Math.random().toString(36).substring(2, maxLength)}`;

export const abbreviateThousand = (value: number): string =>
  value ? `${value.toString().slice(0, -3)}k` : '0';
