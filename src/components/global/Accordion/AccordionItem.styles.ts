import { css, CSSObject } from '@emotion/core';

import { BORDERS, COLORS, EASING, SPACING, TIME } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: CSSObject = {
  button: [
    typography.bodyCopyTight,
    {
      alignItems: 'center',
      color: COLORS.DARK.GRAY_40,
      display: 'flex',
      justifyContent: 'space-between',
      overflow: 'hidden',
      paddingBottom: SPACING.SIZE_20,
      paddingTop: SPACING.SIZE_20,
      transition: `color ${TIME.MS100}ms ${EASING.CIRC_EASE_OUT}`,
      width: '100%',
    },
    css({
      '&:hover, &:focus, &:active': {
        color: COLORS.GLOBAL.WHITE,
      },

      '&[aria-expanded="true"]': [
        typography.primarySubhead,
        {
          color: COLORS.GLOBAL.WHITE,
        },
      ],
    }),
  ],
  buttonIcon: {
    transition: `transform ${TIME.MS100}ms ${EASING.CIRC_EASE_OUT}`,

    svg: {
      display: 'block',
      height: SPACING.SIZE_05,
      padding: SPACING.SIZE_05,
    },
  },
  buttonIconExpanded: {
    transform: 'rotate(-180deg)',
  },
  container: {
    a: {
      borderBottom: BORDERS.DOTTED_GRAY_40_2PX,
      transition: `all ${TIME.MS100}ms ${EASING.CIRC_EASE_OUT}`,

      '&:hover': {
        color: COLORS.GLOBAL.WHITE,
        borderColor: COLORS.GLOBAL.WHITE,
      },
    },

    borderBottom: BORDERS.SOLID_GRAY_80_1PX,

    p: {
      '&:not(:last-child)': {
        marginBottom: '1em',
      },
    },
  },
  contentContainer: [
    typography.bodyCopyTight,
    {
      color: COLORS.DARK.GRAY_40,
      marginBottom: 0,
      maxHeight: 0,
      opacity: 0,
      transition: `opacity ${TIME.MS200}ms ${EASING.CIRC_EASE_OUT}, max-height ${TIME.MS400}ms ${EASING.CIRC_EASE_OUT}`,
      visibility: 'hidden',
    },

    css({
      '&[aria-hidden="false"]': {
        marginBottom: SPACING.SIZE_20,
        opacity: 1,
        visibility: 'visible',
      },
    }),
  ],
};

export default styles;
