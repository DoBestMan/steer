export function isObjectEqual<T>(a: Record<string, T>, b: Record<string, T>) {
  const aProps = Object.getOwnPropertyNames(a);
  const bProps = Object.getOwnPropertyNames(b);
  if (aProps.length !== bProps.length) {
    return false;
  }

  let hasUnequalProp;
  aProps.forEach((prop) => {
    if (a[prop] !== b[prop]) {
      hasUnequalProp = true;
    }
  });

  if (hasUnequalProp) {
    return false;
  }

  return true;
}
