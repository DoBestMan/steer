import { tStyles } from '~/components/global/RatingsList/RatingsBar/RatingsBar.styles';
import { COLORS, RADIUS, SPACING, StylesMap } from '~/lib/constants';

import { fontBase } from '../CompareTable.styles';

export const STAR_COLOR = 'rgba(24, 24, 24, 0.7)';
const CONSTANTS = {
  RATING_BAR_HEIGHT: 5,
  DEFAULT: {
    RATINGS_BOTTOM_MARGIN: 13,
    LABEL_MIN_WIDTH: 80,
    RATING_MIN_WIDTH: 22,
  },
  COMPACT: {
    RATINGS_BOTTOM_MARGIN: 5,
    LABEL_MIN_WIDTH: 60,
    RATING_MIN_WIDTH: 18,
  },
};

const styles: StylesMap = {
  borderBottom: {
    borderBottom: `2px dotted ${COLORS.LIGHT.GRAY_70}`,
  },
  cellText: [
    fontBase,
    {
      display: 'block',
      opacity: 0.75,
      minHeight: SPACING.SIZE_15,
    },
  ],
  ratingQuantity: [
    fontBase,
    {
      opactity: 0.75,
    },
  ],
  reviews: {
    alignItems: 'start',
    display: 'flex',
    position: 'relative',
  },
  reviewsLink: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
};

const ratingBar: StylesMap = {
  bar: {
    borderRadius: RADIUS.RADIUS_10,
    display: 'block',
    height: CONSTANTS.RATING_BAR_HEIGHT,
  },
  barContainer: {
    alignItems: 'center',
    display: 'flex',
    position: 'relative',
    width: '100%',
  },
  barFull: {
    width: '100%',
  },
  barProgress: {
    position: 'absolute',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
  },
  rating: [
    fontBase,
    {
      opacity: 0.75,
      marginBottom: SPACING.SIZE_05,
    },
  ],
};

const priceWithPromotion: StylesMap = {
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  lineThrough: {
    textDecoration: 'line-through',
  },
  promoTagWrapper: {
    marginTop: SPACING.SIZE_10,
  },
};

export { ratingBar, styles, tStyles, priceWithPromotion };
export default styles;
