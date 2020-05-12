import { css } from '@emotion/core';

import { BORDERS, COLORS, MQ, SPACING, Z_INDEX } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles = {
  autocompleteGrid: css({
    padding: `${SPACING.SIZE_25}px 0`,
    [MQ.M]: {
      padding: `${SPACING.SIZE_50}px 0`,
    },
    [MQ.L]: {
      borderBottom: BORDERS.SOLID_GRAY_80_1PX,
    },
  }),
  autocompleteGridItem: css({
    position: 'relative',
  }),
  clearSearch: css({
    color: COLORS.LIGHT.GRAY_70,
    marginLeft: SPACING.SIZE_15,
    [MQ.M]: {
      svg: {
        height: 24,
        width: 24,
      },
    },
  }),
  closeSearchButton: {
    span: {
      borderBottom: BORDERS.DOTTED_TRANSPARENT_2PX,
    },
    [MQ.M]: {
      span: [typography.bodyCopy],
    },
  },
  container: css({
    backgroundColor: COLORS.GLOBAL.ORANGE,
    height: '100vh',
    width: '100vw',
    zIndex: Z_INDEX.TOP,
  }),
  errorLabel: [
    typography.secondaryHeadline,
    css({
      color: COLORS.GLOBAL.BLACK,
      [MQ.M]: [typography.primaryHeadline],
    }),
  ],
  linkWrapper: css({
    alignItems: 'flex-start',
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'absolute',
    right: 0,
    top: 3,
    [MQ.M]: {
      top: SPACING.SIZE_10,
    },
    [MQ.XL]: {
      top: SPACING.SIZE_15,
    },
  }),
  searchIcon: css({
    '> svg': {
      height: 34,
      width: 34,
    },
    color: COLORS.ORANGE.TINT_30,
  }),
  searchIconGridItem: css({
    alignItems: 'center',
    display: 'none',
    justifyContent: 'center',

    [MQ.L]: {
      display: 'flex',
    },
  }),
};

export default styles;
