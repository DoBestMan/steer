import { css } from '@emotion/core';

import { MQ, SPACING } from '~/lib/constants';
import { colors } from '~/styles/colors.styles';
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
    colors.LIGHT.GRAY_70,
    typography.bodyCopy,
    css({
      [MQ.L]: typography.smallCopy,
    }),
  ],
};

export default styles;
