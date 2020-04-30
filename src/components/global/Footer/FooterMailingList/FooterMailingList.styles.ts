import { css } from '@emotion/core';

import { COLORS, MQ, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles = {
  container: css({}),
  heading: [
    typography.secondaryHeadline,
    css({
      marginBottom: SPACING.SIZE_20,

      [MQ.L]: typography.tertiaryHeadline,
    }),
  ],
  text: [
    typography.bodyCopy,
    css({
      color: COLORS.LIGHT.GRAY_70,
      [MQ.L]: typography.smallCopy,
    }),
  ],
};

export default styles;
