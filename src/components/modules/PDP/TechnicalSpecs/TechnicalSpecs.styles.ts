import { css, CSSObject } from '@emotion/core';

import { COLORS, MQ, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: CSSObject = {
  description: [
    typography.bodyCopy,
    {
      color: COLORS.DARK.GRAY_40,
    },
  ],
  descriptionContainer: css({
    gridRow: 3,

    [MQ.L]: {
      gridRow: 2,
    },
  }),
  findMyTireSizeLabel: {
    marginTop: SPACING.SIZE_20,
  },
  header: {
    paddingBottom: SPACING.SIZE_40,
  },
  imageContainer: css({
    gridRow: 2,
    marginBottom: SPACING.SIZE_40,

    [MQ.L]: {
      gridRow: '1/4',
      marginBottom: 0,
    },
  }),
  title: [
    typography.primaryHeadline,
    {
      color: COLORS.GLOBAL.WHITE,
    },
  ],
  titleContainer: css({
    gridRow: 1,
    marginBottom: SPACING.SIZE_40,

    [MQ.L]: {
      gridRow: 1,
      marginBottom: SPACING.SIZE_15,
    },
  }),
};

export default styles;
