import { css } from '@emotion/core';

import { SPACING } from '~/lib/constants';

const styles = {
  listItem: css({
    '&:not(:last-child)': {
      marginBottom: SPACING.SIZE_20,
    },
  }),
};

export default styles;
