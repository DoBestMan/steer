import { BORDERS, COLORS, RADIUS, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const RADIO_BORDER = BORDERS.SOLID_ORANGE_1PX;
const INPUT_HEIGHT = 20;
const INNER_SIZE = INPUT_HEIGHT / 2;

export const styles: StylesMap = {
  copyLabel: [
    typography.bodyCopy,
    {
      color: COLORS.LIGHT.GRAY_70,
      marginLeft: SPACING.SIZE_10,
    },
  ],
  copyRoot: {
    display: 'flex',
  },
  disabledIndicator: {
    opacity: 0.2,
  },
  disabledLabel: {
    opacity: 0.1,
  },
  indicator: {
    border: RADIO_BORDER,
    borderColor: COLORS.LIGHT.GRAY_LIGHT_SOLID,
    borderRadius: RADIUS.CIRCLE,
    height: INPUT_HEIGHT,
    overflow: 'hidden',
    position: 'relative',
    width: INPUT_HEIGHT,
  },
  indicatorActive: {
    alignItems: 'center',
    background: COLORS.GLOBAL.WHITE,
    borderColor: COLORS.GLOBAL.ORANGE,
    display: 'flex',
    justifyContent: 'center',
  },
  innerRadio: {
    background: COLORS.GLOBAL.ORANGE,
    border: RADIO_BORDER,
    borderRadius: RADIUS.CIRCLE,
    height: INNER_SIZE,
    width: INNER_SIZE,
  },
  input: {
    appearance: 'none',
    opacity: 0,
    ':focus': {
      '+ span': {
        outline: BORDERS.FOCUS_STATE,
      },
    },
  },
  rootActive: { color: COLORS.GLOBAL.ORANGE },
  rootHover: {
    ':hover': {
      span: {
        borderColor: COLORS.DARK.GRAY_DARK_SOLID,
      },
    },
  },
  titleRoot: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

export default styles;
