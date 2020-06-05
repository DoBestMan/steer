import { CSSObject } from '@emotion/core';

import { COLORS, RADIUS, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

export const ITME_SIZE = 69;

const styles: CSSObject = {
  header: {
    color: COLORS.LIGHT.GRAY_70,
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: SPACING.SIZE_15,
  },
  numberItem: [
    typography.primaryHeadline,
    {
      alignItems: 'center',
      border: '3px solid currentColor',
      borderRadius: RADIUS.CIRCLE,
      color: COLORS.LIGHT.GRAY_70,
      display: 'flex',
      justifyContent: 'center',
      margin: 1, // Helps make the focus state visible
      minHeight: ITME_SIZE,
      minWidth: ITME_SIZE,

      /* eslint-disable sort-keys */
      ':not(last-of-type)': {
        marginRight: SPACING.SIZE_10,
      },
      /* eslint-enable sort-keys */
    },
  ],
  selectedItem: {
    color: COLORS.GLOBAL.ORANGE,
  },
  subTitle: typography.smallCopy,
  title: typography.eyebrow,
};

export default styles;
