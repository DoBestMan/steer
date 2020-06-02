import { CSSObject } from '@emotion/core';
import {
  ENTERED,
  ENTERING,
  EXITED,
  EXITING,
} from 'react-transition-group/Transition';

import { COLORS, MQ, SPACING, TIME, Z_INDEX } from '~/lib/constants';

const animationStyles: CSSObject = {
  /* eslint-disable sort-keys */
  [`initialSearchWrapper_${ENTERING}`]: {
    opacity: 1,
  },
  [`initialSearchWrapper_${ENTERED}`]: {
    opacity: 1,
  },
  [`initialSearchWrapper_${EXITING}`]: {
    opacity: 0,
  },
  [`initialSearchWrapper_${EXITED}`]: {
    opacity: 0,
  },
  /* eslint-enable sort-keys */
};

const styles: CSSObject = {
  clearPastSearchesButton: {
    span: {
      borderBottom: `2px dotted ${COLORS.LIGHT.GRAY_70}`,
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
  initialSearchWrapper: {
    padding: `${SPACING.SIZE_15}px 0 ${SPACING.SIZE_25}px`,
    position: 'relative',
    transition: `opacity ${TIME.MS300}ms ease`,
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
  ...animationStyles,
};

export default styles;
