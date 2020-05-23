import { css } from '@emotion/core';

import { COLORS } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles = {
  filterLabel: [
    typography.bodyCopy,
    css({
      color: COLORS.GLOBAL.BLACK,
    }),
  ],
};

export default styles;
