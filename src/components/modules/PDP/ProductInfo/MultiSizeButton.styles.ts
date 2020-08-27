import { BORDERS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  button: [
    typography.primarySubhead,
    {
      alignItems: 'center',
      borderTop: BORDERS.SOLID_GRAY_20_1PX,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingBottom: SPACING.SIZE_20,
      paddingTop: SPACING.SIZE_20,
      textAlign: 'left',
      width: '100%',

      [MQ.M]: {
        paddingBottom: SPACING.SIZE_25,
        paddingTop: SPACING.SIZE_25,
      },
    },
  ],
  customPriceStyles: {
    // We need to explicitly override the Prices
    // component's default type style at this breakpoint
    [MQ.XL]: typography.primarySubhead,
  },
  icon: {
    marginLeft: SPACING.SIZE_05,
    order: 3,
  },
  loadIndex: {
    fontWeight: 'normal',
  },
  loadSpeedRating: {
    fontWeight: 'normal',
  },
  price: {
    display: 'block',
    order: 4,
    flexBasis: '100%',
  },
  quantity: {
    order: 2,
    marginRight: SPACING.SIZE_05,
  },
  rearButton: {
    paddingBottom: SPACING.SIZE_02,

    [MQ.M]: {
      paddingBottom: SPACING.SIZE_02,
    },
    [MQ.L]: {
      paddingBottom: SPACING.SIZE_20,
    },
  },
  root: {
    marginTop: SPACING.SIZE_20,
    width: '100%',

    [MQ.M]: {
      marginTop: SPACING.SIZE_25,
    },
    [MQ.L]: {
      marginTop: SPACING.SIZE_40,
    },
  },
  size: {
    order: 1,
    flexGrow: 1,
  },
};

export default styles;
