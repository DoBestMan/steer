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
  option: [
    typography.bodyCopy,
    {
      '& button::after': {
        content: '""',
        height: '100%',
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%',
      },
      '&:hover': {
        backgroundColor: COLORS.LIGHT.GRAY_20,
      },
      backgroundColor: COLORS.LIGHT.GRAY_10,
      border: BORDERS.SOLID_TRANSPARENT_2PX,
      borderRadius: RADIUS.RADIUS_15,
      marginBottom: SPACING.SIZE_02,
      padding: SPACING.SIZE_20,
      [MQ.M]: {
        padding: `${SPACING.SIZE_20}px ${SPACING.SIZE_30}px`,
      },
      position: 'relative',
    },
  ],
  optionFocused: {
    backgroundColor: COLORS.LIGHT.GRAY_20,
  },
  optionSelected: {
    backgroundColor: COLORS.LIGHT.GRAY_20,
  },
};

export default styles;
