import {
  BORDERS,
  COLORS,
  MQ,
  RADIUS,
  SPACING,
  StylesMap,
} from '~/lib/constants';
import { fontStyles, typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  checkmark: {
    background: COLORS.GLOBAL.ORANGE,
    borderRadius: RADIUS.CIRCLE,
    color: COLORS.GLOBAL.WHITE,
    height: 12,
    marginRight: SPACING.SIZE_05,
    marginTop: SPACING.SIZE_01,
    padding: 3,
    width: 12,

    [MQ.L]: {
      height: 20,
      marginRight: SPACING.SIZE_10,
      padding: 5,
      width: 20,
    },
  },
  container: {
    border: BORDERS.SOLID_GRAY_20_1PX,
    borderRadius: RADIUS.RADIUS_15,
    padding: SPACING.SIZE_20,

    [MQ.L]: {
      padding: SPACING.SIZE_30,
    },
  },
  details: [
    typography.labelCopy,
    {
      [MQ.M]: fontStyles(12, 20),
      [MQ.L]: fontStyles(15, 22),
    },
  ],
  items: [
    typography.labelCopyTight,

    {
      '> li': {
        display: 'flex',
        flex: '0 0 50%',
        marginBottom: SPACING.SIZE_15,
      },

      color: COLORS.LIGHT.GRAY_70,
      display: 'flex',
      flexWrap: 'wrap',
      listStyle: 'none',
      margin: 0,
      marginBottom: SPACING.SIZE_05,
      padding: 0,

      [MQ.M]: fontStyles(12, 15),
      [MQ.L]: {
        ...fontStyles(15, 20),
        marginBottom: SPACING.SIZE_15,
      },
    },
  ],
  title: [
    typography.primarySubhead,

    {
      color: COLORS.GLOBAL.BLACK,
      marginBottom: 14,
    },
  ],
};

export default styles;
