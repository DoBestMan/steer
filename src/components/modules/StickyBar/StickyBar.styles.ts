import { COLORS, MQ, SPACING, StylesMap, THEME } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const SIDE_MARGIN = {
  S: SPACING.SIZE_20,
  M: SPACING.SIZE_40,
  L: SPACING.SIZE_60,
};

const STICKY_BAR_HEIGHT = {
  S: 105,
  M: 90,
  L: 100,
};

export const primaryColumnStyles: StylesMap = {
  primaryButton: {
    flex: 1,
    justifyContent: 'center',

    '&:only-child': {
      flex: 'inherit',
      width: '100%',

      [MQ.L]: {
        width: '90%',
      },
    },
  },
  primaryLabel: [
    typography.primarySubhead,
    {
      color: COLORS.GLOBAL.WHITE,
      marginRight: SPACING.SIZE_10,
      minWidth: '25%',

      [MQ.M]: {
        marginRight: SPACING.SIZE_20,
        minWidth: '33.333%',
      },
      [MQ.L]: {
        textAlign: 'center',
      },
    },
  ],
  primaryLink: [
    typography.primarySubhead,
    {
      color: COLORS.GLOBAL.WHITE,
      justifyContent: 'space-between',
      width: '100%',

      [MQ.L]: {
        justifyContent: 'inherit',
        width: '90%',
      },
    },
  ],
  rightAlign: {
    marginLeft: 'auto',
  },
  secondaryButton: {
    justifyContent: 'center',
    marginRight: SPACING.SIZE_10,
    minWidth: '25%',

    [MQ.M]: {
      minWidth: '33.333%',
      marginRight: SPACING.SIZE_20,
    },
  },
};

// If the bar is sticky, offset the top or bottom margin appropriately
// so content is not covered.
export const stickyContentOffset: StylesMap = {
  bottom: {
    marginBottom: STICKY_BAR_HEIGHT.S,

    [MQ.M]: {
      marginBottom: STICKY_BAR_HEIGHT.M,
    },
    [MQ.L]: {
      marginBottom: STICKY_BAR_HEIGHT.L,
    },
  },
  top: {
    marginTop: STICKY_BAR_HEIGHT.S,

    [MQ.M]: {
      marginTop: STICKY_BAR_HEIGHT.M,
    },
    [MQ.L]: {
      marginTop: STICKY_BAR_HEIGHT.L,
    },
  },
};

const styles: StylesMap = {
  container: {
    display: 'flex',
    height: STICKY_BAR_HEIGHT.S,
    justifyContent: 'space-between',
    padding: `0 ${SIDE_MARGIN.S}px ${SPACING.SIZE_15}px`,

    [MQ.M]: {
      alignItems: 'center',
      height: STICKY_BAR_HEIGHT.M,
      padding: `0 ${SIDE_MARGIN.M}px 0`,
    },
    [MQ.L]: {
      height: STICKY_BAR_HEIGHT.L,
      padding: `0 ${SIDE_MARGIN.L}px 0`,
    },
  },
  icon: {
    color: COLORS.GLOBAL.WHITE,
    marginRight: SPACING.SIZE_25,

    [MQ.M]: {
      marginRight: SPACING.SIZE_40,
    },

    [MQ.L]: {
      display: 'none',
    },
  },
  logo: {
    maxHeight: 50,
    marginRight: SPACING.SIZE_50,
    width: 'auto',
  },
  primaryColumn: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    [MQ.L]: {
      justifyContent: 'flex-end',
      width: '40%',
    },
  },
  secondaryColumn: {
    display: 'none',

    [MQ.L]: {
      alignItems: 'center',
      display: 'flex',
      width: '50%',
    },
  },
  secondaryLabel: [
    typography.primarySubhead,
    {
      color: COLORS.GLOBAL.WHITE,
    },
  ],
  stickyBottom: {
    bottom: 0,
    position: 'fixed',
    width: '100%',
  },
  stickyTop: {
    position: 'fixed',
    top: 0,
    width: '100%',
  },
  [THEME.DARK]: {
    background: COLORS.GLOBAL.BLACK,
  },
  [THEME.ORANGE]: {
    background: COLORS.GLOBAL.ORANGE,
  },
};

export default styles;
