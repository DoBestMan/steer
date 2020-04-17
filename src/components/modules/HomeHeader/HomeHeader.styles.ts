import { css } from '@emotion/core';

import { COLORS, GRID_MARGIN, MQ, SPACING } from '~/lib/constants';

const CONSTANTS = {
  CONTAINER_BG_BOTTOM: {
    M: 50,
    S: 20,
    XL: 25,
  },
  CONTAINER_BG_HEIGHT: {
    M: 175,
    S: 106,
    XL: 206,
  },
  VEHICLE_WIDTH: {
    M: 223,
    S: 128,
    XL: 288,
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

    [MQ.M]: {
      backgroundPosition: `left 0 bottom ${CONSTANTS.CONTAINER_BG_BOTTOM.M}px`,
      backgroundSize: `auto ${CONSTANTS.CONTAINER_BG_HEIGHT.M}px`,
      paddingBottom: 210,
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
    },
    [MQ.XL]: {
      right: GRID_MARGIN.XL,
      width: CONSTANTS.VEHICLE_WIDTH.XL,
    },
  }),
};

export default styles;
