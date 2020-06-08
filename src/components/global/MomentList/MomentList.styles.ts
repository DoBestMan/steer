import { CSSObject } from '@emotion/core';

import {
  COLORS,
  RATINGS_DISPLAY,
  RATINGS_THEME,
  SPACING,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: CSSObject = {
  container: {
    paddingBottom: SPACING.SIZE_40,
  },
  item: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },
};

// Theme styles
export const tStyles = {
  [RATINGS_THEME.DARK]: {
    value: {
      color: COLORS.GLOBAL.WHITE,
    },
    container: {
      color: COLORS.DARK.GRAY_40,
    },
  },
  [RATINGS_THEME.LIGHT]: {
    value: {
      color: COLORS.LIGHT.GRAY_70,
    },
    container: {
      color: COLORS.LIGHT.GRAY_70,
    },
  },
};

// Display styles
export const dStyles = {
  [RATINGS_DISPLAY.COMPACT]: {
    item: {
      '&:not(:last-child)': {
        marginBottom: SPACING.SIZE_05,
      },
    },
    label: typography.smallCopyTight,
    value: typography.secondarySubhead,
  },
  [RATINGS_DISPLAY.DEFAULT]: {
    item: {
      '&:not(:last-child)': {
        marginBottom: SPACING.SIZE_10,
      },
    },
    label: typography.bodyCopy,
    value: typography.primarySubhead,
  },
};

export default styles;
