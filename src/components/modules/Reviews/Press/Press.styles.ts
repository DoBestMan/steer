import { css } from '@emotion/core';

import { BORDERS, COLORS, SPACING } from '~/lib/constants';

const styles = {
  container: css({
    borderTop: BORDERS.SOLID_GRAY_80_1PX,
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: SPACING.SIZE_10,
    paddingTop: SPACING.SIZE_40,
  }),
  copy: css({
    '&::after': {
      content: 'close-quote',
    },
    '&::before': {
      content: 'open-quote',
    },
    color: COLORS.DARK.GRAY_40,
    marginTop: SPACING.SIZE_20,
    quotes: '"“" "”" "‘" "’"',
  }),
  item: css({
    '&:not(last-child)': {
      marginRight: SPACING.SIZE_20,
    },
    textAlign: 'center',
  }),
  logo: css({
    height: 30,
    margin: 'auto',
    width: 'auto',
  }),
};

export default styles;
