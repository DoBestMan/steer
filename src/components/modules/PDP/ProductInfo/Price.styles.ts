import { CSSObject } from '@emotion/core';

import { COLORS, MQ, SPACING } from '~/lib/constants';
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
  priceFeature: [
    typography.primarySubhead,
    {
      color: COLORS.GLOBAL.ORANGE,
      whiteSpace: 'nowrap',
    },
  ],
  startingPrice: [
    typography.primarySubhead,
    {
      color: COLORS.LIGHT.GRAY_70,
      display: 'none',

      span: [
        typography.primaryHeadline,
        {
          display: 'block',
        },
      ],

      [MQ.L]: {
        display: 'block',
      },
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
