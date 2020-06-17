import { CSSObject } from '@emotion/core';

import { COLORS, MQ, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: CSSObject = {
  title: [
    typography.primaryHeadline,
    {
      color: COLORS.GLOBAL.WHITE,
      marginBottom: SPACING.SIZE_20,

      [MQ.M]: {
        marginBottom: SPACING.SIZE_40,
      },
    },
  ],
  supportItem: {
    flex: 1,
    paddingRight: SPACING.SIZE_40,
    paddingBottom: SPACING.SIZE_20,
    whiteSpace: 'nowrap',
  },
  supportOptions: {
    alignItems: 'flex-start',
    display: 'flex',
    flexWrap: 'wrap',
  },
  supportTitle: [
    typography.primarySubhead,
    {
      color: COLORS.GLOBAL.WHITE,
      marginBottom: SPACING.SIZE_20,
      marginTop: SPACING.SIZE_20,
    },
  ],
};

export default styles;
