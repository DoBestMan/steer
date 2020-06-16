import { BORDERS, COLORS, RADIUS, StylesMap } from '~/lib/constants';

const RADIO_SIZE = 25;
const RADIO_BORDER = `2px solid ${COLORS.GLOBAL.ORANGE}`;
const INNER_SIZE = 13;

const styles: StylesMap = {
  indicator: {
    background: COLORS.LIGHT.GRAY_20,
    border: RADIO_BORDER,
    borderColor: 'transparent',
    borderRadius: RADIUS.CIRCLE,
    height: RADIO_SIZE,
    overflow: 'hidden',
    position: 'relative',
    width: RADIO_SIZE,
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
  root: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  rootActive: { color: COLORS.GLOBAL.ORANGE },
};

export default styles;
