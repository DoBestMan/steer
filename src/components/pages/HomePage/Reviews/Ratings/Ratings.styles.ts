import { css } from '@emotion/core';

import { COLORS, MQ, SPACING } from '~/lib/constants';

export const RATING_GRADIENT_ID = 'rating-gradient';

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
  rating: css({
    color: COLORS.GLOBAL.ORANGE,
    marginLeft: SPACING.SIZE_10,
  }),
  ratingContainer: css({
    alignItems: 'center',
    display: 'flex',
  }),
  ratingLabel: css({
    alignItems: 'center',
    color: COLORS.DARK.GRAY_40,
    display: 'flex',
  }),
  ratingStars: css({
    svg: {
      fill: `url(#${RATING_GRADIENT_ID})`,
    },
  }),
  title: css({
    color: COLORS.GLOBAL.WHITE,
  }),
};

export default styles;
