import { css } from '@emotion/core';

import { BORDERS, COLORS, MQ, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles = {
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
      border: 'none',
      width: '100%',
    }),
  ],
  inputContainer: css({
    alignItems: 'baseline',
    borderBottom: BORDERS.SOLID_BLACK_1PX,
    display: 'flex',
    paddingBottom: SPACING.SIZE_15,
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
    zIndex: 1,
  }),
  listboxItem: [
    typography.primaryHeadline,

    css({
      lineHeight: 1.68,
      position: 'relative',
      [MQ.M]: { lineHeight: 1.68 },
    }),
  ],
  listboxItemHighlight: css({
    color: COLORS.LIGHT.GRAY_70,
  }),
  listboxItemSecondary: [
    typography.bodyCopy,
    css({ marginLeft: SPACING.SIZE_10 }),
  ],
  listboxItemSelected: css({
    outline: BORDERS.FOCUS_STATE,
  }),
  searchIcon: css({
    svg: {
      display: 'block',
      height: SPACING.SIZE_20,
      width: SPACING.SIZE_20,
    },
  }),
};

export default styles;
