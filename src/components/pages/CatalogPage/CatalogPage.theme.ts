import { BUTTON_STYLE, COLORS, THEME } from '~/lib/constants';

export const defaultTheme = {
  message: {
    buttonStyle: BUTTON_STYLE.OUTLINED,
    buttonTheme: THEME.ORANGE,
    loadingTheme: THEME.DARK,
  },
  header: {
    advancedLabel: {
      color: COLORS.LIGHT.GRAY_70,
    },
    background: {
      background: COLORS.GLOBAL.ORANGE,
    },
    buttonTheme: THEME.ORANGE,
    text: {
      color: COLORS.GLOBAL.BLACK,
    },
  },
};

export const headerAdvanced = {
  header: {
    advancedLabel: {
      color: COLORS.DARK.GRAY_40,
    },
    background: {
      background: COLORS.GLOBAL.BLACK,
    },
    buttonTheme: THEME.DARK,
    text: {
      color: COLORS.DARK.GRAY_40,
    },
  },
};
