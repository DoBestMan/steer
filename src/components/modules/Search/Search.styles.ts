import {
  ENTERED,
  ENTERING,
  EXITED,
  EXITING,
} from 'react-transition-group/Transition';

import {
  COLORS,
  CSSObjectType,
  MQ,
  SPACING,
  StylesMap,
  TIME,
  Z_INDEX,
} from '~/lib/constants';

const animationStyles: CSSObjectType = {
  [`searchSectionWrapper_${ENTERING}`]: {
    opacity: 1,
  },
  [`searchSectionWrapper_${ENTERED}`]: {
    opacity: 1,
  },
  [`searchSectionWrapper_${EXITING}`]: {
    opacity: 0,
  },
  [`searchSectionWrapper_${EXITED}`]: {
    opacity: 0,
  },
};

const styles: StylesMap = {
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
    height: '100vh',
    overflowY: 'auto',
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
  pastSearchBullet: {
    display: 'none',
    margin: `0 ${SPACING.SIZE_10}px`,
    [MQ.M]: {
      display: 'block',
    },
  },
  searchSectionWrapper: {
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
  ...animationStyles,
};

export default styles;
