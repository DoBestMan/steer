import { css } from '@emotion/core';

import { BORDERS, COLORS, MQ, SPACING, Z_INDEX } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles = {
  autocompleteGrid: css({
    padding: `${SPACING.SIZE_25}px 0 0`,
    [MQ.M]: {
      padding: `${SPACING.SIZE_50}px 0 ${SPACING.SIZE_20}px`,
    },
    [MQ.L]: {
      borderBottom: BORDERS.SOLID_GRAY_80_1PX,
      padding: `${SPACING.SIZE_50}px 0`,
    },
  }),
  autocompleteGridItem: css({
    position: 'relative',
  }),
  clearPastSearchesButton: css({
    span: {
      borderBottom: BORDERS.DOTTED_TRANSPARENT_2PX,
    },
  }),
  clearPastSearchesWrapper: css({
    alignItems: 'baseline',
    display: 'flex',
    justifyContent: 'space-between',
    [MQ.M]: {
      justifyContent: 'flex-start',
    },
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
  closeSearchWrapper: css({
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
  }),
  container: css({
    backgroundColor: COLORS.GLOBAL.ORANGE,
    minHeight: '100vh',
    paddingBottom: SPACING.SIZE_50,
    width: '100vw',
    zIndex: Z_INDEX.TOP,
    [MQ.M]: {
      paddingBottom: SPACING.SIZE_100,
    },
    [MQ.L]: {
      paddingBottom: SPACING.SIZE_160,
    },
  }),
  errorLabel: [
    typography.secondaryHeadline,
    css({
      color: COLORS.GLOBAL.BLACK,
      [MQ.M]: [typography.primaryHeadline],
    }),
  ],
  pastSearchBullet: css({
    display: 'none',
    margin: `0 ${SPACING.SIZE_10}px`,
    [MQ.M]: {
      display: 'block',
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
      display: 'block',
    },
  }),
  searchIconWrapper: css({
    alignItems: 'flex-start',
    display: 'flex',
    justifyContent: 'center',
    marginTop: SPACING.SIZE_05,
  }),
  searchSectionGridItem: css({
    paddingTop: SPACING.SIZE_40,
    position: 'relative',
    [MQ.M]: {
      paddingTop: SPACING.SIZE_60,
    },
    [MQ.L]: {
      paddingTop: SPACING.SIZE_70,
    },
  }),
};

export default styles;
