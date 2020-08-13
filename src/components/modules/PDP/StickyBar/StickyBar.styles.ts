import { MQ, StylesMap, TIME } from '~/lib/constants';

import { STICKY_BAR_HEIGHT } from '../../StickyBar/StickyBar.styles';

const styles: StylesMap = {
  root: {
    height: 0,
    pointerEvents: 'none',
    transform: 'translateY(100%)',
    transition: `transform ${TIME.MS400}ms ease, height 0s linear ${TIME.MS400}ms`,

    // eslint-disable-next-line sort-keys
    '&[aria-hidden="false"]': {
      height: STICKY_BAR_HEIGHT.S,
      pointerEvents: 'auto',
      transform: 'translateY(0)',
      transition: `transform ${TIME.MS400}ms ease`,

      [MQ.M]: {
        height: STICKY_BAR_HEIGHT.M,
      },

      [MQ.L]: {
        height: STICKY_BAR_HEIGHT.L,
      },
    },
  },
};

export default styles;
