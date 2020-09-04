import { COLORS, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const CONSTANTS = {
  OPACITY_ACTIVE: 0.8,
  OPACITY_DISABLED: 0.4,
  SIZE: 50,
};

const styles: StylesMap = {
  disabled: {
    opacity: CONSTANTS.OPACITY_DISABLED,
    pointerEvents: 'none',
  },
  inheritBorder: {
    borderBottom: '2px dotted',
    borderBottomColor: 'inherit',
  },
  inheritBorderColor: {
    borderBottomColor: 'inherit',
  },
  inheritFocusBorder: {
    borderBottom: '2px dotted transparent',

    '&:hover, &:focus, &:active': {
      borderBottomColor: 'inherit',
    },
  },
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
        span: {
          color: COLORS.GLOBAL.BLACK,
          borderBottom: '2px dotted',
          borderBottomColor: 'inherit',
        },
      },
      backgroundColor: 'transparent',
      color: COLORS.LIGHT.GRAY_70,
      paddingBottom: SPACING.SIZE_05,
      paddingTop: SPACING.SIZE_05,
      position: 'relative',
    },
  ],
  optionFocused: {
    color: COLORS.GLOBAL.ORANGE,
  },
  optionSelected: {
    color: COLORS.GLOBAL.ORANGE,
  },
};

export default styles;
