import { SPACING } from '~/lib/constants';

const styles = {
  container: {
    alignItems: 'center',
    display: 'flex',
    marginRight: SPACING.SIZE_05,
  },
  rating: {
    lineHeight: 'inherit',
    marginLeft: SPACING.SIZE_10,
  },
  ratingContainer: {
    alignItems: 'center',
    display: 'flex',
  },
  stars: {
    svg: {
      fill: 'var(--rating-gradient-id)',
    },
  },
};

export default styles;
