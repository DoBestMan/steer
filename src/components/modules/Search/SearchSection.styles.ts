import { css } from '@emotion/core';

import { BORDERS, COLORS, MQ, SPACING, TIME } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles = {
  eyebrow: [
    typography.eyebrow,
    css({
      color: COLORS.GLOBAL.BLACK,
      marginBottom: SPACING.SIZE_15,
      [MQ.M]: {
        marginBottom: SPACING.SIZE_20,
      },
    }),
  ],
  itemButton: [
    typography.secondaryHeadline,
    css({
      '&:active': {
        borderColor: COLORS.ORANGE.TINT_70,
        color: COLORS.ORANGE.TINT_70,
      },
      '&:hover:not(:active), &:focus:not(:active)': {
        borderColor: COLORS.GLOBAL.WHITE,
      },
      borderBottom: BORDERS.DOTTED_TRANSPARENT_2PX,
      color: COLORS.GLOBAL.WHITE,
      transition: `border-color ${TIME.MS100}ms ease, color ${TIME.MS100}ms ease`,
      [MQ.M]: typography.primaryHeadline,
    }),
  ],
  listItem: css({
    '&:not(:last-child)': {
      paddingBottom: SPACING.SIZE_15,
    },
  }),
};

export default styles;
