import { css } from '@emotion/react';

import { feedbackify } from '~/styles/document/feedbackify.styles';
import { fonts, globalFont } from '~/styles/document/fonts.styles';
import { modal } from '~/styles/document/modal.styles';
import { recaptcha } from '~/styles/document/recaptcha.styles';
import { reducedMotion } from '~/styles/document/reduced-motion.styles';
import { reset } from '~/styles/document/reset.styles';
import { swiperjs } from '~/styles/document/swiper.styles';

export const global = css`
  ${reset}
  ${feedbackify}
  ${fonts}
  ${globalFont}
  ${swiperjs}
  ${recaptcha}
  ${reducedMotion}
  ${modal}
`;
