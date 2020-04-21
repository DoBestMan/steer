import { css } from '@emotion/core';

import { COLORS, SPACING, RADIUS } from '~/lib/constants';

export const styles = {
  colors: css({
    minHeight: '100vh',
    padding: SPACING.SIZE_50,
  }),
  colorsContainer: css({
    display: 'flex',
    div: {
      '&:not(:last-of-type)': {
        marginRight: SPACING.SIZE_30,
      },
      borderRadius: RADIUS.RADIUS_15,
      height: 160,
      width: '33%',
    },
    maxWidth: 900,
  }),
  containerFullbleed: css({
    backgroundColor: COLORS.LIGHT.GRAY_70,
    color: COLORS.GLOBAL.WHITE,
    padding: SPACING.SIZE_50,
  }),
  containerText: css({
    backgroundColor: COLORS.LIGHT.OFF_WHITE,
  }),
};
