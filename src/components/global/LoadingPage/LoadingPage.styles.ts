import { COLORS, StylesMap, THEME } from '~/lib/constants';

export const styles: StylesMap = {
  root: {
    alignItems: 'center',
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    minHeight: '-webkit-fill-available',
  },
  [THEME.DARK]: {
    backgroundColor: COLORS.GLOBAL.ORANGE,
  },
  [THEME.LIGHT]: {
    backgroundColor: COLORS.GLOBAL.WHITE,
  },
};
