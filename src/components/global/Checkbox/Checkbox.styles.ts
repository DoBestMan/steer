import { CSSObject } from '@emotion/core';

import { BORDERS, COLORS, RADIUS } from '~/lib/constants';

const CHECKBOX_HEIGHT = 20;

const styles: CSSObject = {
  container: {
    background: COLORS.LIGHT.GRAY_20,
    borderRadius: RADIUS.CIRCLE,
    flexShrink: 0,
    height: CHECKBOX_HEIGHT,
    overflow: 'hidden',
    position: 'relative',
    width: CHECKBOX_HEIGHT,
  },
  indicator: {
    '> span': {
      height: '100%',
      justifyContent: 'center',
      svg: {
        height: 6,
        width: 8,
      },
    },
    borderRadius: RADIUS.CIRCLE,
    color: COLORS.GLOBAL.WHITE,
    display: 'block',
    height: CHECKBOX_HEIGHT,
    opacity: 0,
    position: 'absolute',
    top: 0,
    width: CHECKBOX_HEIGHT,
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
  root: { alignItems: 'flex-start', display: 'flex', width: '100%' },
  rootChecked: { color: COLORS.GLOBAL.ORANGE },
};

export default styles;
