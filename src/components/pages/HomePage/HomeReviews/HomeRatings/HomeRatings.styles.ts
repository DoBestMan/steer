import { COLORS, MQ, SPACING } from '~/lib/constants';

export const homeRatingGradientID = 'homepage-rating';

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
  ratingLabel: {
    alignItems: 'center',
    color: COLORS.DARK.GRAY_40,
    display: 'flex',
  },
  stars: {
    svg: {
      height: 20,
      fill: `url(#${homeRatingGradientID})`,
      width: 'auto',
      [MQ.M]: {
        height: 26,
      },
    },
    marginRight: SPACING.SIZE_15,
  },
  starsContainer: {
    color: COLORS.GLOBAL.ORANGE,
    display: 'flex',
  },
  title: {
    color: COLORS.GLOBAL.WHITE,
  },
};

export default styles;
