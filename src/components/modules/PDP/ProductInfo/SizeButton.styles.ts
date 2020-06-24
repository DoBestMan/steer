import { CSSObject } from '@emotion/core';

import { COLORS, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: CSSObject = {
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
  rootNoSizeSelected: {
    color: COLORS.GLOBAL.ORANGE,
  },
  icon: {
    marginLeft: SPACING.SIZE_05,
  },
};

export default styles;
