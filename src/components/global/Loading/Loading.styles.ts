import { css, keyframes } from '@emotion/core';

import { COLORS, RADIUS, TIME } from '~/lib/constants';

const CONSTANTS = {
  ANIMATION_STEP: TIME.MS300,
  CIRCLE_MARGIN: 5,
  CIRCLE_SIZE: 6,
  DARK_ACTIVE: COLORS.DARK.GRAY_40,
  DARK_DEFAULT: COLORS.DARK.GRAY_80,
  LIGHT_ACTIVE: COLORS.GLOBAL.BLACK,
  LIGHT_DEFAULT: COLORS.LIGHT.GRAY_20,
};

export const loadingDark = keyframes({
  '0%': {
    background: CONSTANTS.DARK_DEFAULT,
  },
  '16.66667%': {
    background: CONSTANTS.DARK_DEFAULT,
  },
  '33.33333%': {
    background: CONSTANTS.DARK_ACTIVE,
  },
  '50%': {
    background: CONSTANTS.DARK_ACTIVE,
  },
  '66.66667%': {
    background: CONSTANTS.DARK_DEFAULT,
  },
  '83.33333%': {
    background: CONSTANTS.DARK_DEFAULT,
  },
});

export const loadingLight = keyframes({
  '0%': {
    background: CONSTANTS.LIGHT_DEFAULT,
  },
  '16.66667%': {
    background: CONSTANTS.LIGHT_DEFAULT,
  },
  '33.33333%': {
    background: CONSTANTS.LIGHT_ACTIVE,
  },
  '50%': {
    background: CONSTANTS.LIGHT_ACTIVE,
  },
  '66.66667%': {
    background: CONSTANTS.LIGHT_DEFAULT,
  },
  '83.33333%': {
    background: CONSTANTS.LIGHT_DEFAULT,
  },
});

const circleStyles = {
  borderRadius: RADIUS.CIRCLE,
  content: '""',
  display: 'block',
  height: CONSTANTS.CIRCLE_SIZE,
  width: CONSTANTS.CIRCLE_SIZE,
};

const styles = {
  circle: css({
    ...circleStyles,
    '&:after': {
      animationDelay: `${CONSTANTS.ANIMATION_STEP * 2}ms`,
      left: CONSTANTS.CIRCLE_SIZE + CONSTANTS.CIRCLE_MARGIN,
    },
    '&:after, &:before': {
      ...circleStyles,
      content: '""',
      position: 'absolute',
    },
    '&:before': {
      animationDelay: '0s',
      left: -(CONSTANTS.CIRCLE_SIZE + CONSTANTS.CIRCLE_MARGIN),
    },
    animationDelay: `${CONSTANTS.ANIMATION_STEP}ms`,
    left: CONSTANTS.CIRCLE_SIZE + CONSTANTS.CIRCLE_MARGIN,
    position: 'relative',
  }),
  container: css({
    display: 'block',
    width: CONSTANTS.CIRCLE_MARGIN * 2 + CONSTANTS.CIRCLE_SIZE * 3,
  }),
  dark: css({
    '&, &:after, &:before': {
      animationDuration: `${CONSTANTS.ANIMATION_STEP * 3}ms`,
      animationIterationCount: 'infinite',
      animationName: loadingDark,
      background: CONSTANTS.DARK_DEFAULT,
    },
  }),
  light: css({
    '&, &:after, &:before': {
      animationDuration: `${CONSTANTS.ANIMATION_STEP * 3}ms`,
      animationIterationCount: 'infinite',
      animationName: loadingLight,
      background: COLORS.LIGHT.GRAY_20,
    },
  }),
};

export default styles;
