import { css } from '@emotion/core';

import { COLORS, SPACING } from '~/lib/constants';

const styles = {
  description: css({
    color: COLORS.DARK.GRAY_40,
  }),
  link: css({
    marginTop: SPACING.SIZE_40,

    span: { borderBottomColor: 'currentColor' },
  }),
  title: css({
    color: COLORS.GLOBAL.WHITE,
  }),
};

export default styles;
