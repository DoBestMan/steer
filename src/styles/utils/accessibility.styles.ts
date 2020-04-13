import { css } from '@emotion/core';

export const screenReaderText = css({
  clip: 'rect(1px, 1px, 1px, 1px)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: 1,
});
