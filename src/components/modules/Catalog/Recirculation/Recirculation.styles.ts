import { CSSObject } from '@emotion/core';

import { SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: CSSObject = {
  title: [
    typography.primaryHeadline,
    {
      marginBottom: SPACING.SIZE_40,
    },
  ],
};

export default styles;
