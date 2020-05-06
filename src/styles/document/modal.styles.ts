import { css } from '@emotion/core';

// locks body scroll when modal is open
export const disableBodyScroll = css({
  '.ReactModal__Body--open': {
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
});
