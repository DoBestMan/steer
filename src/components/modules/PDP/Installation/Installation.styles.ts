import {
  BORDERS,
  COLORS,
  GAP_COLUMNS,
  MQ,
  SPACING,
  StylesMap,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  description: [
    typography.bodyCopy,

    {
      color: COLORS.LIGHT.GRAY_70,
      marginBottom: SPACING.SIZE_20,

      [MQ.M]: {
        marginBottom: 0,
      },
    },
  ],
  descriptionLink: {
    opacity: 0.7,
    display: 'inline-block',
  },
  headline: [
    typography.primaryHeadline,
    {
      color: COLORS.GLOBAL.BLACK,
    },
  ],
  illustration: {
    borderBottom: BORDERS.SOLID_GRAY_20_1PX,
    height: 102,
    marginBottom: SPACING.SIZE_30,
    marginTop: SPACING.SIZE_60,

    [MQ.M]: {
      marginBottom: SPACING.SIZE_40,
      marginTop: SPACING.SIZE_40,
    },

    [MQ.XL]: {
      height: 175,
      marginBottom: 0,
      marginTop: SPACING.SIZE_70,
    },
  },
  subtitle: [
    typography.primarySubhead,

    {
      color: COLORS.LIGHT.GRAY_70,
      display: 'flex',
      marginBottom: 3,
    },
  ],
  subtitleIcon: {
    height: 20,
    width: 20,
  },
  title: [
    typography.primaryHeadline,
    {
      color: COLORS.GLOBAL.ORANGE,

      [MQ.L]: {
        marginRight: -GAP_COLUMNS.XL,
        marginBottom: GAP_COLUMNS.XL,
      },
    },
  ],
};

export default styles;
