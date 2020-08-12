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
      marginBottom: 3,
      whiteSpace: 'nowrap',
    },
  ],
  prices: [
    typography.primaryHeadline,
    { display: 'block', marginBottom: SPACING.SIZE_05 },
  ],
  startingPrice: [
    typography.primarySubhead,
    {
      color: COLORS.LIGHT.GRAY_70,
      display: 'none',

      span: [
        typography.primaryHeadline,
        {
          display: 'block',
        },
      ],

      [MQ.L]: {
        display: 'block',
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
