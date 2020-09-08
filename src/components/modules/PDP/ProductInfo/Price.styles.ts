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
  priceFeature: [
    typography.primarySubhead,
    {
      color: COLORS.GLOBAL.ORANGE,
      whiteSpace: 'nowrap',
      ':not(:only-child):last-of-type': {
        marginBottom: 3,
      },
    },
  ],
  prices: [
    typography.primaryHeadline,
    {
      display: 'block',
      marginBottom: 3,
      [MQ.M]: {
        marginBottom: SPACING.SIZE_10,
      },
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
      marginBottom: SPACING.SIZE_20, // To compensate container's margin

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
