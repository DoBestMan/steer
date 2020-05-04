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
    '&:hover:not(:active)': { color: COLORS.GLOBAL.WHITE },
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
  }),
};

export const footerLink = [
  typography.bodyCopy,
  css({
    '&:hover span svg, &:focus span svg': {
      fill: COLORS.GLOBAL.ORANGE,
    },
    '&:hover, &:focus': { color: COLORS.GLOBAL.ORANGE },
    'span svg': {
      fill: COLORS.GLOBAL.BLACK,
    },
    // eslint-disable-next-line sort-keys
    color: COLORS.LIGHT.GRAY_70,
    display: 'inline-flex',
    [MQ.XL]: typography.smallCopy,
  }),
];

export const navLink = {
  root: [
    typography.tertiaryHeadline,
    css({
      '&:hover span': { color: COLORS.GLOBAL.BLACK },
      // eslint-disable-next-line sort-keys
      '&:active span, &:focus span': { color: COLORS.LIGHT.GRAY_70 },
      color: COLORS.LIGHT.GRAY_70,
      [MQ.XL]: typography.tertiaryHeadline,
    }),
  ],
  selected: [
    typography.tertiaryHeadline,
    css({
      '&:hover, &:focus, &:active': {
        span: { color: COLORS.GLOBAL.ORANGE },
      },
      color: COLORS.GLOBAL.ORANGE,
      span: {
        borderBottom: '2px dotted',
        transition: `border-color ${TIME.MS100}ms ease`,
      },
      [MQ.XL]: typography.tertiaryHeadline,
    }),
  ],
};

export default styles;
