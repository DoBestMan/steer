import {
  Breakpoint,
  COLORS,
  CSSObjectType,
  EASING,
  GAP_COLUMNS,
  MODAL_ANIMATION,
  MODAL_THEME,
  MODAL_TYPE,
  MQ,
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

export const OVERLAY_BOX_SHADOW = '0px 4px 4px rgba(0, 0, 0, 0.25)';
export const OVERLAY_PANEL_WIDTH = 480;
export const FULLSCREEN_PADDINGS = {
  BOTTOM: SPACING.SIZE_60,
  RIGHT: SPACING.SIZE_20,
  TOP: SPACING.SIZE_10,
};

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
  S: SLIDE_DOWN,
  M: FADE,
  L: SLIDE_LEFT,
  XL: SLIDE_LEFT,
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
  [MODAL_TYPE.FULLSCREEN]: {
    background: COLORS.GLOBAL.WHITE,
    bottom: 0,
    height: '100%',
    left: 0,
    overflowY: 'scroll',
    position: 'relative',
    right: 0,
    top: 0,
    width: '100%',
  },
  [MODAL_TYPE.OVERLAY]: {
    background: COLORS.GLOBAL.WHITE,
    borderRadius: 0,
    bottom: 0,
    boxShadow: OVERLAY_BOX_SHADOW,
    height: '100%',
    padding: `${SPACING.SIZE_40}px ${SPACING.SIZE_60}px`,
    position: 'absolute',
    right: 0,
    top: 0,
    width: OVERLAY_PANEL_WIDTH,
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: `0 ${-SPACING.SIZE_10}px`,
  },
  close: {
    position: 'absolute',
    right: SPACING.SIZE_20,
    top: SPACING.SIZE_20,
    [MQ.M]: {
      top: SPACING.SIZE_35,
    },
  },
  fullScreenPadding: {
    padding: `${FULLSCREEN_PADDINGS.TOP}px ${FULLSCREEN_PADDINGS.RIGHT}px ${FULLSCREEN_PADDINGS.BOTTOM}px`,
  },
  halfscreen: {
    [MQ.L]: {
      width: `calc(50vw - ${GAP_COLUMNS.L / 2}px)`,
    },
    [MQ.XL]: {
      width: `calc(50vw - ${GAP_COLUMNS.XL / 2}px)`,
    },
  },
};

export const animation: Record<string, CSSObjectType> = {
  [MODAL_ANIMATION.FADE]: FADE,
  [MODAL_ANIMATION.SLIDE_LEFT]: SLIDE_LEFT,
};

export default styles;
