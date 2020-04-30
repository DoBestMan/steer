export function hasNativeLoadingSupport() {
  return (
    process.browser &&
    !!window.HTMLImageElement &&
    'loading' in window.HTMLImageElement.prototype
  );
}
