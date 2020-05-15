import { CSSObject } from '@emotion/core';

import { BORDERS, COLORS, MQ, SPACING, Z_INDEX } from '~/lib/constants';

const styles: CSSObject = {
  clearPastSearchesButton: {
    span: {
      borderBottom: BORDERS.DOTTED_TRANSPARENT_2PX,
    },
  },
  clearPastSearchesWrapper: {
    alignItems: 'baseline',
    display: 'flex',
    justifyContent: 'space-between',
    [MQ.M]: {
      justifyContent: 'flex-start',
    },
  },
  container: {
    backgroundColor: COLORS.GLOBAL.ORANGE,
    minHeight: '100vh',
    paddingBottom: SPACING.SIZE_50,
    width: '100%',
    zIndex: Z_INDEX.TOP,
    [MQ.M]: {
      paddingBottom: SPACING.SIZE_100,
    },
    [MQ.L]: {
      paddingBottom: SPACING.SIZE_160,
    },
  },
  initialSearchGridItem: {
    padding: `${SPACING.SIZE_15}px 0 ${SPACING.SIZE_25}px`,
    position: 'relative',
    [MQ.M]: {
      padding: `${SPACING.SIZE_30}px 0`,
    },
    [MQ.L]: {
      padding: `${SPACING.SIZE_70}px 0 ${SPACING.SIZE_10}px`,
    },
  },
  pastSearchBullet: {
    display: 'none',
    margin: `0 ${SPACING.SIZE_10}px`,
    [MQ.M]: {
      display: 'block',
    },
  },
};

export default styles;
