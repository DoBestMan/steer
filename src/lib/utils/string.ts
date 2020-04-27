export const randomString = (maxLength?: number): string =>
  Math.random().toString(36).substring(2, maxLength);
