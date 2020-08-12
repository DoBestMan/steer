import { CSSObject } from '@emotion/core';

import { COLORS, MQ, SPACING } from '~/lib/constants';
import { links } from '~/styles/links.styles';
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

      a: links.light,
    },
  ],
  featureDescription: [
    typography.secondaryHeadline,
    {
      color: COLORS.GLOBAL.ORANGE,
      marginBottom: SPACING.SIZE_20,
    },
  ],
  icon: {
    color: COLORS.GLOBAL.ORANGE,
    justifyContent: 'center',
    marginBottom: SPACING.SIZE_10,
    minHeight: 35,
  },
  title: [
    typography.secondaryHeadline,
    {
      marginBottom: SPACING.SIZE_10,

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
  twoColumnSpacing: {
    [MQ.L]: {
      padding: `0 ${SPACING.SIZE_50}px`,
    },
  },
};

export default styles;
