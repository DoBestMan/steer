import { css } from '@emotion/core';

import { COLORS, MQ, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles = {
  eyebrow: [
    typography.eyebrow,
    css({
      color: COLORS.GLOBAL.BLACK,
      marginBottom: SPACING.SIZE_15,
      [MQ.M]: {
        marginBottom: SPACING.SIZE_20,
      },
    }),
  ],
  itemButton: [
    typography.secondaryHeadline,
    css({
      color: COLORS.GLOBAL.WHITE,
      [MQ.M]: typography.primaryHeadline,
    }),
  ],
  listItem: css({
    '&:not(:last-child)': {
      paddingBottom: SPACING.SIZE_15,
    },
  }),
};

export default styles;
