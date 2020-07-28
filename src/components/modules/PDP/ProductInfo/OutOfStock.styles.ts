import { CSSObject } from '@emotion/core';

import { COLORS, MQ, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: CSSObject = {
  crossSellButton: {
    justifyContent: 'center',
    marginTop: SPACING.SIZE_15,
    width: '100%',

    [MQ.M]: {
      width: 'auto',
      marginTop: SPACING.SIZE_25,
    },

    [MQ.L]: {
      marginTop: SPACING.SIZE_20,
    },
  },
  description: [
    typography.bodyCopy,
    {
      color: COLORS.LIGHT.GRAY_70,
      marginTop: SPACING.SIZE_05,

      [MQ.L]: {
        paddingLeft: SPACING.SIZE_40,
        paddingRight: SPACING.SIZE_40,
      },
    },
  ],
  title: [
    typography.primarySubhead,
    {
      color: COLORS.GLOBAL.ORANGE,
      whiteSpace: 'nowrap',
    },
  ],
};

export default styles;
