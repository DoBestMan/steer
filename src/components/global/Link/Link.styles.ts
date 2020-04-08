import { css } from '@emotion/core';

export const link = css({
  '&:hover,&:focus': { borderColor: 'inherit' },
  borderBottom: '2px dotted transparent',
  paddingBottom: '2',
  transition: 'border-color 100ms ease',
});
