import { css } from '@emotion/core';

import { COLORS } from '~/lib/constants';

export const styles = {
  containerFullbleed: css({
    backgroundColor: COLORS.LIGHT.GRAY_70,
    color: COLORS.GLOBAL.WHITE,
    padding: 50,
  }),
  containerText: css({
    backgroundColor: COLORS.LIGHT.OFF_WHITE,
  }),
};
