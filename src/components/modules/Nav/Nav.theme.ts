import { CSSObject } from '@emotion/core';

import {
  BORDERS,
  COLORS,
  CSSObjectType,
  MQ,
  RADIUS,
  THEME,
} from '~/lib/constants';

export enum NAV_THEME {
  ALTERNATE = 'alternate',
  DEFAULT = 'default',
}

export interface NavThemeObject {
  border: CSSObject | CSSObjectType;
  iconColor: CSSObject | CSSObjectType;
  linkTheme: THEME.LIGHT | THEME.ORANGE;
  logoUrl: string;
  logoUrlHome: string;
  logoUrlMobile: string;
  textColor: CSSObject;
}

export const themes: { [key in NAV_THEME]: NavThemeObject } = {
  [NAV_THEME.DEFAULT]: {
    border: {
      border: BORDERS.SOLID_GRAY_20_2PX,
      borderRadius: RADIUS.PILL,
      [MQ.L]: {
        border: 'unset',
        borderBottom: BORDERS.SOLID_GRAY_20_1PX,
        borderRadius: 'unset',
      },
    },
    iconColor: { [MQ.L]: { color: COLORS.GLOBAL.ORANGE } },
    linkTheme: THEME.LIGHT,
    logoUrl: '/static/assets/logo-icon.svg',
    logoUrlHome: '/static/assets/logo-home.svg',
    logoUrlMobile: '/static/assets/logo.svg',
    textColor: {
      color: COLORS.GLOBAL.BLACK,
      [MQ.L]: { color: COLORS.LIGHT.GRAY_70 },
    },
  },
  [NAV_THEME.ALTERNATE]: {
    border: {
      border: BORDERS.SOLID_ORANGE_TINT_30_2PX,
      borderRadius: RADIUS.PILL,
      [MQ.L]: {
        border: 'unset',
        borderBottom: BORDERS.SOLID_GRAY_80_1PX,
        borderRadius: 'unset',
      },
    },
    iconColor: { color: COLORS.GLOBAL.WHITE },
    linkTheme: THEME.ORANGE,
    logoUrl: '/static/assets/logo-white.svg',
    logoUrlHome: '/static/assets/logo-home.svg',
    logoUrlMobile: '/static/assets/logo-white.svg',
    textColor: { color: COLORS.GLOBAL.WHITE },
  },
};
