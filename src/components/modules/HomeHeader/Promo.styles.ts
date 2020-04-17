import { css } from '@emotion/core';

import { COLORS, RADIUS, SPACING } from '~/lib/constants';

const styles = {
  container: css({
    alignItems: 'baseline',
    background: COLORS.GLOBAL.BLACK,
    borderRadius: RADIUS.RADIUS_5,
    color: COLORS.GLOBAL.WHITE,
    display: 'inline-flex',
    marginBottom: SPACING.SIZE_10,
    padding: `${SPACING.SIZE_01}px 6px`,
  }),
  countdown: css({
    alignItems: 'baseline',
    color: COLORS.DARK.GRAY_40,
    display: 'flex',

    // eslint-disable-next-line sort-keys
    ':before': {
      alignSelf: 'center',
      background: 'currentColor',
      borderRadius: RADIUS.CIRCLE,
      content: '""',
      display: 'inline-block',
      height: 3,
      margin: '0 6px',
      width: 3,
    },
  }),
};

export default styles;
