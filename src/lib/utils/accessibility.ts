/**
 * Fixes issue with tabbed browsing through forms where the user focus can
 * get lost behind the floating buttons.
 */
export const isInViewingArea = (
  clientRect: ClientRect | DOMRect,
  clearance: { bottom: number; top: number },
) => {
  const viewingAreaBottom = window.innerHeight - clearance.bottom;
  const viewingAreaTop = clearance.top;
  return (
    clientRect.bottom > viewingAreaBottom || clientRect.top < viewingAreaTop
  );
};

export const scrollIntoViewIfNeeded = (
  el: HTMLElement,
  clearance = { top: 0, bottom: 0 },
) => {
  if (isInViewingArea(el.getBoundingClientRect(), clearance)) {
    el.scrollIntoView({ block: 'center' });
  }
};
