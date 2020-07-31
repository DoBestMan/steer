/* eslint-disable sort-keys */

import { CSSObject } from '@emotion/core';

import { COLORS, TIME } from '~/lib/constants';

const transition = `border-color ${TIME.MS100}ms ease, color ${TIME.MS100}ms ease`;

export const links: { [className: string]: CSSObject } = {
  borderless: {
    borderBottomColor: 'transparent',
  },

  dark: {
    borderBottom: `2px dotted ${COLORS.DARK.GRAY_40}`,
    color: COLORS.DARK.GRAY_40,
    transition,

    '&:hover:not(:active), &:focus:not(:active)': {
      borderColor: COLORS.GLOBAL.WHITE,
      color: COLORS.GLOBAL.WHITE,
    },

    '&:active': {
      borderColor: COLORS.DARK.GRAY_40,
      color: COLORS.DARK.GRAY_40,
    },
  },

  darkHighlighted: {
    borderBottom: `2px dotted ${COLORS.DARK.GRAY_40}`,
    color: COLORS.GLOBAL.WHITE,
    transition,

    '&:hover:not(:active), &:focus:not(:active)': {
      borderColor: COLORS.GLOBAL.WHITE,
      color: COLORS.GLOBAL.WHITE,
    },

    '&:active': {
      borderColor: COLORS.DARK.GRAY_40,
      color: COLORS.DARK.GRAY_40,
    },
  },

  light: {
    borderBottom: `2px dotted ${COLORS.LIGHT.GRAY_70}`,
    color: COLORS.LIGHT.GRAY_70,
    display: 'inline-block',
    transition,

    '&:hover:not(:active), &:focus:not(:active)': {
      borderColor: COLORS.GLOBAL.BLACK,
      color: COLORS.GLOBAL.BLACK,
    },

    '&:active': {
      color: COLORS.LIGHT.GRAY_70,
      borderColor: COLORS.LIGHT.GRAY_70,
    },
  },

  lightHighlighted: {
    borderBottom: `2px dotted ${COLORS.LIGHT.GRAY_70}`,
    color: COLORS.GLOBAL.BLACK,
    display: 'inline-block',
    transition,

    '&:hover:not(:active), &:focus:not(:active)': {
      borderColor: COLORS.GLOBAL.BLACK,
      color: COLORS.GLOBAL.BLACK,
    },

    '&:active': {
      color: COLORS.LIGHT.GRAY_70,
      borderColor: COLORS.LIGHT.GRAY_70,
    },
  },
};
