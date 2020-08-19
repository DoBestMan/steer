import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  addToCart: {
    marginLeft: SPACING.SIZE_10,

    [MQ.M]: {
      marginLeft: SPACING.SIZE_20,
    },
    [MQ.XL]: {
      marginLeft: SPACING.SIZE_10,
    },

    ':disabled': {
      // To keep button width untouched
      '> span': {
        height: 0,
        visibility: 'hidden',
      },
    },
  },
  addToCartLoading: {
    position: 'absolute',
  },
  dropdownIcon: {
    height: 5,
    marginLeft: SPACING.SIZE_05,
    marginTop: SPACING.SIZE_02,
    width: 8,
  },
  root: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',

    [MQ.L]: {
      justifyContent: 'flex-end',
      width: 'auto',
    },

    // eslint-disable-next-line sort-keys
    '> button': {
      display: 'flex',
      flex: 0.5,
      justifyContent: 'center',
      whiteSpace: 'nowrap',

      [MQ.L]: {
        display: 'flex',
        flex: 'auto',
      },
    },

    // eslint-disable-next-line sort-keys
    '> button:last-of-type': {
      flex: 1,

      [MQ.L]: {
        flex: 'auto',
      },
    },

    // eslint-disable-next-line sort-keys
    '> p': {
      display: 'flex',
      flex: 0.5,
      justifyContent: 'flex-start',
      whiteSpace: 'nowrap',

      [MQ.L]: {
        display: 'flex',
        flex: 'auto',
      },
    },
  },
  startingAtValue: [
    typography.primarySubhead,
    {
      color: COLORS.GLOBAL.WHITE,
      marginRight: SPACING.SIZE_20,
    },
  ],
};

export default styles;
