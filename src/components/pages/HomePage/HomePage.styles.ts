import { css } from '@emotion/core';

import { MQ, SPACING } from '~/lib/constants';

const styles = {
  content: css({
    padding: `${SPACING.SIZE_80}px 0`,

    [MQ.M]: {
      padding: `${SPACING.SIZE_100}px 0`,
    },

    [MQ.XL]: {
      padding: `${SPACING.SIZE_120}px 0`,
    },
  }),
};

export default styles;
