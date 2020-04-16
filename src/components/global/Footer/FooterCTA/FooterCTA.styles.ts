import { css } from '@emotion/core';

import { typography } from '~/styles/global/typography.styles';
import { backgroundColors, colors } from '~/styles/global/colors.styles';

import { RADIUS } from '~/lib/constants/radius';
import { SPACING } from '~/lib/constants/spacing';

const CONSTANTS = {
  OPACITY_ACTIVE: 0.8,
  OPACITY_DISABLED: 0.4,
  SIZE: 50,
};

const styles = {
  circle: [
    backgroundColors.GLOBAL.ORANGE,
    colors.GLOBAL.WHITE,
    css({
      alignItems: 'center',
      borderRadius: RADIUS.CIRCLE,
      display: 'flex',
      height: CONSTANTS.SIZE,
      justifyContent: 'center',
      width: CONSTANTS.SIZE,
    }),
  ],

  cta: css({
    '&:hover span, &:focus span': { borderColor: 'inherit' },

    // eslint-disable-next-line sort-keys
    '&:active': { opacity: CONSTANTS.OPACITY_ACTIVE },

    '&:active span, &:disabled span': { borderColor: 'transparent' },

    '&:disabled': { opacity: CONSTANTS.OPACITY_DISABLED },

    alignItems: 'center',
    display: 'inline-flex',
  }),

  text: [
    typography.tertiaryHeadline,
    css({
      borderBottom: '2px dotted transparent',
      marginLeft: SPACING.SIZE_15,
    }),
  ],
};

export default styles;
