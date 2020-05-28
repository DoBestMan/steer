import { CSSObject } from '@emotion/core';

import { COLORS, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: CSSObject = {
  button: {
    ':not(:last-of-type)': {
      marginRight: SPACING.SIZE_05,
    },
    position: 'relative',
  },
  filterLabel: [
    typography.bodyCopy,
    {
      color: COLORS.GLOBAL.BLACK,
      marginBottom: SPACING.SIZE_15,
    },
  ],
  filterList: {
    display: 'flex',
    whiteSpace: 'nowrap',
  },
  root: {
    position: 'relative',
  },
};

export default styles;
