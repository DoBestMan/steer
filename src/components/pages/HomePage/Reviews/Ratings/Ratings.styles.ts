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
  ratingLabel: {
    alignItems: 'center',
    color: COLORS.DARK.GRAY_40,
    display: 'flex',
  },
  title: {
    color: COLORS.GLOBAL.WHITE,
  },
};

export default styles;
