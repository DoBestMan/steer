import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const CONSTANTS = {
  RETURN_ICON_SIZE: 20,
};
const styles: StylesMap = {
  backIcon: {
    height: CONSTANTS.RETURN_ICON_SIZE,
    width: CONSTANTS.RETURN_ICON_SIZE,
  },
  canceledOrderHelp: {
    '> span': [
      typography.largeCopy,
      {
        color: COLORS.GLOBAL.BLACK,
        display: 'block',
        fontWeight: 'normal',
      },
    ],
    a: [
      typography.largeCopy,
      {
        display: 'inline-flex',
      },
    ],
    display: 'block',
    marginTop: SPACING.SIZE_20,
    textAlign: 'center',
  },
  expectingDelivery: {
    [MQ.M]: {
      '> span': {
        display: 'block',
      },
    },
  },
  orderNumber: [
    typography.tertiaryHeadline,
    {
      [MQ.M]: {
        paddingBottom: SPACING.SIZE_20,
      },
      paddingBottom: SPACING.SIZE_10,
      textAlign: 'center',
    },
  ],
  orderStatusLabel: [
    typography.jumboHeadline,
    {
      [MQ.M]: {
        '> span': {
          display: 'inline',
        },
      },
      [MQ.XL]: {
        lineHeight: 1,
      },
      '> span': {
        display: 'block',
      },
      color: COLORS.GLOBAL.ORANGE,
      lineHeight: 1,
      textAlign: 'center',
    },
  ],
  returnHomeContainer: {
    [MQ.S]: {
      paddingBottom: SPACING.SIZE_20,
    },
    alignItems: 'center',
    alignSelf: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  subTitleText: [
    typography.largeCopy,
    {
      '> a': [
        typography.largeCopy,
        {
          display: 'inline-flex',
        },
      ],
      textAlign: 'center',
    },
  ],
};

export default styles;
