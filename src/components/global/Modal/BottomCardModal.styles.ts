import {
  Breakpoint,
  COLORS,
  CSSObjectType,
  EASING,
  GRID_MARGIN,
  MODAL_ANIMATION,
  MQ,
  RADIUS,
  SPACING,
  StylesMap,
  TIME,
} from '~/lib/constants';
import {
  fadeIn,
  fadeInUp,
  fadeOut,
  fadeOutDown,
  slideFadeInLeft,
  slideFadeOutLeft,
} from '~/styles/animations.styles';
import { hideScrollbar } from '~/styles/document/accessibility.styles';

import { OVERLAY_BOX_SHADOW, OVERLAY_PANEL_WIDTH } from './Modal.styles';

const FADE: CSSObjectType = {
  default: {
    animation: `${fadeOut} ${TIME.MS350}ms ease-in`,
  },
  open: {
    animation: `${fadeIn} ${TIME.MS350}ms ${EASING.CUBIC_EASE_IN}`,
  },
};

const SLIDE_DOWN: CSSObjectType = {
  default: {
    animation: `${fadeOutDown} ${TIME.MS350}ms ease-in`,
  },
  open: {
    animation: `${fadeInUp} ${TIME.MS350}ms ease-in`,
  },
};

const SLIDE_LEFT: CSSObjectType = {
  default: {
    animation: `${slideFadeOutLeft} ${TIME.MS350}ms ease-in`,
  },
  open: {
    animation: `${slideFadeInLeft} ${TIME.MS350}ms ease-in`,
  },
};

export const overlayBkStyles: Record<Breakpoint, CSSObjectType> = {
  /* eslint-disable sort-keys */
  S: SLIDE_DOWN,
  M: FADE,
  L: SLIDE_LEFT,
  XL: SLIDE_LEFT,
  /* eslint-enable sort-keys */
};

export const CONTENT_LATERAL_PADDING: { [key: string]: number } = {
  S: SPACING.SIZE_20,
  M: SPACING.SIZE_40,
  L: SPACING.SIZE_60,
};

// Common rules that help style the modal's vertical layout
export const modalContainerStyles: StylesMap = {
  container: {
    paddingTop: SPACING.SIZE_30,

    [MQ.L]: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      paddingBottom: SPACING.SIZE_20,
      paddingTop: SPACING.SIZE_60,
    },
  },
  ctaGroup: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'center',

    /* eslint-disable sort-keys */
    '> :only-child': {
      width: '100%',
      justifyContent: 'center',
    },

    '> :not(:only-child):first-of-type': {
      marginLeft: SPACING.SIZE_10,

      [MQ.L]: {
        marginLeft: 0,
        marginBottom: SPACING.SIZE_10,
      },
    },
    /* eslint-enable sort-keys */

    [MQ.L]: {
      display: 'block',
      marginTop: 'auto',
    },
  },
};

const styles: StylesMap = {
  [MODAL_ANIMATION.FADE]: FADE,
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: `0 ${-SPACING.SIZE_10}px`,
  },
  close: {
    color: COLORS.LIGHT.GRAY_70,
    position: 'absolute',
    top: SPACING.SIZE_20 + 4,
    [MQ.S]: {
      right: SPACING.SIZE_15,
    },
    [MQ.M]: {
      right: SPACING.SIZE_35,
      top: 34,
    },
  },
  closeSlider: {
    borderBottom: `3px solid ${COLORS.LIGHT.GRAY_LIGHTER_SOLID}`,
    cursor: 'grab',
    height: 12,
    left: '50%',
    position: 'absolute',
    top: 4,
    transform: 'translate(-50%, 0)',
    width: 40,
  },
  content: {
    position: 'relative',
    [MQ.S]: {
      padding: `${SPACING.SIZE_30}px ${CONTENT_LATERAL_PADDING.S}px`,
    },
    [MQ.M]: {
      padding: CONTENT_LATERAL_PADDING.M,
    },
    [MQ.L]: {
      padding: `${SPACING.SIZE_40}px ${CONTENT_LATERAL_PADDING.L}px`,
    },
  },
  root: [
    hideScrollbar,
    {
      background: COLORS.GLOBAL.WHITE,
      boxShadow: OVERLAY_BOX_SHADOW,
      color: COLORS.GLOBAL.BLACK,
      overflowY: 'auto',
      [MQ.S]: {
        borderRadius: `${RADIUS.RADIUS_15} ${RADIUS.RADIUS_15} 0 0`,
        bottom: 0,
        maxHeight: '100%',
        position: 'absolute',
        width: '100%',
      },
      [MQ.M]: {
        borderRadius: RADIUS.RADIUS_15,
        margin: 'auto',
        maxHeight: `calc(100vh - ${GRID_MARGIN.M}px)`,
        maxWidth: OVERLAY_PANEL_WIDTH,
        minWidth: 400,
        position: 'relative',
        top: '50%',
        transform: 'translateY(-50%)',
      },
      [MQ.L]: {
        borderRadius: 0,
        bottom: 0,
        height: '100%',
        maxHeight: 'none',
        position: 'absolute',
        right: 0,
        top: 0,
        transform: 'none',
        width: OVERLAY_PANEL_WIDTH,
      },
    },
  ],
};

export default styles;
