import { keyframes } from '@emotion/core';

import { SPACING } from '~/lib/constants';

export const fadeIn = keyframes({
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
});

export const fadeOut = keyframes({
  '0%': {
    opacity: 1,
  },
  '100%': {
    opacity: 0,
  },
});

export const fadeInUp = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translate3D(0, 100%, 0)',
  },
  '50%': {
    opacity: 0,
  },
  // eslint-disable-next-line sort-keys
  '100%': {
    opacity: 1,
    transform: 'translate3D(0)',
  },
});

export const fadeInUp20px = keyframes({
  '0%': {
    opacity: 0,
    transform: `translate3D(0, ${SPACING.SIZE_20}px, 0)`,
  },
  '50%': {
    opacity: 0,
  },
  // eslint-disable-next-line sort-keys
  '100%': {
    opacity: 1,
    transform: 'translate3D(0)',
  },
});

export const fadeOutDown = keyframes({
  '0%': {
    opacity: 1,
    transform: 'translate3D(0)',
  },
  '50%': {
    opacity: 1,
  },
  // eslint-disable-next-line sort-keys
  '100%': {
    opacity: 0,
    transform: 'translate3D(0, 100%, 0)',
  },
});

export const fadeOutDown20px = keyframes({
  '0%': {
    opacity: 1,
    transform: 'translate3D(0)',
  },
  '50%': {
    opacity: 1,
  },
  // eslint-disable-next-line sort-keys
  '100%': {
    opacity: 0,
    transform: `translate3D(0, ${SPACING.SIZE_20}px, 0)`,
  },
});

export const slideFadeInLeft = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translate3d(100%, 0, 0)',
  },
  '50%': {
    opacity: 0,
  },
  // eslint-disable-next-line sort-keys
  '100%': {
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
  },
});

export const slideFadeOutLeft = keyframes({
  '0%': {
    opacity: 1,
  },
  '50%': {
    opacity: 1,
  },
  // eslint-disable-next-line sort-keys
  '100%': {
    opacity: 0,
    transform: 'translate3d(100%, 0, 0)',
  },
});
