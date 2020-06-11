import { css } from '@emotion/core';

import { fonts, globalFont } from '~/styles/document/fonts.styles';
import { modal } from '~/styles/document/modal.styles';
import { reset } from '~/styles/document/reset.styles';
import { swiperjs } from '~/styles/document/swiper.styles';

export const global = css`
  ${reset}
  ${fonts}
  ${globalFont}
  ${swiperjs}
  ${modal}
`;
