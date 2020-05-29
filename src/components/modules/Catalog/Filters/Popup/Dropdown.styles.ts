import { CSSObject } from '@emotion/core';

import { BORDERS, COLORS, RADIUS, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const FILTER_DROPDOWN_WIDTH = 277;

const styles: CSSObject = {
  open: {
    display: 'block',
  },
  root: [
    typography.primarySubhead,
    {
      background: COLORS.GLOBAL.WHITE,
      border: BORDERS.SOLID_GRAY_10_1PX,
      borderRadius: RADIUS.RADIUS_15,
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      color: COLORS.GLOBAL.BLACK,
      display: 'none',
      marginTop: SPACING.SIZE_05,
      minHeight: 300, // remove once content is added
      padding: SPACING.SIZE_30,
      position: 'fixed',
      width: FILTER_DROPDOWN_WIDTH,
    },
  ],
};

export default styles;
