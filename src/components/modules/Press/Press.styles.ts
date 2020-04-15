import { css } from '@emotion/core';

import { COLORS } from '~/lib/constants';

const styles = {
  container: css({
    borderTop: `1px solid ${COLORS.DARK.GRAY_80}`,
    display: 'flex',
    justifyContent: 'space-between',
    padding: '45px 0',
    width: '100%',
  }),
  copy: css({
    '&::after': {
      content: 'close-quote',
    },
    '&::before': {
      content: 'open-quote',
    },
    color: COLORS.DARK.GRAY_40,
    marginTop: 20,
    quotes: '"“" "”" "‘" "’"',
  }),
  item: css({
    '&:not(last-child)': {
      marginRight: 20,
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
