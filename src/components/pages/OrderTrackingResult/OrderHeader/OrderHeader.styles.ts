import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  canceledOrderHelp: {
    '> span': [
      typography.largeCopy,
      {
        color: COLORS.GLOBAL.BLACK,
        display: 'block',
        fontWeight: 'normal',
      },
    ],
    a: {
      borderBottom: `2px dotted ${COLORS.LIGHT.GRAY_70}`,
      ':hover': {
        borderColor: COLORS.GLOBAL.BLACK,
      },
    },
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
      paddingBottom: SPACING.SIZE_10,
      textAlign: 'center',
      [MQ.M]: {
        paddingBottom: SPACING.SIZE_20,
      },
    },
  ],
  orderStatusLabel: [
    typography.jumboHeadline,
    {
      '> span': {
        display: 'block',
      },
      color: COLORS.GLOBAL.ORANGE,
      lineHeight: 1,
      textAlign: 'center',
      [MQ.M]: {
        '> span': {
          display: 'inline',
        },
      },
      [MQ.XL]: {
        lineHeight: 1,
      },
    },
  ],
};

export default styles;
