import { css } from '@emotion/core';

import {
  BUTTON_STYLE,
  BUTTON_THEME,
  COLORS,
  RADIUS,
  SPACING,
  TIME,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const CONSTANTS = {
  BORDER_SIZE: 2,
  OPACITY_ACTIVE: 0.8,
  OPACITY_DISABLED: 0.4,
  SIZE: 50,
};

const styles = {
  disabled: css({
    opacity: CONSTANTS.OPACITY_DISABLED,
    pointerEvents: 'none',
  }),
  root: [
    typography.primarySubhead,
    css({
      alignItems: 'center',
      borderRadius: RADIUS.RADIUS_25,
      borderStyle: 'solid',
      borderWidth: CONSTANTS.BORDER_SIZE,
      boxSizing: 'border-box',
      display: 'inline-flex',
      height: CONSTANTS.SIZE,
      padding: `0 ${SPACING.SIZE_25}px`,
      transition: `border-color ${TIME.MS100}ms ease`,
    }),
  ],

  [BUTTON_STYLE.FILTERS]: {
    [BUTTON_THEME.DARK]: css({}),
    [BUTTON_THEME.LIGHT]: css({}),
    [BUTTON_THEME.ORANGE]: css({}),
  },
  [BUTTON_STYLE.OUTLINED]: {
    // Outlined Dark
    [BUTTON_THEME.DARK]: css({
      '&:active': {
        backgroundColor: COLORS.DARK.GRAY_90,
        borderColor: COLORS.DARK.GRAY_40,
      },
      '&:focus': {
        borderColor: COLORS.GLOBAL.WHITE,
      },
      '&:hover': {
        borderColor: COLORS.DARK.GRAY_40,
      },
      backgroundColor: COLORS.GLOBAL.BLACK,
      borderColor: COLORS.DARK.GRAY_80,
      color: COLORS.GLOBAL.WHITE,
    }),
    // Outlined Light
    [BUTTON_THEME.LIGHT]: css({
      '&:active': {
        backgroundColor: COLORS.LIGHT.GRAY_10,
        borderColor: COLORS.LIGHT.GRAY_70,
      },
      '&:focus': {
        borderColor: COLORS.GLOBAL.BLACK,
      },
      '&:hover': {
        borderColor: COLORS.LIGHT.GRAY_70,
      },
      backgroundColor: COLORS.GLOBAL.WHITE,
      borderColor: COLORS.LIGHT.GRAY_20,
      color: COLORS.GLOBAL.BLACK,
    }),
    // Outlined Orange
    [BUTTON_THEME.ORANGE]: css({
      '&:active': {
        backgroundColor: COLORS.LIGHT.GRAY_20,
        borderColor: COLORS.LIGHT.GRAY_70,
      },
      '&:focus': {
        borderColor: COLORS.GLOBAL.BLACK,
      },
      '&:hover': {
        borderColor: COLORS.LIGHT.GRAY_70,
      },
      backgroundColor: COLORS.GLOBAL.ORANGE,
      borderColor: COLORS.ORANGE.SHADE_30,
      color: COLORS.GLOBAL.WHITE,
    }),
  },
  [BUTTON_STYLE.SOLID]: {
    // Solid Dark
    [BUTTON_THEME.DARK]: css({
      '&:active': {
        borderColor: COLORS.ORANGE.SHADE_30,
      },
      '&:focus': {
        borderColor: COLORS.GLOBAL.WHITE,
      },
      '&:hover': {
        borderColor: COLORS.DARK.GRAY_40,
      },
      backgroundColor: COLORS.GLOBAL.ORANGE,
      borderColor: COLORS.GLOBAL.ORANGE,
      color: COLORS.GLOBAL.WHITE,
    }),
    // Solid Light
    [BUTTON_THEME.LIGHT]: css({
      '&:active': {
        borderColor: COLORS.ORANGE.TINT_30,
      },
      '&:focus': {
        borderColor: COLORS.GLOBAL.BLACK,
      },
      '&:hover': {
        borderColor: COLORS.ORANGE.SHADE_30,
      },
      backgroundColor: COLORS.GLOBAL.ORANGE,
      borderColor: COLORS.GLOBAL.ORANGE,
      color: COLORS.GLOBAL.WHITE,
    }),
    // Solid Orange
    [BUTTON_THEME.ORANGE]: css({
      '&:active': {
        backgroundColor: COLORS.ORANGE.TINT_30,
        borderColor: '#B94A12', // TODO: var
      },
      '&:focus': {
        borderColor: COLORS.GLOBAL.BLACK,
      },
      '&:hover': {
        borderColor: '#B94A12', // TODO: var
      },
      backgroundColor: COLORS.GLOBAL.WHITE,
      color: COLORS.GLOBAL.ORANGE,
    }),
  },
};

export default styles;
