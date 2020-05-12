import { css } from '@emotion/core';

import { BORDERS, COLORS, MQ, SPACING } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import { NAV_CONTENT_HEIGHT } from '../Nav.styles';

const styles = {
  button: css({
    alignItems: 'center',
    color: COLORS.LIGHT.GRAY_70,
    display: 'flex',
    [MQ.L]: {
      '&::after': {
        content: `"${ui('common.header.searchShortLabel')}"`,
      },
      borderBottom: BORDERS.SOLID_GRAY_20_1PX,
      height: NAV_CONTENT_HEIGHT,
      paddingBottom: SPACING.SIZE_20,
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
      marginRight: SPACING.SIZE_10,
    },
  }),
};

export default styles;
