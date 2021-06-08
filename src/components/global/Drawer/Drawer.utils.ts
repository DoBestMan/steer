import { CSSStyles, EASING, StylesMap, TIME } from '~/lib/constants';

import { AnchorType } from './Drawer';

export const calculateStyle = (
  anchor: AnchorType,
  initialPosition: number,
  containerHeight: number,
) => {
  return {
    ...(anchor === 'left' && {
      left: `calc(${initialPosition}px - ${containerHeight}px)`,
    }),
    ...(anchor === 'right' && {
      right: `calc(${initialPosition}px - ${containerHeight}px)`,
    }),
    ...(anchor === 'top' && {
      height: 'auto',
      left: 0,
      maxHeight: '100%',
      right: 0,
      top: `calc(${initialPosition}px - ${containerHeight}px)`,
    }),
    ...(anchor === 'bottom' && {
      bottom: 'auto',
      height: 'auto',
      left: 0,
      maxHeight: '100%',
      right: 0,
      top: `calc(100% - ${initialPosition}px)`,
    }),
  } as StylesMap;
};

export const calculateLayout = (anchor: AnchorType): CSSStyles | undefined => {
  if (anchor === 'bottom' || anchor === 'top') {
    return;
  }

  return {
    display: 'flex',
    flexDirection: 'column',
  };
};

export const calculateAnimations = (
  anchor: AnchorType,
  initialPosition: number,
): CSSStyles => {
  switch (anchor) {
    case 'top':
      return {
        transform: `translate3d(0, calc(100% - ${initialPosition}px), 0)}`,
        transition: `transform ${TIME.MS350}ms ${EASING.CUBIC_EASE_IN}`,
      };
    case 'right':
      return {
        transform: `translate3d(calc(-100% + ${initialPosition}px), 0, 0)}`,
        transition: `transform ${TIME.MS350}ms ${EASING.CUBIC_EASE_IN}`,
      };
    case 'bottom': {
      return {
        transform: `translate3d(0, calc(-100% + ${initialPosition}px), 0)}`,
        transition: `transform ${TIME.MS350}ms ${EASING.CUBIC_EASE_IN}`,
      };
    }
    case 'left':
      return {
        transform: `translate3d(calc(100% + ${initialPosition}px), 0, 0)}`,
        transition: `transform ${TIME.MS350}ms ${EASING.CUBIC_EASE_IN}`,
      };
  }
};
