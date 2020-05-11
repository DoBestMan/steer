import { css } from '@emotion/core';

import { BORDERS, COLORS, MQ, SPACING } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

const styles = {
  button: css({
    color: COLORS.LIGHT.GRAY_70,
    [MQ.L]: {
      '&::after': {
        content: `"${ui('common.header.searchShortLabel')}"`,
      },
      borderBottom: BORDERS.SOLID_GRAY_20_1PX,
      padding: `${SPACING.SIZE_20}px 0`,
      textAlign: 'left',
      width: '100%',
    },
    [MQ.XL]: {
      '&::after': {
        content: `"${ui('common.header.searchLongLabel')}"`,
      },
    },
  }),
  icon: css({
    [MQ.L]: {
      color: COLORS.GLOBAL.ORANGE,
      display: 'inline-block',
      marginRight: SPACING.SIZE_10,
    },
  }),
};

export default styles;
