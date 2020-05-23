import { css } from '@emotion/core';

import { COLORS, RADIUS, TIME } from '~/lib/constants';

const styles = {
  checked: css({
    transform: 'translateX(12px)',
  }),
  indicator: css({
    background: COLORS.GLOBAL.WHITE,
    borderRadius: RADIUS.CIRCLE,
    bottom: 2,
    content: '',
    height: 9,
    left: 2,
    position: 'absolute',
    transition: `${TIME.MS300}ms ease`,
    width: 9,
  }),
  slider: css({
    background: COLORS.ORANGE.SHADE_30,
    borderRadius: RADIUS.PILL,
    bottom: 0,
    cursor: 'pointer',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    transition: `${TIME.MS300}ms ease`,
  }),
  sliderActive: css({
    background: COLORS.GLOBAL.ORANGE,
  }),
  switch: css({
    display: 'inline-block',
    height: 13,
    position: 'relative',
    width: 25,
  }),
};

export default styles;
