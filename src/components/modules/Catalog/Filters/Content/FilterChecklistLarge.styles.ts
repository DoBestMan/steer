import { CSSObject } from '@emotion/core';

import { BORDERS, COLORS, MQ, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: CSSObject = {
  group: {
    ':not(:last-of-type)': { borderBottom: BORDERS.SOLID_GRAY_20_1PX },
    marginBottom: SPACING.SIZE_15,
    paddingBottom: SPACING.SIZE_40,
  },
  groupTitle: [
    typography.secondaryHeadline,
    {
      marginBottom: SPACING.SIZE_15,
    },
  ],
  label: [
    typography.primarySubhead,
    {
      marginRight: SPACING.SIZE_05,
      [MQ.L]: typography.primarySubhead,
    },
  ],
  title: [
    typography.eyebrow,
    {
      marginBottom: SPACING.SIZE_15,
      paddingBottom: SPACING.SIZE_25,
      [MQ.L]: {
        borderBottom: BORDERS.SOLID_GRAY_20_1PX,
        color: COLORS.LIGHT.GRAY_70,
      },
    },
  ],
};

export default styles;
