import { CSSObject } from '@emotion/core';

import { COLORS, MQ, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: CSSObject = {
  action: [
    typography.secondarySubhead,
    {
      display: 'inline-flex',
      margin: '0 auto',
      paddingTop: SPACING.SIZE_20,
    },
  ],
  container: {
    textAlign: 'center',
  },
  copy: [
    typography.smallCopy,
    {
      color: COLORS.LIGHT.GRAY_70,
    },
  ],
  featureDescription: [
    typography.secondaryHeadline,
    {
      color: COLORS.GLOBAL.ORANGE,
      marginBottom: SPACING.SIZE_30,
    },
  ],
  icon: {
    color: COLORS.GLOBAL.ORANGE,
    justifyContent: 'center',
    marginBottom: SPACING.SIZE_20,
    minHeight: 35,
  },
  title: [
    typography.secondaryHeadline,
    {
      marginBottom: SPACING.SIZE_05,

      [MQ.L]: {
        br: {
          display: 'none',
        },
      },

      span: {
        display: 'block',
      },
    },
  ],
};

export default styles;
