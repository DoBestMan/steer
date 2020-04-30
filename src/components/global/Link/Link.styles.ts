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
import { backgroundColors, colors } from '~/styles/colors.styles';
import { disableGlobalFocus } from '~/styles/document/accessibility.styles';
import { typography } from '~/styles/typography.styles';

const CONSTANTS = {
  OPACITY_ACTIVE: 0.8,
  OPACITY_DISABLED: 0.4,
  SIZE: 50,
};

const styles = {
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
  [LINK_THEME.DARK]: [
    colors.DARK.GRAY_40,
    css({
      ...disableGlobalFocus,
      '&:hover:not(:active)': colors.GLOBAL.WHITE,
    }),
  ],
  [LINK_THEME.LIGHT]: [
    colors.GLOBAL.BLACK,
    css({
      ...disableGlobalFocus,
      '&:active span, &:focus span': colors.LIGHT.GRAY_70,
    }),
  ],
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
    backgroundColors.GLOBAL.ORANGE,
    css({
      alignItems: 'center',
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
  colors.LIGHT.GRAY_70,
  typography.bodyCopy,
  css({
    '&:hover span svg, &:focus span svg': {
      fill: COLORS.GLOBAL.ORANGE,
    },
    '&:hover, &:focus': colors.GLOBAL.ORANGE,
    'span svg': {
      fill: COLORS.GLOBAL.BLACK,
    },
    // eslint-disable-next-line sort-keys
    display: 'inline-flex',
    [MQ.XL]: typography.smallCopy,
  }),
];

export const navLink = {
  root: [
    colors.LIGHT.GRAY_70,
    typography.tertiaryHeadline,
    css({
      '&:hover span': colors.GLOBAL.BLACK,

      // eslint-disable-next-line sort-keys
      '&:active span, &:focus span': colors.LIGHT.GRAY_70,
      [MQ.XL]: typography.tertiaryHeadline,
    }),
  ],
  selected: [
    colors.GLOBAL.ORANGE,
    typography.tertiaryHeadline,
    css({
      '&:hover, &:focus, &:active': {
        span: colors.GLOBAL.ORANGE,
      },
      span: {
        borderBottom: '2px dotted',
        transition: `border-color ${TIME.MS100}ms ease`,
      },
      [MQ.XL]: typography.tertiaryHeadline,
    }),
  ],
};

export default styles;
