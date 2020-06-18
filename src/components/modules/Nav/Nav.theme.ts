import { BORDERS, COLORS, MQ, THEME } from '~/lib/constants';

export const defaultTheme = {
  border: { [MQ.L]: { borderBottom: BORDERS.SOLID_GRAY_20_1PX } },
  iconColor: { [MQ.L]: { color: COLORS.GLOBAL.ORANGE } },
  linkTheme: THEME.LIGHT,
  logoUrl: '/static/assets/logo.svg',
  textColor: { color: COLORS.LIGHT.GRAY_70 },
};

export const alternateTheme = {
  border: { [MQ.L]: { borderBottom: BORDERS.SOLID_GRAY_80_1PX } },
  iconColor: { [MQ.L]: { color: COLORS.GLOBAL.WHITE } },
  linkTheme: THEME.ORANGE,
  logoUrl: '/static/assets/logo-white.svg',
  textColor: { color: COLORS.GLOBAL.WHITE },
};
