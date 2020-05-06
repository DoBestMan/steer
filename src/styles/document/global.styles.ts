import { css } from '@emotion/core';

import { fonts } from '~/styles/document/fonts.styles';
import { reset } from '~/styles/document/reset.styles';

import { disableBodyScroll } from './modal.styles';

export const global = css`
  ${reset}
  ${fonts}
  ${disableBodyScroll}
`;
