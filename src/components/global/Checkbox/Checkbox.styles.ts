import { BORDERS, COLORS, RADIUS, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const INPUT_HEIGHT = 20;
const INDICATOR_SIZE = 10;

const styles: StylesMap = {
  container: {
    border: BORDERS.SOLID_GRAY_LIGHT_1PX,
    borderRadius: RADIUS.RADIUS_5,
    flexShrink: 0,
    height: INPUT_HEIGHT,
    overflow: 'hidden',
    position: 'relative',
    width: INPUT_HEIGHT,
  },
  containerChecked: {
    borderColor: COLORS.GLOBAL.ORANGE,
    background: COLORS.GLOBAL.ORANGE,
  },
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
    '> span': {
      height: '100%',
      justifyContent: 'center',
      svg: {
        height: INDICATOR_SIZE,
        width: INDICATOR_SIZE,
      },
    },
    borderColor: COLORS.GLOBAL.ORANGE,
    borderRadius: RADIUS.RADIUS_5,
    color: COLORS.GLOBAL.WHITE,
    display: 'block',
    height: INPUT_HEIGHT,
    left: -1,
    opacity: 0,
    position: 'relative',
    top: -1,
    width: INPUT_HEIGHT,
  },
  indicatorChecked: {
    background: COLORS.GLOBAL.ORANGE,
    opacity: 1,
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
  rootActive: {
    color: COLORS.GLOBAL.ORANGE,
  },
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
