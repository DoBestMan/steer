import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  callingLink: {
    display: 'block',
  },
  description: [
    typography.smallCopyTight,
    {
      color: COLORS.LIGHT.GRAY_70,
    },
  ],
  originalPrice: {
    [MQ.XL]: typography.bodyCopyTight,
  },
  outOfStock: {
    [MQ.L]: {
      ['p:last-of-type']: {
        padding: 0,
      },
    },
  },
  priceFeature: [
    typography.primarySubhead,
    {
      color: COLORS.GLOBAL.BLACK,
      whiteSpace: 'nowrap',
      ':not(:only-child):last-of-type': {
        marginBottom: 3,
      },
    },
  ],
  prices: [
    typography.primaryHeadline,
    {
      color: COLORS.LIGHT.GRAY_70,
      display: 'block',
      marginBottom: 3,
    },
  ],
  pricesPadded: {
    marginBottom: SPACING.SIZE_20,
    [MQ.M]: {
      marginBottom: 28,
    },
    [MQ.L]: {
      marginBottom: 0,
    },
  },
  startingPrice: [
    typography.primarySubhead,
    {
      color: COLORS.LIGHT.GRAY_70,

      span: [
        typography.primaryHeadline,
        {
          display: 'block',
        },
      ],

      [MQ.L]: {
        display: 'block',
        marginBottom: 0,
      },
    },
  ],
  title: [
    typography.tertiaryHeadline,
    {
      color: COLORS.GLOBAL.ORANGE,
      marginBottom: SPACING.SIZE_05,
    },
  ],
};

export default styles;
