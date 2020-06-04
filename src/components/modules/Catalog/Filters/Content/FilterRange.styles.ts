import { CSSObject } from '@emotion/core';

import { COLORS, MQ, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: CSSObject = {
  root: {
    [MQ.M]: { minWidth: 400 },
  },
  title: [
    typography.eyebrow,
    {
      marginBottom: SPACING.SIZE_40,
      paddingBottom: SPACING.SIZE_25,
      [MQ.L]: {
        color: COLORS.LIGHT.GRAY_70,
        marginBottom: SPACING.SIZE_15,
      },
    },
  ],
};

export default styles;
