export function omit<T>(
  object: Record<string, T>,
  keys: string[],
): Record<string, T> {
  return Object.keys(object)
    .filter((key) => !keys.includes(key))
    .reduce((acc, key) => ({ ...acc, [key]: object[key] }), {});
}
