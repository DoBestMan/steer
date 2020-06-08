import { css } from '@emotion/core';

import { EASING } from '~/lib/constants';

export const styles = {
  container: css({
    fontVariantNumeric: 'tabular-nums',
    overflow: 'hidden',
    position: 'relative',
    verticalAlign: 'sub',
  }),
  ref: css({
    lineHeight: 'normal',
    opacity: 0,
    position: 'absolute',
  }),
  slot: css({
    left: 0,
    position: 'absolute',

    span: {
      display: 'block',
    },

    top: 0, // for some reasons
    transition: `transform 3500ms ${EASING.CUSTOM_SLOTS_EASE}`,
    width: '100%',
    willChange: 'transform',
  }),
  slotContainer: css({
    display: 'inline-flex',
    overflow: 'hidden',
    position: 'relative',
  }),
  slotContainers: css({
    lineHeight: 'normal',
  }),
  slotNotANumber: css({
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
  }),
};
