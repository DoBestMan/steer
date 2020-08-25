import {
  BORDERS,
  COLORS,
  MQ,
  RADIUS,
  SPACING,
  StylesMap,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const INPUT_HEIGHT = 20;
const INDICATOR_SIZE = 10;

const styles: StylesMap = {
  checkbox: {
    display: 'flex',
    paddingTop: SPACING.SIZE_01,
    [MQ.M]: {
      paddingTop: 4,
    },
    [MQ.L]: {
      paddingTop: SPACING.SIZE_01,
    },
  },
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
  disabled: {
    pointerEvents: 'none',
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
  label: {
    paddingRight: SPACING.SIZE_10,
  },
  rootActive: {
    color: COLORS.GLOBAL.ORANGE,
  },
  rootHover: {
    ':hover&:not(:disabled)': {
      span: {
        borderColor: COLORS.DARK.GRAY_DARK_SOLID,
      },
    },
  },
  titleRoot: {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
};

export default styles;
