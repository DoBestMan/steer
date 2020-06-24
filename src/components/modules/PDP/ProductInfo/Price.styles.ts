import { CSSObject } from '@emotion/core';

import { COLORS, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: CSSObject = {
  callingLink: {
    display: 'block',
  },
  description: [
    typography.smallCopyTight,
    {
      color: COLORS.LIGHT.GRAY_70,
    },
  ],
  title: [
    typography.tertiaryHeadline,
    {
      color: COLORS.GLOBAL.ORANGE,
      marginBottom: SPACING.SIZE_05,
    },
  ],
};

export default styles;
