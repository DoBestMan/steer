import { COLORS, MQ, SPACING } from '~/lib/constants';

const styles = {
  container: {
    margin: `0 0 ${SPACING.SIZE_40}px`,

    [MQ.M]: {
      margin: `${SPACING.SIZE_20}px 0`,
    },
  },
  iconVerified: {
    height: 19,
    marginLeft: 4,
  },
  rating: {
    color: COLORS.GLOBAL.ORANGE,
    marginLeft: SPACING.SIZE_10,
  },
  ratingContainer: {
    alignItems: 'center',
    display: 'flex',
  },
  ratingLabel: {
    alignItems: 'center',
    color: COLORS.DARK.GRAY_40,
    display: 'flex',
  },
  ratingStars: {
    svg: {
      fill: 'var(--rating-gradient-id)',
    },
  },
  title: {
    color: COLORS.GLOBAL.WHITE,
  },
};

export default styles;
