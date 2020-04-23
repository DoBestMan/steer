import { css } from '@emotion/core';

import { COLORS, MQ } from '~/lib/constants';

const hideOnSmall = {
  display: 'none',

  [MQ.M]: {
    display: 'block',
  },
};

const styles = {
  container: css({
    width: '100%',
  }),
  description: css({
    ...hideOnSmall,
    color: COLORS.DARK.GRAY_40,
  }),
  link: css({
    ...hideOnSmall,
    marginTop: 40,

    span: { borderBottomColor: 'currentColor' },
  }),
  title: css({
    ...hideOnSmall,
    color: COLORS.GLOBAL.WHITE,
  }),
};

export default styles;
