import {
  ENTERED,
  ENTERING,
  EXITED,
  EXITING,
} from 'react-transition-group/Transition';

import {
  COLORS,
  EASING,
  GAP_COLUMNS,
  MQ,
  SPACING,
  StylesMap,
  TIME,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

import { VEHICLE_CONTAINER_DURATION } from './ConfirmFitInsight.utils';

export const animations = {
  /* eslint-disable sort-keys */
  [`vehicleContainer_${ENTERING}`]: {
    transform: 'translate3d(-50vw, 0, 0)',
  },
  [`vehicleContainer_${ENTERED}`]: {
    transform: 'translate3d(100vw, 0, 0)',
  },
  [`vehicleContainer_${EXITING}`]: {
    transform: 'translate3d(100vw, 0, 0)',
  },
  [`vehicleContainer_${EXITED}`]: {
    transform: 'translate3d(100vw, 0, 0)',
  },
  [`vehicle_${ENTERING}`]: {
    opacity: 0,
  },
  [`vehicle_${ENTERED}`]: {
    opacity: 1,
  },
  [`vehicle_${EXITING}`]: {
    opacity: 0,
  },
  [`vehicle_${EXITED}`]: {
    opacity: 0,
  },
  [`detailsContainer_${ENTERING}`]: {
    opacity: 0,
  },
  [`detailsContainer_${ENTERED}`]: {
    opacity: 1,
  },
  [`detailsContainer_${EXITING}`]: {
    opacity: 0,
  },
  [`detailsContainer_${EXITED}`]: {
    opacity: 0,
  },
  /* eslint-enable sort-keys */
};

export const styles: StylesMap = {
  car: {
    alignItems: 'center',
    display: 'flex',
    height: 120,
    justifyContent: 'center',
    span: {
      height: 80,
      width: 100,
    },
    svg: {
      height: 'auto',
      maxHeight: '100%',
      width: '100%',
    },
    width: 140,
  },
  chevron: {
    marginLeft: 'auto',
  },
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.GLOBAL.WHITE,
    color: COLORS.GLOBAL.BLACK,
    cursor: 'pointer',
    display: 'flex',
    minHeight: SPACING.SIZE_70,
    paddingLeft: GAP_COLUMNS.S,
    paddingRight: GAP_COLUMNS.S,
    position: 'relative',
    transition: `background-color ${TIME.MS100}ms ${EASING.QUAD_EASE_OUT}`,
    [MQ.M]: {
      paddingLeft: GAP_COLUMNS.M,
      paddingRight: GAP_COLUMNS.M,
    },
    [MQ.L]: {
      paddingLeft: SPACING.SIZE_40,
      paddingRight: SPACING.SIZE_40,
    },
  },
  defaultContainer: {
    backgroundColor: COLORS.ORANGE.SHADE_15_SOLID,
  },
  defaultType: {
    color: COLORS.GLOBAL.WHITE,
  },
  detailsContainer: {
    alignItems: 'center',
    display: 'flex',
    transition: `opacity ${TIME.MS2000}ms ${EASING.CUBIC_EASE_OUT}`,
    width: '100%',
    willTransform: 'opacity',
    [MQ.XL]: {
      transition: `opacity ${TIME.MS1000}ms ${EASING.CUBIC_EASE_OUT}`,
    },
  },
  fitsContainer: {
    ':hover, :focus': {
      backgroundColor: COLORS.LIGHT.GRAY_20,
    },
    backgroundColor: COLORS.LIGHT.GRAY_10,
  },
  icon: {
    alignItems: 'center',
    display: 'flex',
    height: 24,
    justifyContent: 'center',
    span: {
      height: 20,
      width: 26,
    },
    svg: {
      height: 'auto',
      maxHeight: '100%',
      width: '100%',
    },
    width: 26,
  },
  iconContainer: {
    minHeight: SPACING.SIZE_70,
    paddingLeft: GAP_COLUMNS.S,
    paddingRight: GAP_COLUMNS.S,
    position: 'absolute',
    right: 0,
    [MQ.M]: {
      paddingLeft: GAP_COLUMNS.M,
      paddingRight: GAP_COLUMNS.M,
    },
    [MQ.L]: {
      paddingLeft: SPACING.SIZE_40,
      paddingRight: SPACING.SIZE_40,
    },
  },
  label: [
    typography.primarySubhead,
    {
      flexGrow: 1,
      paddingLeft: SPACING.SIZE_25,
      paddingRight: SPACING.SIZE_25,
      whiteSpace: 'pre-line',
    },
  ],
  storyBookConfirmInsightComp: {
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
  },
  storyBookContainer: {
    display: 'flex',
  },
  storyBookRadio: {
    marginBottom: SPACING.SIZE_20,
    paddingBottom: SPACING.SIZE_25,
    paddingRight: SPACING.SIZE_20,
  },
  vehicle: {
    transition: `opacity ${TIME.MS2000}ms ${EASING.CUBIC_EASE_OUT}`,
    willTransform: 'opacity',
  },
  vehicleContainer: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    transition: `transform ${VEHICLE_CONTAINER_DURATION.S}ms ${EASING.CUBIC_EASE_OUT}`,
    willTransform: 'translate',
    [MQ.M]: {
      transition: `transform ${VEHICLE_CONTAINER_DURATION.M}ms ${EASING.CUBIC_EASE_OUT}`,
    },
    [MQ.XL]: {
      transition: `transform ${VEHICLE_CONTAINER_DURATION.XL}ms ${EASING.CUBIC_EASE_OUT}`,
    },
  },
};
