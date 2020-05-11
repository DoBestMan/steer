import { css } from '@emotion/core';

import { BORDERS, COLORS, SPACING, Z_INDEX } from '~/lib/constants';
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
    marginTop: 30,
    zIndex: Z_INDEX.FRONT,
  }),
};

export const locationAutocomplete = css({
  '> div': {
    borderBottom: BORDERS.SOLID_BLACK_1PX,
    paddingBottom: SPACING.SIZE_15,
  },
});

export default styles;
