import { css } from '@emotion/core';

import { COLORS, MQ, SPACING } from '~/lib/constants';

const styles = {
  container: css({
    margin: `0 0 ${SPACING.SIZE_40}px`,

    [MQ.M]: {
      margin: `${SPACING.SIZE_20}px 0`,
    },
  }),
  iconVerified: css({
    height: 19,
    marginLeft: 4,
  }),
  orangeStars: css({
    color: COLORS.GLOBAL.ORANGE,
    display: 'flex',
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
  }),
  rating: css({
    color: COLORS.GLOBAL.ORANGE,
    marginLeft: SPACING.SIZE_10,
  }),
  ratingContainer: css({
    alignItems: 'center',
    display: 'flex',
  }),
  ratingCopy: css({
    alignItems: 'center',
    color: COLORS.DARK.GRAY_40,
    display: 'flex',
  }),
  starContainer: css({
    color: COLORS.DARK.GRAY_40,
    position: 'relative',
  }),
  title: css({
    color: COLORS.GLOBAL.WHITE,
  }),
};

export default styles;
