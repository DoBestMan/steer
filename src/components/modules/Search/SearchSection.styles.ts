import { css, CSSObject } from '@emotion/core';

import { BORDERS, COLORS, MQ, SPACING, TIME } from '~/lib/constants';
import { disableGlobalFocus } from '~/styles/document/accessibility.styles';
import { typography } from '~/styles/typography.styles';

const styles: CSSObject = {
  eyebrow: [
    typography.eyebrow,
    {
      color: COLORS.GLOBAL.BLACK,
      marginBottom: SPACING.SIZE_15,
      [MQ.M]: {
        marginBottom: SPACING.SIZE_20,
      },
    },
  ],
  isSelected: {
    borderColor: COLORS.GLOBAL.WHITE,
  },
  itemButton: [
    disableGlobalFocus,
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
      textAlign: 'left',
      transition: `border-color ${TIME.MS100}ms ease, color ${TIME.MS100}ms ease`,
      [MQ.M]: typography.primaryHeadline,
    }),
  ],
  listItem: {
    '&:not(:last-child)': {
      paddingBottom: SPACING.SIZE_15,
    },
  },
  searchQuery: {
    color: COLORS.ORANGE.TINT_70,
  },
  secondaryItemDisplay: [
    typography.smallCopyTight,
    {
      color: COLORS.ORANGE.SHADE_85,
      marginTop: SPACING.SIZE_10,
      [MQ.M]: typography.bodyCopyTight,
    },
  ],
};

export default styles;
