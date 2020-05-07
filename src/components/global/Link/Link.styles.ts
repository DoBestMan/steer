import { css } from '@emotion/core';

import {
  BORDERS,
  COLORS,
  LINK_ICON_POSITION,
  LINK_SIZE,
  LINK_THEME,
  LINK_WEIGHT,
  MQ,
  RADIUS,
  SPACING,
  TIME,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const CONSTANTS = {
  OPACITY_ACTIVE: 0.8,
  OPACITY_DISABLED: 0.4,
  SIZE: 50,
};

const styles = {
  disabled: css({
    opacity: CONSTANTS.OPACITY_DISABLED,
    pointerEvents: 'none',
  }),
  link: css({
    borderBottom: BORDERS.DOTTED_TRANSPARENT_2PX,
    transition: `border-color ${TIME.MS100}ms ease`,
  }),
  linkBorder: {
    [LINK_THEME.DARK]: css({
      borderColor: 'inherit',
    }),

    [LINK_THEME.LIGHT]: css({
      borderColor: COLORS.LIGHT.GRAY_70,
    }),
  },
  root: css({
    '&:hover span, &:focus span': {
      borderColor: 'inherit',
    },
    alignItems: 'center',
    display: 'flex',
  }),

  // conditional styles
  [LINK_ICON_POSITION.LEFT]: css({
    paddingRight: SPACING.SIZE_10,
  }),
  [LINK_ICON_POSITION.RIGHT]: css({
    paddingLeft: 5,
  }),
  [LINK_THEME.DARK]: css({
    '&:hover:not(:active), &:focus:not(:active)': {
      color: COLORS.GLOBAL.WHITE,
    },
    color: COLORS.DARK.GRAY_40,
  }),

  [LINK_THEME.LIGHT]: css({
    '&:active span, &:focus span': { color: COLORS.LIGHT.GRAY_70 },
    color: COLORS.GLOBAL.BLACK,
  }),

  [LINK_SIZE.REG]: typography.bodyCopy,
  [LINK_SIZE.SM]: typography.smallCopy,
  [LINK_WEIGHT.BOLD]: css({
    fontWeight: 'bold',
  }),
  [LINK_WEIGHT.NORMAL]: css({
    fontWeight: 'normal',
  }),
};

export const iconCTA = {
  icon: [
    css({
      alignItems: 'center',
      backgroundColor: COLORS.GLOBAL.ORANGE,
      borderRadius: RADIUS.CIRCLE,
      color: COLORS.GLOBAL.WHITE,
      display: 'flex',
      height: CONSTANTS.SIZE,
      justifyContent: 'center',
      marginRight: SPACING.SIZE_15,
      width: CONSTANTS.SIZE,
    }),
  ],
  root: css({
    display: 'flex',
    svg: {
      color: COLORS.GLOBAL.WHITE,
    },
  }),
};

export const footerLink = [
  typography.bodyCopy,
  css({
    '&:hover, &:focus': { borderColor: 'inherit', color: COLORS.GLOBAL.BLACK },
    'span svg': {
      color: COLORS.GLOBAL.BLACK,
    },
    // eslint-disable-next-line sort-keys
    color: COLORS.LIGHT.GRAY_70,
    display: 'inline-flex',
    span: {
      borderColor: 'transparent',
    },
    svg: {
      color: COLORS.GLOBAL.BLACK,
    },
    [MQ.XL]: typography.bodyCopyTight,
  }),
];

export const navLink = {
  root: [
    typography.bodyCopy,
    css({
      '&:hover': { color: COLORS.GLOBAL.BLACK },
      // eslint-disable-next-line sort-keys
      '&:active, &:focus': { color: COLORS.LIGHT.GRAY_70 },
      color: COLORS.LIGHT.GRAY_70,
      span: {
        borderColor: 'transparent',
      },
      [MQ.M]: typography.tertiaryHeadline,
      [MQ.L]: typography.primarySubhead,
    }),
  ],
  selected: css({
    '&:hover, &:focus, &:active': {
      span: { color: COLORS.GLOBAL.ORANGE },
    },
    color: COLORS.GLOBAL.ORANGE,
    span: {
      borderColor: COLORS.GLOBAL.ORANGE,
      transition: `border-color ${TIME.MS100}ms ease`,
    },
  }),
};

export default styles;
