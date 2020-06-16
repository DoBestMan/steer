import { css, CSSObject } from '@emotion/core';

export const disableGlobalFocus = {
  '&:focus': {
    outline: 'none',
  },
};

export const hideScrollbar: CSSObject = {
  '::-webkit-scrollbar': {
    height: 0,
    opacity: 0,
    width: 0,
  },
  scrollbarWidth: 'none', // firefox
  msOverflowStyle: '-ms-autohiding-scrollbar',
};

export const screenReaderText = css({
  clip: 'rect(1px, 1px, 1px, 1px)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: 1,
});
