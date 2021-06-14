import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  currentBlock: {
    display: 'block',
  },
  infoWrapper: {
    [MQ.M]: {
      display: 'flex',
    },
  },
  noPrice: {
    fontWeight: 'normal',
  },
  originalValue: [
    typography.smallCopyTight,
    {
      color: COLORS.LIGHT.GRAY_70,
      marginLeft: SPACING.SIZE_05,
      textDecoration: 'line-through',
    },
  ],
  originalValuePrefixed: {
    display: 'block',
    marginLeft: 0,
    textDecoration: 'none',
  },
  wrapper: {
    alignItems: 'center',
  },
};

export const bestPriceStyle = {
  prices: [
    typography.primaryHeadline,
    {
      color: COLORS.LIGHT.GRAY_70,
      display: 'block',
      marginBottom: 3,
    },
  ],
  originalPrice: [
    typography.smallCopyTight,
    {
      '& > span > span': {
        borderBottom: '1px solid',
      },
      color: COLORS.LIGHT.GRAY_70,
      [MQ.XL]: typography.bodyCopyTight,
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
};

export default styles;
