import { css } from '@emotion/core';

import { COLORS, GRID_MARGIN, MQ, RADIUS, SPACING } from '~/lib/constants';

const styles = {
  container: css({
    backgroundColor: COLORS.LIGHT.OFF_WHITE,
    flex: 1,
    paddingBottom: 20,
    paddingTop: 30,
    position: 'relative',

    [MQ.M]: {
      paddingBottom: 25,
      paddingTop: 40,
    },
    [MQ.L]: {
      paddingBottom: 60,
    },
  }),
  description: css({
    color: COLORS.LIGHT.GRAY_70,
  }),
  eyebrow: css({
    alignItems: 'baseline',
    background: COLORS.GLOBAL.BLACK,
    borderRadius: RADIUS.RADIUS_5,
    color: COLORS.GLOBAL.WHITE,
    display: 'inline-flex',
    marginBottom: SPACING.SIZE_10,
    padding: `${SPACING.SIZE_01}px 6px`,
  }),
  scenery: css({
    bottom: 0,
    left: 0,
    position: 'absolute',
    width: '100%',
  }),
  title: css({
    marginBottom: SPACING.SIZE_10,

    [MQ.M]: {
      marginBottom: SPACING.SIZE_20,
    },

    strong: {
      color: COLORS.GLOBAL.ORANGE,
    },
  }),
  vehicle: css({
    bottom: 0,
    position: 'absolute',
    right: GRID_MARGIN.S,

    [MQ.M]: {
      right: GRID_MARGIN.M,
    },
    [MQ.L]: {
      right: GRID_MARGIN.L,
    },
    [MQ.XL]: {
      right: GRID_MARGIN.XL,
    },
  }),
  weather: css({
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
  }),
};

export default styles;
