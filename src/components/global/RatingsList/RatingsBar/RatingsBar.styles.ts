import { CSSObject } from '@emotion/core';

import {
  COLORS,
  RADIUS,
  RATINGS_DISPLAY,
  RATINGS_THEME,
  SPACING,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

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
    width: '100%',
  },
  barProgress: {
    position: 'absolute',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  rating: {
    textAlign: 'right',
  },
};

// Theme styles
export const tStyles = {
  [RATINGS_THEME.DARK]: {
    barFull: {
      backgroundColor: COLORS.DARK.GRAY_80,
    },
    barProgress: {
      backgroundColor: COLORS.GLOBAL.ORANGE,
    },
    container: {
      color: COLORS.DARK.GRAY_40,
    },
    emphasized: {
      color: COLORS.GLOBAL.WHITE,
    },
  },
  [RATINGS_THEME.LIGHT]: {
    barFull: {
      backgroundColor: COLORS.LIGHT.OFF_WHITE,
    },
    barProgress: {
      backgroundColor: COLORS.LIGHT.GRAY_70,
    },
    container: {
      color: COLORS.LIGHT.GRAY_70,
    },
    emphasized: {
      color: COLORS.LIGHT.GRAY_70,
    },
  },
};

// Display styles
export const dStyles = {
  [RATINGS_DISPLAY.COMPACT]: {
    container: {
      '&:not(:last-child)': {
        marginBottom: CONSTANTS.COMPACT.RATINGS_BOTTOM_MARGIN,
      },
    },
    emphasized: typography.secondarySubhead,
    label: [
      typography.smallCopyTight,
      {
        marginRight: SPACING.SIZE_10,
        minWidth: CONSTANTS.COMPACT.LABEL_MIN_WIDTH,
      },
    ],
    rating: [
      typography.smallCopyTight,
      {
        marginLeft: SPACING.SIZE_10,
        minWidth: CONSTANTS.COMPACT.RATING_MIN_WIDTH,
      },
    ],
  },

  [RATINGS_DISPLAY.DEFAULT]: {
    container: {
      '&:not(:last-child)': {
        marginBottom: CONSTANTS.DEFAULT.RATINGS_BOTTOM_MARGIN,
      },
    },
    emphasized: typography.primarySubhead,
    label: [
      typography.bodyCopy,
      {
        marginRight: SPACING.SIZE_40,
        minWidth: CONSTANTS.DEFAULT.LABEL_MIN_WIDTH,
      },
    ],
    rating: [
      typography.bodyCopy,
      {
        marginLeft: SPACING.SIZE_25,
        minWidth: CONSTANTS.DEFAULT.RATING_MIN_WIDTH,
      },
    ],
  },
};

export default styles;
