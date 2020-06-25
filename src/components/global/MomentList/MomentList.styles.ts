import {
  COLORS,
  MQ,
  RATINGS_DISPLAY,
  SPACING,
  StylesMap,
  THEME,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  item: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },
};

// Theme styles
export const tStyles = {
  [THEME.DARK]: {
    value: {
      color: COLORS.GLOBAL.WHITE,
    },
    container: {
      color: COLORS.DARK.GRAY_40,
    },
  },
  [THEME.LIGHT]: {
    value: {
      color: COLORS.LIGHT.GRAY_70,
    },
    container: {
      color: COLORS.LIGHT.GRAY_70,
    },
    concise: {
      color: COLORS.LIGHT.GRAY_70,
    },
  },
};

// Display styles
export const dStyles = {
  [RATINGS_DISPLAY.COMPACT]: {
    concise: [
      typography.smallCopyTight,
      {
        [MQ.XL]: { display: 'none' },
      },
    ],
    item: {
      justifyContent: 'flex-end',
      [MQ.XL]: {
        justifyContent: 'start',
      },
      '&:not(:last-child)': {
        marginBottom: SPACING.SIZE_05,
      },
    },
    label: [
      typography.smallCopyTight,
      {
        display: 'none',
        [MQ.XL]: {
          display: 'inline',
          minWidth: SPACING.SIZE_70,
        },
      },
    ],
    value: [
      typography.secondarySubhead,
      {
        display: 'none',
        [MQ.XL]: {
          display: 'inline',
        },
      },
    ],
  },
  [RATINGS_DISPLAY.DEFAULT]: {
    concise: typography.smallCopyTight,
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
