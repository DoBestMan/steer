import {
  BORDERS,
  COLORS,
  MQ,
  RADIUS,
  SPACING,
  StylesMap,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  header: [
    {
      '&:hover': {
        backgroundColor: COLORS.LIGHT.GRAY_20,
      },
      backgroundColor: COLORS.LIGHT.GRAY_10,
      border: BORDERS.SOLID_TRANSPARENT_2PX,
      borderRadius: RADIUS.RADIUS_15,
      color: COLORS.LIGHT.GRAY_70,
      marginBottom: SPACING.SIZE_05,
      position: 'relative',
    },
  ],
  icon: {
    pointerEvents: 'none',
    position: 'absolute',
    right: SPACING.SIZE_20,
    top: 'calc(50% - 4px)',
    [MQ.M]: {
      right: SPACING.SIZE_30,
    },
  },
  placeholder: {
    color: COLORS.LIGHT.GRAY_20,
  },
  select: [
    typography.bodyCopy,
    {
      '&::after': {
        content: '""',
        height: '100%',
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%',
      },
      appearance: 'none',
      background: 'transparent',
      border: 'none',
      mozAppearance: 'none',
      padding: SPACING.SIZE_20,
      webkitAppearance: 'none',
      width: '100%',
      [MQ.M]: {
        padding: `${SPACING.SIZE_20}px ${SPACING.SIZE_30}px`,
      },
    },
  ],
  title: [
    typography.primaryHeadline,
    {
      marginBottom: SPACING.SIZE_20,
    },
  ],
  wrapper: {
    position: 'relative',
  },
};

export default styles;
