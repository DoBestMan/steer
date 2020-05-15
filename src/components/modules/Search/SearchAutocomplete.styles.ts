import { css, CSSObject } from '@emotion/core';

import { BORDERS, COLORS, MQ, SPACING, TIME, Z_INDEX } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: CSSObject = {
  actionIcon: {
    svg: {
      display: 'block',
      height: SPACING.SIZE_20,
      width: SPACING.SIZE_20,
    },
  },
  autocompleteGrid: {
    backgroundColor: COLORS.GLOBAL.ORANGE,
    borderBottom: '1px solid transparent',
    left: 0,
    padding: `${SPACING.SIZE_25}px 0`,
    position: 'fixed',
    top: 0,
    transition: `border-color ${TIME.MS100}ms ease`,
    zIndex: Z_INDEX.FRONT,
    [MQ.M]: {
      padding: `${SPACING.SIZE_50}px 0`,
    },
    [MQ.L]: {
      borderBottom: BORDERS.SOLID_GRAY_80_1PX,
    },
  },
  autocompleteGridItem: {
    position: 'relative',
  },
  clearSearch: {
    color: COLORS.LIGHT.GRAY_70,
    marginLeft: SPACING.SIZE_15,
    [MQ.M]: {
      svg: {
        height: 24,
        width: 24,
      },
    },
  },
  closeSearchButton: {
    span: {
      borderBottom: BORDERS.DOTTED_TRANSPARENT_2PX,
    },
    [MQ.M]: {
      span: [typography.bodyCopy],
    },
  },
  closeSearchWrapper: {
    alignItems: 'flex-start',
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'absolute',
    right: 0,
    top: 4,
    [MQ.M]: {
      top: SPACING.SIZE_10,
    },
    [MQ.XL]: {
      top: SPACING.SIZE_15,
    },
  },
  comboboxWrapper: {
    width: '100%',
  },
  errorLabel: [
    typography.secondaryHeadline,
    {
      color: COLORS.GLOBAL.BLACK,
      [MQ.M]: [typography.primaryHeadline],
    },
  ],
  errorMessage: typography.primaryHeadline,
  input: [
    typography.secondaryHeadline,
    {
      backgroundColor: 'inherit',
      border: 'none',
      color: COLORS.GLOBAL.WHITE,
      padding: 0,
      width: '100%',
      [MQ.M]: typography.primaryHeadline,
    },
  ],
  inputContainer: {
    alignItems: 'baseline',
    display: 'flex',
    paddingRight: SPACING.SIZE_50,
    position: 'relative',
    [MQ.M]: {
      paddingRight: SPACING.SIZE_80,
    },
  },
  label: [
    typography.secondaryHeadline,
    css({
      color: COLORS.ORANGE.TINT_70,
      left: 0,
      opacity: 1,
      pointerEvents: 'none',
      position: 'absolute',
      top: 0,
      [MQ.M]: typography.primaryHeadline,
    }),
  ],
  labelHidden: {
    opacity: 0,
  },
  listbox: {
    listStyle: 'none',
  },
  searchIcon: {
    '> svg': {
      height: 34,
      width: 34,
    },
    color: COLORS.ORANGE.TINT_70,
  },
  searchIconGridItem: {
    alignItems: 'center',
    display: 'none',
    justifyContent: 'center',
    [MQ.L]: {
      display: 'block',
    },
  },
  searchIconWrapper: {
    alignItems: 'flex-start',
    display: 'flex',
    justifyContent: 'center',
    marginTop: SPACING.SIZE_05,
  },
  searchResultsGrid: {
    paddingTop: SPACING.SIZE_80,
    [MQ.M]: {
      paddingTop: 145,
    },
  },
  searchResultsGridItem: {
    padding: `${SPACING.SIZE_15}px 0 ${SPACING.SIZE_25}px`,
    [MQ.M]: {
      padding: `${SPACING.SIZE_30}px 0`,
    },
    [MQ.L]: {
      padding: `${SPACING.SIZE_70}px 0 ${SPACING.SIZE_10}px`,
    },
  },
};

export default styles;
