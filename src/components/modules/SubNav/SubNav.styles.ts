import { css } from '@emotion/core';

import { COLORS, EASING, MQ, SPACING, TIME, Z_INDEX } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

import { NAV_CONTENT_HEIGHT } from '../Nav/Nav.styles';

export const SUBNAV_TIME_SLIDE_OPEN = TIME.MS400;
export const SUBNAV_TIME_SLIDE_CLOSE = TIME.MS1200;
export const SUBNAV_TIME_FADE_OPEN = TIME.MS400;
export const SUBNAV_TIME_FADE_CLOSE = TIME.MS600;

export enum Animation {
  FADE = 'FADE',
  SLIDE_LEFT = 'SLIDE_LEFT',
}

const styles = {
  action: css({
    padding: SPACING.SIZE_10,
  }),
  actions: css({
    background: COLORS.GLOBAL.WHITE,
    display: 'flex',
    justifyContent: 'space-between',
    padding: `${SPACING.SIZE_30}px ${SPACING.SIZE_10}px`,
    pointerEvents: 'all',
    width: '100%',
    [MQ.M]: {
      display: 'none',
    },
  }),
  border: css({
    background: COLORS.GLOBAL.ORANGE,
    bottom: 0,
    height: 20,
    left: 0,
    position: 'absolute',
    width: '100%',
    [MQ.M]: {
      display: 'none',
    },
  }),
  close: css({
    position: 'absolute',
    right: SPACING.SIZE_20,
    top: SPACING.SIZE_30,
    zIndex: Z_INDEX.FRONT,
    [MQ.M]: {
      display: 'none',
    },
  }),
  closeSubNav: css({
    color: COLORS.LIGHT.GRAY_70,
    [MQ.S]: {
      display: 'none',
    },
    [MQ.M]: {
      display: 'flex',
    },
  }),
  content: css({
    opacity: 0,
    transition: `all ${TIME.MS1200}ms linear`,
  }),
  link: css({
    alignContent: 'center',
    color: COLORS.LIGHT.GRAY_70,
    display: 'flex',
    whiteSpace: 'nowrap',

    [MQ.S]: typography.bodyCopy,
    [MQ.XL]: typography.smallCopy,
  }),
  linkSection: css({
    height: NAV_CONTENT_HEIGHT,
    li: {
      marginRight: SPACING.SIZE_30,
    },
    span: {
      // overrides nav link sizes
      [MQ.S]: typography.bodyCopy,
      [MQ.M]: [
        {
          fontSize: '1.5rem',
          fontWeight: 'bold',
        },
      ],
    },
    [MQ.M]: {
      alignItems: 'center',
      display: 'flex',
    },
  }),
  linkSectionIcons: css({
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
  }),
  navContent: css({
    height: '100%',
    overflow: 'auto',
    position: 'relative',
    top: 0,
    zIndex: Z_INDEX.TOP + 1,
  }),
  navModalContainer: css({
    height: '100%',
    left: 0,
    pointerEvents: 'none',
    position: 'fixed',
    top: 0,
    transition: `z-index ${TIME.MS200}ms linear`,
    visibility: 'hidden',
    width: '100%',
    zIndex: Z_INDEX.BEHIND,
  }),
  navModalContainerOpen: css({
    pointerEvents: 'all',
    transition: 'z-index 0ms linear',
    visibility: 'visible',
    zIndex: Z_INDEX.OVERLAY,
  }),
  overlay: css({
    [MQ.S]: {
      display: 'none',
    },
    [MQ.L]: {
      background: COLORS.LIGHT.GRAY_20,
      display: 'initial',
      height: '100%',
      left: 0,
      position: 'absolute',
      top: 0,
      width: '100%',
      zIndex: Z_INDEX.FRONT,
    },
  }),
  root: css({
    height: '100%',
  }),
  smallShow: css({
    [MQ.S]: {
      display: 'initial',
    },
    [MQ.M]: {
      display: 'none',
    },
  }),
  subnav: css({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    opacity: 0,
    pointerEvents: 'all',
    position: 'relative',
    transition: `all ${TIME.MS1200}ms linear`, // fade in content after subnav open animation
    [MQ.S]: {
      backgroundColor: COLORS.LIGHT.OFF_WHITE,
      padding: `${SPACING.SIZE_70}px ${SPACING.SIZE_20}px 0 ${SPACING.SIZE_20}px`,
    },
    [MQ.M]: {
      backgroundColor: COLORS.GLOBAL.WHITE,
      padding: `0 ${SPACING.SIZE_40}px`,
    },
    [MQ.L]: {
      padding: `0 ${SPACING.SIZE_60}px`,
    },
  }),
  subnavInnerGrid: css({
    [MQ.M]: {
      height: '100%',
    },
  }),
  subnavLinkList: css({
    display: 'flex',
    width: '100%',
    [MQ.S]: [
      typography.bodyCopy,
      {
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'space-between',
        marginBottom: SPACING.SIZE_40,
      },
    ],
    [MQ.M]: [
      typography.bodyCopy,
      {
        flexDirection: 'row',
        flexGrow: 0,
        height: 'auto',
        justifyContent: 'space-between',
        marginBottom: 'unset',
        paddingBottom: SPACING.SIZE_80,
        paddingTop: SPACING.SIZE_60,
        svg: {
          width: 20,
        },
      },
    ],
  }),
  subnavOpen: css({
    opacity: 1,
    transition: `all ${TIME.MS400}ms ${EASING.CUBIC_EASE_IN}`,
  }),
  [Animation.FADE]: {
    default: css({
      opacity: 0,
      transition: `all ${SUBNAV_TIME_FADE_CLOSE}ms ${EASING.EXPO_EASE_OUT}`,
    }),
    open: css({
      opacity: 1,
      transition: `all ${SUBNAV_TIME_FADE_OPEN}ms ${EASING.CUBIC_EASE_OUT}`,
    }),
  },
  [Animation.SLIDE_LEFT]: {
    default: css({
      transform: 'translate3d(100%, 0, 0)',
      transition: `all ${SUBNAV_TIME_SLIDE_CLOSE}ms ${EASING.EXPO_EASE_OUT}`,
    }),
    open: css({
      transform: 'translate3d(0, 0, 0)',
      transition: `all ${SUBNAV_TIME_SLIDE_OPEN}ms ${EASING.CUBIC_EASE_OUT}`,
    }),
  },
};
export default styles;
