import {
  Breakpoint,
  COLORS,
  CSSObjectType,
  EASING,
  GRID_MARGIN,
  MODAL_ANIMATION,
  MODAL_THEME,
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
} from '~/styles/animations.styles';
import { hideScrollbar } from '~/styles/document/accessibility.styles';

import { OVERLAY_PANEL_WIDTH } from './Modal.styles';

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

export const overlayBkStyles: Record<Breakpoint, CSSObjectType> = {
  /* eslint-disable sort-keys */
  S: SLIDE_DOWN,
  M: FADE,
  L: FADE,
  XL: FADE,
  /* eslint-enable sort-keys */
};

export const CONTENT_LATERAL_PADDING: { [key: string]: number } = {
  S: SPACING.SIZE_20,
  M: SPACING.SIZE_40,
  L: SPACING.SIZE_60,
};

const styles: StylesMap = {
  [MODAL_THEME.DARK]: {
    background: COLORS.GLOBAL.BLACK,
    color: COLORS.DARK.GRAY_40,
  },
  [MODAL_THEME.LIGHT]: {
    background: COLORS.GLOBAL.WHITE,
    color: COLORS.GLOBAL.BLACK,
  },
  [MODAL_THEME.ORANGE]: {
    background: COLORS.GLOBAL.ORANGE,
    color: COLORS.GLOBAL.WHITE,
  },
  [MODAL_ANIMATION.FADE]: FADE,
  content: {
    position: 'relative',
    [MQ.S]: {
      padding: `${SPACING.SIZE_30}px ${CONTENT_LATERAL_PADDING.S}px ${SPACING.SIZE_60}px `,
    },
    [MQ.M]: {
      padding: `${SPACING.SIZE_30}px ${CONTENT_LATERAL_PADDING.M}px ${SPACING.SIZE_40}px `,
    },
  },
  root: [
    hideScrollbar,
    {
      background: COLORS.GLOBAL.WHITE,
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
        borderRadius: RADIUS.RADIUS_15,
        margin: 'auto',
        maxHeight: `calc(100vh - ${GRID_MARGIN.M}px)`,
        maxWidth: OVERLAY_PANEL_WIDTH,
        minWidth: 400,
        position: 'relative',
        top: '50%',
        transform: 'translateY(-50%)',
      },
    },
  ],
};

export default styles;
