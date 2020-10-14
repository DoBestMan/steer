import { PRODUCT_GRID_ITEM_HASH } from '~/lib/constants/product';
import { isBrowser } from '~/lib/utils/browser';
import { removeHashInString } from '~/lib/utils/string';

export function removeScrollIdHashInUrl() {
  window.history.pushState(
    '',
    '',
    `${window.location.pathname}${window.location.search}`,
  );
}

export function addHashForScroll(hashStr: string) {
  window.location.hash = hashStr;
}

export function scrollToId(scrollToGrid: () => void, hasResults: boolean) {
  if (!window || !isBrowser()) {
    return;
  }

  const hashString = removeHashInString(window.location.hash);
  const productDivElm = document.querySelector(
    `[data-scroll-id="${hashString}"]`,
  );
  const scrollToPreviousSection = productDivElm
    ? () => {
        const elmYposition = productDivElm.getBoundingClientRect().y;
        window.scroll({
          top: elmYposition - 150,
          behavior: 'smooth',
        });

        removeScrollIdHashInUrl();
      }
    : () => {
        if (hashString === PRODUCT_GRID_ITEM_HASH && hasResults) {
          scrollToGrid();
          removeScrollIdHashInUrl();
        }
      };

  scrollToPreviousSection();
}
