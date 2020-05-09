export function isBrowser() {
  return process.browser;
}

export function hasNativeLoadingSupport() {
  return (
    isBrowser() &&
    !!window.HTMLImageElement &&
    'loading' in window.HTMLImageElement.prototype
  );
}
