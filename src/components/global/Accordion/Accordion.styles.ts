import { css, CSSObject } from '@emotion/core';

import { BORDERS, COLORS, EASING, SPACING, TIME } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: CSSObject = {
  showAll: [
    typography.primarySubhead,
    {
      alignItems: 'center',
      borderTop: BORDERS.SOLID_GRAY_80_1PX,
      color: COLORS.DARK.GRAY_40,
      display: 'flex',
      justifyContent: 'space-between',
      paddingBottom: SPACING.SIZE_20,
      paddingTop: SPACING.SIZE_20,
      transition: `color ${TIME.MS100}ms ${EASING.CIRC_EASE_OUT}`,
      width: '100%',
    },
    css({
      '&:hover, &:focus, &:active': {
        color: COLORS.GLOBAL.WHITE,
      },
    }),
  ],
  showAllIcon: {
    svg: {
      display: 'block',
      height: SPACING.SIZE_05,
      padding: SPACING.SIZE_05,
    },
  },
  itemContainerBorder: {
    borderBottom: BORDERS.SOLID_GRAY_80_1PX,
  },
};

export default styles;
