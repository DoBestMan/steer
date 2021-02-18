import {
  ENTERED,
  ENTERING,
  EXITED,
  EXITING,
} from 'react-transition-group/Transition';

import { COLORS, MQ, SPACING, StylesMap, TIME } from '~/lib/constants';

export const animationStyles = {
  [`listbox_${ENTERING}`]: {
    opacity: 0,
    transform: 'translateX(10%)',
  },
  [`listbox_${ENTERED}`]: {
    opacity: 1,
    transform: 'translateX(0)',
  },
  [`listbox_${EXITING}`]: {
    opacity: 1,
  },
  [`listbox_${EXITED}`]: {
    opacity: 0,
  },
};

const styles: StylesMap = {
  divider: {
    backgroundColor: COLORS.ORANGE.TINT_70,
    height: '1px',
    margin: '0px 20px',
    position: 'relative',
    [MQ.M]: {
      display: 'none',
    },
  },
  dividerLabel: {
    backgroundColor: COLORS.GLOBAL.ORANGE,
    color: COLORS.ORANGE.TINT_70,
    fontSize: '0.75rem',
    left: '50%',
    padding: '0 11px',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  listboxRoot: {
    listStyle: 'none',
    transition: `opacity ${TIME.MS600}ms ease, transform ${TIME.MS300}ms ease`,
  },
  searchResultsGridItem: {
    padding: `${SPACING.SIZE_20}px 0`,
    [MQ.M]: {
      padding: `${SPACING.SIZE_30}px 0`,
    },
    [MQ.L]: {
      padding: `${SPACING.SIZE_60}px 0 ${SPACING.SIZE_20}px`,
    },
  },
  ...animationStyles,
};

export default styles;
