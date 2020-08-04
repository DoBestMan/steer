import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  featuredInfoLink: [
    typography.primarySubhead,
    {
      '&:focus, &:hover': {
        span: { color: COLORS.GLOBAL.BLACK },
      },
      color: COLORS.LIGHT.GRAY_70,
    },
  ],

  featuredInfoModule: {
    padding: `${SPACING.SIZE_20}px 0`,
    position: 'relative',
    [MQ.L]: {
      padding: 0,
    },
  },

  featuredInfoTitle: [
    typography.primarySubhead,
    {
      [MQ.M]: typography.primarySubhead,
      [MQ.XL]: typography.primarySubhead,
    },
  ],

  horizontalDivider: {
    backgroundColor: COLORS.LIGHT.GRAY_20,
    height: 1,
    margin: SPACING.SIZE_20,
  },

  verticalDivider: {
    '&::after': {
      backgroundColor: COLORS.LIGHT.GRAY_20,
      content: '""',
      height: '100%',
      position: 'absolute',
      right: -10,
      top: 0,
      width: 1,
    },
    [MQ.L]: {
      '&::after': {
        content: 'none',
      },
    },
  },
};

export default styles;
