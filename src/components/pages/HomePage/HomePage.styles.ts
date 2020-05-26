import { css } from '@emotion/core';

import { COLORS, EASING, MQ, SPACING, TIME } from '~/lib/constants';

export const CONTENT_PADDING = {
  S: SPACING.SIZE_80,
  M: SPACING.SIZE_100,
  XL: SPACING.SIZE_120,
};

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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '66.666vh',
    overflow: 'hidden',
  }),
  scrollColorContainer: css({
    transition: `background-color ${TIME.MS300}ms ease-in-out`,
  }),
};

export default styles;
