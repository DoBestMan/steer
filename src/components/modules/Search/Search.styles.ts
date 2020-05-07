import { css } from '@emotion/core';

import { BORDERS, COLORS, MQ, SPACING, Z_INDEX } from '~/lib/constants';

const styles = {
  closeSearchButton: {
    span: {
      borderBottom: BORDERS.DOTTED_TRANSPARENT_2PX,
    },
  },

  container: css({
    backgroundColor: COLORS.GLOBAL.ORANGE,
    height: '100vh',
    padding: `${SPACING.SIZE_25}px 0`,
    width: '100vw',
    zIndex: Z_INDEX.TOP,
    [MQ.M]: {
      padding: `${SPACING.SIZE_50}px 0`,
    },
  }),
};

export default styles;
