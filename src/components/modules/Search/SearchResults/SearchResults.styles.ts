import {
  ENTERED,
  ENTERING,
  EXITED,
  EXITING,
} from 'react-transition-group/Transition';

import { MQ, SPACING, StylesMap, TIME } from '~/lib/constants';

const animationStyles = {
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
