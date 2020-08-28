import { COLORS, GRID_MARGIN, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  chevron: {
    bottom: 2,
    paddingLeft: SPACING.SIZE_10,
    position: 'relative',
    svg: {
      height: 15,
      width: 10,
    },
  },
  description: [
    typography.bodyCopyTight,
    {
      color: COLORS.LIGHT.GRAY_70,
    },
  ],
  root: {
    marginLeft: GRID_MARGIN.S,
    [MQ.M]: {
      marginLeft: GRID_MARGIN.M,
    },
    [MQ.L]: {
      marginLeft: GRID_MARGIN.L,
    },
  },
  title: [
    typography.primaryHeadline,
    {
      ':hover': {
        color: COLORS.GLOBAL.ORANGE,
      },
      alignItems: 'baseline',
      display: 'flex',
      marginBottom: 3,
    },
  ],
};

export default styles;
