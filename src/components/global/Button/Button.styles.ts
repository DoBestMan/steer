import { css } from '@emotion/core';

import {
  BUTTON_STYLE,
  COLORS,
  RADIUS,
  SPACING,
  THEME,
  TIME,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const CONSTANTS = {
  BORDER_SIZE: 2,
  ICON_SPACING: 5,
  OPACITY_ACTIVE: 0.8,
  OPACITY_DISABLED: 0.4,
  SIZE: 50,
};

const styles = {
  disabled: css({
    opacity: CONSTANTS.OPACITY_DISABLED,
    pointerEvents: 'none',
  }),
  filterButtonSelecting: css({
    '&:hover, &:focus': {
      backgroundColor: COLORS.DARK.GRAY_80,
      borderColor: COLORS.GLOBAL.WHITE,
    },
    backgroundColor: COLORS.DARK.GRAY_80,
    borderColor: COLORS.GLOBAL.WHITE,
    color: COLORS.GLOBAL.WHITE,
    pointerEvents: 'none',
  }),
  filterIcon: css({
    marginLeft: CONSTANTS.ICON_SPACING,
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
      transition: `all ${TIME.MS100}ms ease`,
    }),
  ],
  toggle: {
    active: {
      [THEME.DARK]: css({
        '&:focus': {
          backgroundColor: COLORS.DARK.GRAY_40,
          borderColor: COLORS.GLOBAL.WHITE,
        },
        '&:hover': {
          // backgroundClip prevents background color from bleeding
          // under the border. Required for semi-transparent border
          // colors to be rendered correctly.
          backgroundClip: 'padding-box',
          backgroundColor: COLORS.DARK.GRAY_40,
          borderColor: COLORS.DARK.GRAY_40,
        },
        backgroundColor: COLORS.GLOBAL.WHITE,
        borderColor: COLORS.GLOBAL.WHITE,
        color: COLORS.GLOBAL.BLACK,
      }),
      [THEME.LIGHT]: css({
        '&:focus': {
          backgroundColor: COLORS.LIGHT.GRAY_70,
          borderColor: COLORS.GLOBAL.BLACK,
        },
        '&:hover': {
          // backgroundClip prevents background color from bleeding
          // under the border. Required for semi-transparent border
          // colors to be rendered correctly.
          backgroundClip: 'padding-box',
          backgroundColor: COLORS.LIGHT.GRAY_70,
          borderColor: COLORS.LIGHT.GRAY_70,
        },
        backgroundColor: COLORS.GLOBAL.BLACK,
        borderColor: COLORS.GLOBAL.BLACK,
        color: COLORS.GLOBAL.WHITE,
      }),
      [THEME.ORANGE]: css({
        '&:focus': {
          backgroundColor: COLORS.ORANGE.TINT_70,
          borderColor: COLORS.GLOBAL.BLACK,
        },
        '&:hover': {
          // backgroundClip prevents background color from bleeding
          // under the border. Required for semi-transparent border
          // colors to be rendered correctly.
          backgroundClip: 'padding-box',
          backgroundColor: COLORS.ORANGE.TINT_70,
          borderColor: COLORS.ORANGE.TINT_70,
        },
        backgroundColor: COLORS.GLOBAL.WHITE,
        borderColor: COLORS.GLOBAL.WHITE,
        color: COLORS.GLOBAL.ORANGE,
      }),
    },
    inactive: {
      [THEME.DARK]: css({
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
      [THEME.LIGHT]: css({
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
      [THEME.ORANGE]: css({
        '&:focus': {
          borderColor: COLORS.GLOBAL.BLACK,
        },
        '&:hover': {
          borderColor: COLORS.ORANGE.SHADE_30,
        },
        // eslint-disable-next-line sort-keys
        '&:active': {
          backgroundColor: COLORS.ORANGE.TINT_30,
          borderColor: COLORS.DARK.GRAY_80,
        },
        backgroundColor: COLORS.GLOBAL.ORANGE,
        borderColor: COLORS.ORANGE.SHADE_15,
        color: COLORS.GLOBAL.WHITE,
      }),
    },
  },

  [BUTTON_STYLE.OUTLINED]: {
    // Outlined Dark
    [THEME.DARK]: css({
      '&:active': {
        backgroundColor: COLORS.DARK.GRAY_90,
        borderColor: COLORS.DARK.GRAY_40,
      },
      '&:focus:not(:active)': {
        borderColor: COLORS.GLOBAL.WHITE,
      },
      '&:hover:not(:active)': {
        borderColor: COLORS.DARK.GRAY_40,
      },
      backgroundColor: COLORS.GLOBAL.BLACK,
      borderColor: COLORS.DARK.GRAY_80,
      color: COLORS.GLOBAL.WHITE,
    }),
    // Outlined Light
    [THEME.LIGHT]: css({
      '&:active': {
        backgroundColor: COLORS.LIGHT.GRAY_10,
        borderColor: COLORS.LIGHT.GRAY_70,
      },
      '&:focus:not(:active)': {
        borderColor: COLORS.GLOBAL.BLACK,
      },
      '&:hover:not(:active)': {
        borderColor: COLORS.LIGHT.GRAY_70,
      },
      backgroundColor: COLORS.GLOBAL.WHITE,
      borderColor: COLORS.LIGHT.GRAY_20,
      color: COLORS.GLOBAL.BLACK,
    }),
    // Outlined Orange
    [THEME.ORANGE]: css({
      '&:active': {
        backgroundColor: COLORS.LIGHT.GRAY_20,
        borderColor: COLORS.LIGHT.GRAY_70,
      },
      '&:focus:not(:active)': {
        borderColor: COLORS.GLOBAL.BLACK,
      },
      '&:hover:not(:active)': {
        borderColor: COLORS.LIGHT.GRAY_70,
      },
      backgroundColor: COLORS.GLOBAL.ORANGE,
      borderColor: COLORS.ORANGE.SHADE_30,
      color: COLORS.GLOBAL.WHITE,
    }),
  },
  [BUTTON_STYLE.SOLID]: {
    // Solid Dark
    [THEME.DARK]: css({
      '&:active': {
        borderColor: COLORS.ORANGE.SHADE_30,
      },
      '&:focus:not(:active)': {
        borderColor: COLORS.GLOBAL.WHITE,
      },
      '&:hover:not(:active)': {
        borderColor: COLORS.DARK.GRAY_40,
      },
      backgroundColor: COLORS.GLOBAL.ORANGE,
      borderColor: COLORS.GLOBAL.ORANGE,
      color: COLORS.GLOBAL.WHITE,
    }),
    // Solid Light
    [THEME.LIGHT]: css({
      '&:active': {
        borderColor: COLORS.ORANGE.TINT_70,
      },
      '&:focus:not(:active)': {
        borderColor: COLORS.GLOBAL.BLACK,
      },
      '&:hover:not(:active)': {
        borderColor: COLORS.ORANGE.SHADE_30,
      },
      backgroundColor: COLORS.GLOBAL.ORANGE,
      borderColor: COLORS.GLOBAL.ORANGE,
      color: COLORS.GLOBAL.WHITE,
    }),
    // Solid Orange
    [THEME.ORANGE]: css({
      '&:active': {
        backgroundColor: COLORS.ORANGE.TINT_70,
        borderColor: '#B94A12', // TODO: var
      },
      '&:focus:not(:active)': {
        borderColor: COLORS.GLOBAL.BLACK,
      },
      '&:hover:not(:active)': {
        borderColor: '#B94A12', // TODO: var
      },
      backgroundColor: COLORS.GLOBAL.WHITE,
      color: COLORS.GLOBAL.ORANGE,
    }),
  },
};

export default styles;
