import { CSSObject } from '@emotion/core';

import {
  BORDERS,
  COLORS,
  LINK_ICON_POSITION,
  LINK_THEME,
  MQ,
  RADIUS,
  SPACING,
  THEME,
  TIME,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const CONSTANTS = {
  OPACITY_ACTIVE: 0.8,
  OPACITY_DISABLED: 0.4,
  SIZE: 50,
};

const styles: CSSObject = {
  disabled: {
    opacity: CONSTANTS.OPACITY_DISABLED,
    pointerEvents: 'none',
  },
  iconOnly: {
    display: 'flex',
    justifyContent: 'center',
    minHeight: 30,
    minWidth: 30,
  },
  link: {
    borderBottom: BORDERS.DOTTED_TRANSPARENT_2PX,
    transition: `border-color ${TIME.MS100}ms ease`,
  },
  root: {
    '&:hover span, &:focus span': {
      borderColor: 'inherit',
    },
    alignItems: 'center',
    display: 'flex',
  },

  // conditional styles
  [LINK_ICON_POSITION.LEFT]: {
    paddingRight: SPACING.SIZE_10,
  },
  [LINK_ICON_POSITION.RIGHT]: {
    paddingLeft: 5,
  },

  [THEME.DARK]: {
    '&:hover:not(:active), &:focus:not(:active)': {
      color: COLORS.GLOBAL.WHITE,
    },
    color: COLORS.DARK.GRAY_40,
  },

  [LINK_THEME.DARK_HIGHLIGHTED]: {
    color: COLORS.GLOBAL.WHITE,
  },

  [THEME.LIGHT]: {
    '&:active span, &:focus span': { color: COLORS.LIGHT.GRAY_70 },
    color: COLORS.GLOBAL.BLACK,
  },
};

export const iconCTA = {
  icon: {
    alignItems: 'center',
    backgroundColor: COLORS.GLOBAL.ORANGE,
    borderRadius: RADIUS.CIRCLE,
    color: COLORS.GLOBAL.WHITE,
    display: 'flex',
    height: CONSTANTS.SIZE,
    justifyContent: 'center',
    marginRight: SPACING.SIZE_15,
    width: CONSTANTS.SIZE,
  },
  root: {
    display: 'flex',
    svg: {
      color: COLORS.GLOBAL.WHITE,
    },
  },
};

export const linkBorder: CSSObject = {
  [THEME.DARK]: {
    borderColor: 'inherit',
  },

  [LINK_THEME.DARK_HIGHLIGHTED]: {
    borderColor: COLORS.DARK.GRAY_40,

    '&:hover, &:focus': { borderColor: COLORS.GLOBAL.WHITE },
  },

  [THEME.LIGHT]: {
    borderColor: COLORS.LIGHT.GRAY_70,
  },
};

export const footerLink = {
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
};

export const navLink = {
  root: {
    '&:hover': { color: COLORS.GLOBAL.BLACK },
    // eslint-disable-next-line sort-keys
    '&:active, &:focus': { color: COLORS.LIGHT.GRAY_70 },
    color: COLORS.LIGHT.GRAY_70,
    span: {
      borderColor: 'transparent',
    },
    [MQ.M]: typography.tertiaryHeadline,
    [MQ.L]: typography.primarySubhead,
  },
  selected: {
    '&:hover, &:focus, &:active': {
      span: { color: COLORS.GLOBAL.ORANGE },
    },
    color: COLORS.GLOBAL.ORANGE,
    span: {
      borderColor: COLORS.GLOBAL.ORANGE,
      transition: `border-color ${TIME.MS100}ms ease`,
    },
  },
};

export default styles;
