import { CSSObject } from '@emotion/core';

import { BORDERS, COLORS, RADIUS, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

export const ITEM_SIZE = 69;

const styles: CSSObject = {
  header: {
    alignItems: 'baseline',
    color: COLORS.LIGHT.GRAY_70,
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: SPACING.SIZE_15,
  },
  numberItem: [
    typography.primaryHeadline,
    {
      alignItems: 'center',
      border: BORDERS.SOLID_GRAY_20_1PX,
      borderRadius: RADIUS.CIRCLE,
      color: COLORS.LIGHT.GRAY_70,
      display: 'flex',
      justifyContent: 'center',
      margin: SPACING.SIZE_01, // Helps make the focus state visible
      minHeight: ITEM_SIZE,
      minWidth: ITEM_SIZE,
      padding: SPACING.SIZE_02,

      /* eslint-disable sort-keys */
      ':not(last-of-type)': {
        marginRight: SPACING.SIZE_10,
      },
      /* eslint-enable sort-keys */
    },
  ],
  selectedItem: {
    border: `3px solid ${COLORS.GLOBAL.ORANGE}`,
    color: COLORS.GLOBAL.ORANGE,
    padding: 0,
  },
  subTitle: typography.smallCopy,
  title: typography.eyebrow,
};

export default styles;
