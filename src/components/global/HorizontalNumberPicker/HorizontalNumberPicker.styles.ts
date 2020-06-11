import { CSSObject } from '@emotion/core';

import { BORDERS, COLORS, RADIUS, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

export const ITEM_SIZE = 75;

const styles: CSSObject = {
  header: {
    alignItems: 'baseline',
    color: COLORS.LIGHT.GRAY_70,
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: SPACING.SIZE_15,
  },
  innerItem: {
    alignItems: 'center',
    border: BORDERS.SOLID_GRAY_20_1PX,
    borderRadius: RADIUS.CIRCLE,
    color: COLORS.LIGHT.GRAY_70,
    display: 'flex',
    height: 'inherit',
    justifyContent: 'center',
    margin: SPACING.SIZE_01, // Helps make the focus state visible
    padding: SPACING.SIZE_02,
    width: 'inherit',
  },
  numberItem: [
    typography.primaryHeadline,
    {
      '&.swiper-slide': {
        boxSizing: 'border-box',
        height: ITEM_SIZE,
        margin: SPACING.SIZE_01,
        width: ITEM_SIZE,

        /* eslint-disable sort-keys */
        ':not(:last-child)': {
          marginRight: SPACING.SIZE_10,
        },
        /* eslint-enable sort-keys */
      },
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
