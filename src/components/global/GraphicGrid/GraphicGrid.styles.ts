import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { borderBottom } from '~/styles/borders.styles';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  alignedGridModule: [borderBottom],
  container: {
    backgroundColor: COLORS.GLOBAL.WHITE,
  },
  featuredInfoModule: {
    '&:not(:last-of-type)': {
      '&::after': {
        backgroundColor: COLORS.LIGHT.GRAY_20,
        content: '""',
        height: '100%',
        position: 'absolute',
        right: -10,
        top: 0,
        width: 1,
      },
    },
    padding: `${SPACING.SIZE_20}px 0`,
    position: 'relative',
    [MQ.M]: {
      '&:not(:last-of-type)': {
        '&::after': {
          content: 'none',
        },
      },
      padding: 0,
    },
    span: {
      svg: {
        minHeight: SPACING.SIZE_40,
      },
    },
  },
  featuredInfoTitle: [
    typography.primarySubhead,
    {
      [MQ.M]: typography.primarySubhead,
      [MQ.XL]: typography.primarySubhead,
    },
  ],
  firstItemBorder: {
    ':first-of-type': {
      '&::after': {
        backgroundColor: COLORS.LIGHT.GRAY_20,
        content: '""',
        height: '100%',
        position: 'absolute',
        right: -15,
        top: 0,
        width: 1,
      },
    },
  },
  innerGrid: [
    {
      padding: `${SPACING.SIZE_20}px 0`,
      [MQ.M]: {
        padding: `${SPACING.SIZE_40}px 0`,
      },
      [MQ.L]: {
        padding: `${SPACING.SIZE_60}px 0`,
      },
    },
  ],
};

export default styles;
