import { css } from '@emotion/core';

import { typography } from '~/styles/global/typography.styles';
import { colors } from '~/styles/global/colors.styles';

import { SPACING } from '~/lib/constants/spacing';
import { MQ } from '~/lib/constants/breakpoints';

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
