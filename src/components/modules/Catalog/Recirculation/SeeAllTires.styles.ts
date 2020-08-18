import { COLORS, GRID_MARGIN, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
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
    typography.secondaryHeadline,
    {
      ':hover': {
        color: COLORS.GLOBAL.ORANGE,
      },
      alignItems: 'baseline',
      display: 'flex',
      marginBottom: 3,
      span: {
        ':first-of-type': {
          marginRight: SPACING.SIZE_10,
        },
        marginBottom: SPACING.SIZE_02,
      },
    },
  ],
};

export default styles;
