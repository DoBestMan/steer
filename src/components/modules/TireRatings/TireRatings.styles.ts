import { CSSObject } from '@emotion/core';

import { COLORS, MQ, SPACING } from '~/lib/constants';

const styles: CSSObject = {
  container: {
    paddingBottom: SPACING.SIZE_120,
    paddingTop: SPACING.SIZE_40,

    [MQ.M]: {
      paddingTop: 0,
    },
  },
  title: {
    color: COLORS.GLOBAL.WHITE,
  },
  video: {
    paddingBottom: SPACING.SIZE_40,
  },
};

export default styles;
