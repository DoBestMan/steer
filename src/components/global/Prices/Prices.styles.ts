import { CSSObject } from '@emotion/core';

import { COLORS, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: CSSObject = {
  originalValue: [
    typography.smallCopy,
    {
      marginLeft: SPACING.SIZE_05,
      textDecoration: 'line-through',
      color: COLORS.LIGHT.GRAY_70,
    },
  ],
};

export default styles;
