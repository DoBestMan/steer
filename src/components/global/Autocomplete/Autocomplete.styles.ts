import { css } from '@emotion/core';

import { BORDERS, COLORS, MQ, SPACING, Z_INDEX } from '~/lib/constants';
import { disableGlobalFocus } from '~/styles/document/accessibility.styles';
import { typography } from '~/styles/typography.styles';

const styles = {
  actionIcon: css({
    [MQ.S]: {
      display: 'none',
    },
    [MQ.M]: {
      display: 'inherit',
      svg: {
        display: 'block',
        height: SPACING.SIZE_20,
        width: SPACING.SIZE_20,
      },
    },
  }),
  clearSearch: [
    typography.labelCopyTight,
    css({
      color: COLORS.LIGHT.GRAY_70,
    }),
  ],
  comboboxWrapper: css({
    width: '100%',
  }),
  errorMessage: typography.primaryHeadline,
  input: [
    typography.locationHeadline,
    disableGlobalFocus,
    css({
      backgroundColor: 'inherit',
      border: 'none',
      padding: 0,
      width: '100%',
    }),
  ],
  inputContainer: css({
    alignItems: 'center',
    borderBottom: BORDERS.SOLID_BLACK_1PX,
    display: 'flex',
    paddingBottom: SPACING.SIZE_15,
    position: 'relative',
    [MQ.M]: {
      borderBottom: BORDERS.SOLID_BLACK_1PX,
      paddingBottom: SPACING.SIZE_15,
    },
  }),
  label: [
    typography.locationHeadline,
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

export default styles;
