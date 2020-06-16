import { CSSObject } from '@emotion/core';

import { BORDERS, COLORS, MQ, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: CSSObject = {
  description: [
    typography.bodyCopy,

    {
      color: COLORS.LIGHT.GRAY_70,
    },
  ],
  descriptionLink: {
    opacity: 0.7,
    display: 'inline-block',
  },
  headline: [
    typography.primaryHeadline,
    {
      color: COLORS.GLOBAL.ORANGE,
    },
  ],
  illustration: {
    borderBottom: BORDERS.SOLID_GRAY_20_1PX,
    height: 100,
    marginBottom: SPACING.SIZE_30,
    marginTop: SPACING.SIZE_60,

    [MQ.M]: {
      marginBottom: SPACING.SIZE_40,
      marginTop: SPACING.SIZE_40,
    },

    [MQ.L]: {
      marginBottom: 0,
      marginTop: SPACING.SIZE_100,
    },
  },
  subtitle: [
    typography.primarySubhead,

    {
      color: COLORS.LIGHT.GRAY_70,
      display: 'flex',
    },
  ],
  subtitleIcon: {
    height: 20,
    width: 20,
  },
  title: [
    typography.primaryHeadline,
    {
      color: COLORS.GLOBAL.BLACK,
    },
  ],
};

export default styles;
