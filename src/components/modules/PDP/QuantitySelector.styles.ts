import { CSSObject } from '@emotion/core';

import { COLORS, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: CSSObject = {
  confirmButton: {
    padding: `0 ${SPACING.SIZE_70}px`,
  },
  container: {
    paddingTop: SPACING.SIZE_30,
    textAlign: 'center',
  },
  copy: [typography.smallCopy],
  cta: [
    typography.secondaryHeadline,
    {
      marginBottom: SPACING.SIZE_05,
    },
  ],
  icon: {
    color: COLORS.GLOBAL.ORANGE,
    justifyContent: 'center',
    marginBottom: SPACING.SIZE_10,
  },
  title: [
    typography.secondaryHeadline,
    {
      color: COLORS.GLOBAL.ORANGE,
      marginBottom: SPACING.SIZE_30,
    },
  ],
};

export default styles;
