import { css } from '@emotion/core';

import { Z_INDEX } from '~/lib/constants';

const styles = {
  container: css({
    height: '100%',
    left: 0,
    pointerEvents: 'none',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: Z_INDEX.TOP,
  }),
  grid: css({
    height: '100%',
  }),
  item: css({
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    height: '100%',
  }),
};

export default styles;
