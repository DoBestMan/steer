import { css } from '@emotion/core';

import { COLORS, EASING, MQ, SPACING, TIME } from '~/lib/constants';

export const CONTENT_PADDING = {
  /* eslint-disable sort-keys */
  S: SPACING.SIZE_80,
  M: SPACING.SIZE_100,
  XL: SPACING.SIZE_120,
};
/* eslint-enable sort-keys */

const styles = {
  content: css({
    opacity: 0,
    paddingBottom: CONTENT_PADDING.S,

    [MQ.M]: {
      paddingBottom: CONTENT_PADDING.M,
    },

    [MQ.XL]: {
      paddingBottom: CONTENT_PADDING.XL,
    },
  }),
  contentVisible: {
    opacity: 1,
    transition: `opacity ${TIME.MS600}ms ${EASING.CUBIC_EASE_OUT}`,
  },
  root: css({
    background: COLORS.LIGHT.OFF_WHITE,
  }),
  scrollColorContainer: css({
    transition: `background-color ${TIME.MS300}ms ease-in-out`,
  }),
};

export default styles;
