import {
  ENTERED,
  ENTERING,
  EXITED,
  EXITING,
  UNMOUNTED,
} from 'react-transition-group/Transition';

import {
  COLORS,
  EASING,
  GAP_COLUMNS,
  MQ,
  SPACING,
  StylesMap,
  TIME,
  Z_INDEX,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

import { NAV_CONTENT_HEIGHT } from '../Nav/Nav.styles';

export const SUBNAV_TIME_SLIDE_OPEN = TIME.MS400;
export const SUBNAV_TIME_SLIDE_CLOSE = TIME.MS3000;
export const SUBNAV_TIME_FADE_OPEN = TIME.MS400;
export const SUBNAV_TIME_FADE_CLOSE = TIME.MS600;

const styles: StylesMap = {
  action: {
    padding: SPACING.SIZE_10,
  },
  actions: {
    alignItems: 'baseline',
    background: COLORS.GLOBAL.WHITE,
    display: 'flex',
    justifyContent: 'space-between',
    padding: `${SPACING.SIZE_30}px ${SPACING.SIZE_10}px`,
    width: '100%',
    [MQ.M]: {
      display: 'none',
    },
  },
  borderMobile: {
    background: COLORS.GLOBAL.ORANGE,
    bottom: 0,
    height: 20,
    left: 0,
    position: 'absolute',
    width: '100%',
    [MQ.M]: {
      display: 'none',
    },
  },
  close: {
    position: 'absolute',
    // manually position it because hit area
    right: 12,
    top: 24,
    zIndex: Z_INDEX.FRONT,
    [MQ.M]: {
      display: 'none',
    },
  },
  closeSubNav: {
    color: COLORS.LIGHT.GRAY_70,
    display: 'none',
    [MQ.M]: {
      display: 'flex',
    },
  },
  focusHide: {
    // removes phantom height in parent modal
    display: 'none',
  },
  link: [
    typography.bodyCopy,
    {
      alignContent: 'center',
      color: COLORS.LIGHT.GRAY_70,
      display: 'flex',
      whiteSpace: 'nowrap',
      [MQ.XL]: typography.smallCopy,
    },
  ],
  linkSection: {
    height: NAV_CONTENT_HEIGHT,
    li: {
      marginBottom: SPACING.SIZE_02,
      marginRight: SPACING.SIZE_30,
      padding: `${SPACING.SIZE_02}px 0`,
    },
    // overrides nav link sizes
    span: [
      typography.bodyCopy,
      {
        [MQ.M]: [
          {
            fontWeight: 'bold',
          },
        ],
      },
    ],
    [MQ.M]: {
      alignItems: 'center',
      display: 'flex',
    },
    [MQ.L]: {
      // accommodates margin top from designs to align with header
      marginTop: -1,
    },
  },
  linkSectionIcons: {
    li: {
      // accommodates margins from designs, icon only buttons have extra padding to make them more clickable
      // MVP will have hardcoded text link first and icon links following
      ':first-of-type': {
        marginRight: SPACING.SIZE_20,
      },
      ':last-of-type': {
        marginRight: -SPACING.SIZE_10,
      },
      marginRight: SPACING.SIZE_10,
    },
    bottom: SPACING.SIZE_40,
    position: 'absolute',
    [MQ.M]: {
      position: 'initial',
    },
  },
  mobileLinks: {
    opacity: 0,
  },
  mobileLinksOpen: {
    opacity: 1,
    transition: `all ${TIME.MS400}ms ${EASING.CUBIC_EASE_IN} 400ms`, // fade in content after subnav open animation
  },
  navContent: {
    backgroundColor: COLORS.GLOBAL.WHITE,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'auto',
    position: 'relative',
    zIndex: Z_INDEX.TOP + 1,
    [MQ.M]: {
      backgroundColor: 'transparent',
    },
  },
  navContentNested: {
    display: 'flex',
    flexGrow: 1,
    width: '100%',
  },
  navModalContainer: {
    height: '100%',
    left: 0,
    position: 'fixed',
    top: 0,
    visibility: 'hidden',
    width: '100%',
  },
  overlay: {
    [MQ.L]: {
      background: COLORS.LIGHT.GRAY_70,
      height: '100%',
      left: 0,
      position: 'absolute',
      top: 0,
      width: '100%',
      zIndex: Z_INDEX.TOP,
    },
  },
  overlayContainer: {
    display: 'none',
    height: '100%',
    position: 'relative',
    width: `calc(100% + ${GAP_COLUMNS.L}px)`,
    [MQ.L]: {
      display: 'initial',
    },
  },
  root: {
    height: '100%',
  },
  smallHide: {
    display: 'none',
    [MQ.M]: {
      display: 'initial',
    },
  },
  smallShow: {
    [MQ.M]: {
      display: 'none',
    },
  },
  subnav: {
    backgroundColor: COLORS.LIGHT.OFF_WHITE,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: 500,
    overflowY: 'auto',
    padding: `${SPACING.SIZE_70}px ${SPACING.SIZE_20}px 0 ${SPACING.SIZE_20}px`,
    position: 'relative',
    zIndex: Z_INDEX.FRONT,
    [MQ.M]: {
      backgroundColor: COLORS.GLOBAL.WHITE,
      padding: `0 ${SPACING.SIZE_40}px`,
    },
    [MQ.L]: {
      padding: `0 ${SPACING.SIZE_60}px`,
    },
  },
  subnavContent: {
    height: '100%',
    zIndex: Z_INDEX.BEHIND,
  },
  subnavInnerGrid: {
    bottom: 0,
    gridAutoRows: 'minmax(auto, 100%)',
    height: '100%',
    left: 0,
    pointerEvents: 'none',
    position: 'absolute',
    zIndex: Z_INDEX.OVERLAY,
    [MQ.M]: {
      position: 'initial',
    },
  },
  subnavInnerGridOpen: {
    pointerEvents: 'auto',
  },
  subnavLinkList: [
    typography.bodyCopy,
    {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      justifyContent: 'space-between',
      margin: `${SPACING.SIZE_30}px 0 ${SPACING.SIZE_40}px`,
      width: '100%',

      [MQ.M]: {
        flexDirection: 'row',
        flexGrow: 0,
        height: 'auto',
        justifyContent: 'space-between',
        margin: 'unset',
        paddingBottom: SPACING.SIZE_80,
        paddingTop: SPACING.SIZE_60,
        svg: {
          width: 20,
        },
      },
      [MQ.L]: {
        // accommodates spacing top from designs to align with header behind
        paddingTop: SPACING.SIZE_60 + 2,
        svg: {
          marginTop: -2,
        },
      },
    },
  ],
};

export const subNavContainer = {
  /* eslint-disable sort-keys */
  [ENTERING]: {
    pointerEvents: 'auto',
    visibility: 'visible',
    zIndex: Z_INDEX.OVERLAY,
  },
  [ENTERED]: {
    pointerEvents: 'auto',
    visibility: 'visible',
    zIndex: Z_INDEX.OVERLAY,
  },
  [EXITING]: {
    pointerEvents: 'auto',
    visibility: 'visible',
    zIndex: Z_INDEX.OVERLAY,
  },
  [EXITED]: {
    pointerEvents: 'none',
    visibility: 'hidden',
    zIndex: Z_INDEX.BEHIND,
  },
  [UNMOUNTED]: {},
};

export const slideLeft = {
  [ENTERING]: {
    transform: 'translate3d(100%, 0, 0)',
  },
  [ENTERED]: {
    transform: 'translate3d(0, 0, 0)',
    transition: `all ${SUBNAV_TIME_SLIDE_OPEN}ms ${EASING.CUBIC_EASE_OUT}`,
  },
  [EXITING]: {
    transform: 'translate3d(100%, 0, 0)',
    transition: `all ${SUBNAV_TIME_SLIDE_CLOSE}ms ${EASING.EXPO_EASE_OUT}`,
  },
  [EXITED]: {
    transform: 'translate3d(100%, 0, 0)',
  },
  [UNMOUNTED]: {},
};

export const fade = {
  [ENTERING]: {
    opacity: 0,
  },
  [ENTERED]: {
    opacity: 1,
    transition: `all ${SUBNAV_TIME_FADE_OPEN}ms ${EASING.CUBIC_EASE_OUT}`,
  },
  [EXITING]: {
    opacity: 0,
    transition: `all ${SUBNAV_TIME_FADE_CLOSE}ms ${EASING.EXPO_EASE_OUT}`,
  },
  [EXITED]: {
    opacity: 0,
  },
  [UNMOUNTED]: {},
};

export default styles;
