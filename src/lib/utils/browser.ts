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

export function hasIntersectionObserver() {
  return (
    isBrowser() &&
    !!window.IntersectionObserver &&
    !!window.IntersectionObserverEntry &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype
  );
}
