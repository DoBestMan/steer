import { CSSObject } from '@emotion/core';

import { COLORS, SPACING } from '~/lib/constants';

const styles: CSSObject = {
  container: {
    paddingBottom: SPACING.SIZE_40,
    color: COLORS.DARK.GRAY_40,
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',

    '&:not(:last-child)': {
      marginBottom: SPACING.SIZE_10,
    },
  },
  value: {
    color: COLORS.GLOBAL.WHITE,
  },
};

export default styles;
