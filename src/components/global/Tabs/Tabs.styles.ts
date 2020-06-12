import { css, CSSObject } from '@emotion/core';

import { COLORS, EASING, SPACING, TIME } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: CSSObject = {
  tabButton: [
    typography.primarySubhead,
    {
      color: COLORS.DARK.GRAY_40,
      marginRight: SPACING.SIZE_30,
      paddingBottom: SPACING.SIZE_10,
      paddingTop: SPACING.SIZE_10,
      position: 'relative',
      transition: `color ${TIME.MS100}ms ${EASING.CIRC_EASE_OUT}`,
    },
    css({
      '&:after': {
        backgroundColor: COLORS.GLOBAL.WHITE,
        borderRadius: '1px',
        bottom: '-2px',
        content: '""',
        height: '2px',
        left: 0,
        opacity: 0,
        position: 'absolute',
        right: 0,
        transition: `opacity ${TIME.MS100}ms ${EASING.CIRC_EASE_OUT}`,
      },

      '&:hover, &:focus, &:active, &[aria-selected="true"]': {
        color: COLORS.GLOBAL.WHITE,
      },

      '&[aria-selected="true"]:after': {
        opacity: 1,
      },
    }),
  ],
  tabs: {
    display: 'flex',
    marginBottom: SPACING.SIZE_30,
  },
  panel: css({
    '&[aria-hidden="true"]': {
      display: 'none',
    },
  }),
};

export default styles;
