import { SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles = {
  container: {
    alignItems: 'center',
    display: 'flex',
    marginRight: SPACING.SIZE_05,
  },
  rating: [
    typography.primaryHeadline,
    {
      marginLeft: SPACING.SIZE_10,
    },
  ],
  ratingContainer: {
    alignItems: 'center',
    display: 'flex',
  },
  ratingSmall: typography.tertiaryHeadline,
  stars: {
    svg: {
      fill: 'var(--rating-gradient-id)',
    },
  },
};

export default styles;
