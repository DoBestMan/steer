import { CSSObject } from '@emotion/core';

import { COLORS, RADIUS, SPACING } from '~/lib/constants';

const CONSTANTS = {
  RATINGS_BOTTOM_MARGIN: 13,
  LABEL_MIN_WIDTH: 80,
  RATING_MIN_WIDTH: 22,
  RATING_BAR_HEIGHT: 5,
};

const styles: CSSObject = {
  bar: {
    borderRadius: RADIUS.RADIUS_10,
    display: 'block',
    height: CONSTANTS.RATING_BAR_HEIGHT,
  },
  barContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  barFull: {
    backgroundColor: COLORS.DARK.GRAY_80,
    width: '100%',
  },
  barProgress: {
    backgroundColor: COLORS.GLOBAL.ORANGE,
    position: 'absolute',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    color: COLORS.DARK.GRAY_40,

    '&:not(:last-child)': {
      marginBottom: CONSTANTS.RATINGS_BOTTOM_MARGIN,
    },
  },
  emphasized: {
    color: COLORS.GLOBAL.WHITE,
  },
  label: {
    marginRight: SPACING.SIZE_40,
    minWidth: CONSTANTS.LABEL_MIN_WIDTH,
  },
  rating: {
    marginLeft: SPACING.SIZE_25,
    minWidth: CONSTANTS.RATING_MIN_WIDTH,
    textAlign: 'right',
  },
};

export default styles;
