import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { getColumnsCalc } from '~/lib/utils/grid';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  addToCart: {
    marginLeft: SPACING.SIZE_10,

    [MQ.M]: {
      marginLeft: SPACING.SIZE_20,
    },
    [MQ.XL]: {
      marginLeft: SPACING.SIZE_10,
      maxWidth: getColumnsCalc({
        breakpoint: 'XL',
        columns: 3,
        includeExtraGutter: false,
        includeContainerMargin: false,
      }),
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
  buttonWrapper: {
    flex: 1,
  },
  decorator: {
    ':before': {
      padding: '0 2ch',
      content: '"•"',
      marginTop: 2,
      fontSize: 6,
    },

    alignItems: 'center',
    display: 'flex',
  },
  disabledButton: {
    justifyContent: 'center',
    marginLeft: SPACING.SIZE_10,
    width: '100%',

    [MQ.M]: {
      marginLeft: SPACING.SIZE_20,
    },
    [MQ.XL]: {
      marginLeft: SPACING.SIZE_10,
    },

    // eslint-disable-next-line sort-keys
    ':disabled': {
      // To keep button width untouched
      '> span': {
        height: 0,
        visibility: 'hidden',
      },
    },
  },
  dropdownIcon: {
    marginLeft: SPACING.SIZE_05,
    marginTop: SPACING.SIZE_02,
  },
  price: {
    display: 'flex',
  },
  quantityButton: {
    [MQ.XL]: {
      maxWidth: getColumnsCalc({
        breakpoint: 'XL',
        columns: 3,
        includeExtraGutter: false,
        includeContainerMargin: false,
      }),
    },
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
    '> span:last-of-type': {
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
