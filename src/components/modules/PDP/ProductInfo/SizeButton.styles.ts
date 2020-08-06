import { CSSObject } from '@emotion/core';

import { COLORS, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: CSSObject = {
  icon: {
    marginLeft: SPACING.SIZE_05,
  },
  loadIndex: {
    fontWeight: 'normal',
  },
  root: [
    typography.primaryHeadline,
    {
      alignItems: 'center',
      display: 'flex',
    },
  ],
  selectSize: {
    color: COLORS.GLOBAL.ORANGE,
  },
  size: {
    color: COLORS.GLOBAL.BLACK,
  },
};

export default styles;
