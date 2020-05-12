import { css } from '@emotion/core';

import { COLORS, GRID_MARGIN, MQ, RADIUS, SPACING } from '~/lib/constants';

const CONSTANTS = {
  CONTAINER_BG_BOTTOM: {
    /* eslint-disable sort-keys */
    S: 20,
    M: 50,
    XL: 25,
    /* eslint-enable sort-keys */
  },
  CONTAINER_BG_HEIGHT: {
    /* eslint-disable sort-keys */
    S: 106,
    M: 175,
    XL: 206,
    /* eslint-enable sort-keys */
  },
  VEHICLE_WIDTH: {
    /* eslint-disable sort-keys */
    S: 128,
    M: 223,
    L: 288,
    /* eslint-enable sort-keys */
  },
};

const styles = {
  container: css({
    backgroundColor: COLORS.LIGHT.OFF_WHITE,
    backgroundPosition: `left 0 bottom ${CONSTANTS.CONTAINER_BG_BOTTOM.S}px`,
    backgroundRepeat: 'repeat-x',
    backgroundSize: `auto ${CONSTANTS.CONTAINER_BG_HEIGHT.S}px`,
    paddingBottom: 170,
    position: 'relative',

    [MQ.S]: {
      paddingTop: SPACING.SIZE_40,
    },
    [MQ.M]: {
      backgroundPosition: `left 0 bottom ${CONSTANTS.CONTAINER_BG_BOTTOM.M}px`,
      backgroundSize: `auto ${CONSTANTS.CONTAINER_BG_HEIGHT.M}px`,
      paddingBottom: 210,
      paddingTop: SPACING.SIZE_30,
    },

    [MQ.L]: {
      paddingTop: SPACING.SIZE_50,
    },

    [MQ.XL]: {
      backgroundPosition: `left 0 bottom ${CONSTANTS.CONTAINER_BG_BOTTOM.XL}px`,
      backgroundSize: `auto ${CONSTANTS.CONTAINER_BG_HEIGHT.XL}px`,
      paddingBottom: 98,
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
    width: CONSTANTS.VEHICLE_WIDTH.S,

    [MQ.M]: {
      right: GRID_MARGIN.M,
      width: CONSTANTS.VEHICLE_WIDTH.M,
    },
    [MQ.L]: {
      right: GRID_MARGIN.L,
      width: CONSTANTS.VEHICLE_WIDTH.L,
    },
    [MQ.XL]: {
      right: GRID_MARGIN.XL,
    },
  }),
};

export default styles;
