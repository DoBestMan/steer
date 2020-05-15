import { css } from '@emotion/core';

import { BORDERS, COLORS, MQ, SPACING, Z_INDEX } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles = {
  actionIcon: css({
    svg: {
      display: 'block',
      height: SPACING.SIZE_20,
      width: SPACING.SIZE_20,
    },
  }),
  clearSearch: [
    typography.bodyCopy,
    css({
      color: COLORS.LIGHT.GRAY_70,
    }),
  ],
  comboboxWrapper: css({
    width: '100%',
  }),
  errorMessage: typography.primaryHeadline,
  input: [
    typography.primaryHeadline,
    css({
      backgroundColor: 'inherit',
      border: 'none',
      width: '100%',
    }),
  ],
  inputContainer: css({
    alignItems: 'baseline',
    display: 'flex',
    position: 'relative',
  }),
  label: [
    typography.primaryHeadline,
    css({
      color: COLORS.LIGHT.GRAY_70,
      left: 0,
      opacity: 1,
      pointerEvents: 'none',
      position: 'absolute',
      top: 0,
    }),
  ],
  labelHidden: css({
    opacity: 0,
  }),
  listbox: css({
    listStyle: 'none',
    zIndex: Z_INDEX.FRONT,
  }),
};

export const locationAutocomplete = css({
  '> div': {
    borderBottom: BORDERS.SOLID_BLACK_1PX,
    paddingBottom: SPACING.SIZE_15,
  },
});

export const searchAutocomplete = css({
  ' > div': {
    paddingRight: SPACING.SIZE_50,
  },
  input: {
    color: COLORS.GLOBAL.WHITE,
  },
  'input, label': [typography.secondaryHeadline],
  label: {
    color: COLORS.ORANGE.TINT_70,
  },
  [MQ.M]: {
    ' > div': {
      paddingRight: SPACING.SIZE_80,
    },
    'input, label': [typography.primaryHeadline],
  },
});

export default styles;
