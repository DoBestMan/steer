import { EASING, StylesMap } from '~/lib/constants';

export const styles: StylesMap = {
  container: {
    fontVariantNumeric: 'tabular-nums',
    overflow: 'hidden',
    position: 'relative',
    verticalAlign: 'sub',
  },
  ref: {
    lineHeight: 'normal',
    opacity: 0,
    position: 'absolute',
  },
  slot: {
    left: 0,
    position: 'absolute',

    span: {
      display: 'block',
    },

    top: 0, // for some reasons
    transition: `transform 3500ms ${EASING.CUSTOM_SLOTS_EASE}`,
    width: '100%',
    willChange: 'transform',
  },
  slotContainer: {
    display: 'inline-flex',
    overflow: 'hidden',
    position: 'relative',
  },
  slotContainers: {
    lineHeight: 'normal',
  },
  slotNotANumber: {
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
};
