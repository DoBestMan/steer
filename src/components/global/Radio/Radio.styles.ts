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
    ':focus': {
      '+ span': {
        outline: BORDERS.FOCUS_STATE,
      },
    },
    appearance: 'none',
    opacity: 0,
    position: 'absolute',
  },
  label: {
    paddingRight: SPACING.SIZE_10,
  },
  optionsLabel: {
    paddingLeft: SPACING.SIZE_10,
  },
  optionsRoot: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    width: '100%',
  },
  optionsText: [
    typography.bodyCopyTight,
    {
      color: COLORS.LIGHT.GRAY_70,
      paddingLeft: SPACING.SIZE_15,
    },
  ],
  optionsTextWrapper: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
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
  storybookContainer: {
    marginBottom: SPACING.SIZE_15,
  },
  titleRoot: {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
};

export default styles;
