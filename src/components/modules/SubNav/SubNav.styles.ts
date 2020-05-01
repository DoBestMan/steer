import { css } from '@emotion/core';

import { COLORS, MQ, SPACING } from '~/lib/constants';

const styles = {
  action: css({
    padding: SPACING.SIZE_10,
  }),
  back: css({
    position: 'absolute',
    top: SPACING.SIZE_30,
  }),
  close: css({
    position: 'absolute',
    right: SPACING.SIZE_20,
    top: SPACING.SIZE_30,
  }),
  modal: {
    // full width modal
    border: 0,
    borderRadius: 0,
    bottom: 0,
    left: 0,
    padding: `0 ${SPACING.SIZE_20}px`,
    right: 0,
    top: 0,
  },
  root: css({
    height: '100%',
  }),
  subnav: css({
    [MQ.S]: {
      backgroundColor: COLORS.LIGHT.OFF_WHITE,
      padding: `0 ${SPACING.SIZE_20}px`,
    },
    [MQ.M]: {
      backgroundColor: COLORS.GLOBAL.WHITE,
      padding: `0 ${SPACING.SIZE_40}px`,
    },
    [MQ.L]: {
      padding: `0 ${SPACING.SIZE_60}px`,
    },
  }),
};

export default styles;
