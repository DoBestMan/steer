import { css } from '@emotion/core';

import { BORDERS, COLORS, MQ, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles = {
  listboxItem: [
    typography.primaryHeadline,

    css({
      lineHeight: 1.68,
      position: 'relative',
      [MQ.M]: { lineHeight: 1.68 },
    }),
  ],
  listboxItemHighlight: css({
    color: COLORS.LIGHT.GRAY_70,
  }),
  listboxItemSecondary: [
    typography.bodyCopy,
    css({ marginLeft: SPACING.SIZE_10 }),
  ],
  listboxItemSelected: css({
    outline: BORDERS.FOCUS_STATE,
  }),
};

export default styles;
