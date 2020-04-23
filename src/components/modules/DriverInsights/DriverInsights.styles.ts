import { css } from '@emotion/core';

import { SPACING, MQ } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles = {
  cards: css({
    '> div': {
      marginBottom: SPACING.SIZE_20,
    },
  }),
  cta: css({
    [MQ.S]: [
      typography.smallCopy,
      {
        marginBottom: SPACING.SIZE_20,
      },
    ],
    [MQ.M]: [
      typography.bodyCopy,
      {
        marginBottom: 0,
      },
    ],
  }),
  description: css({
    marginBottom: SPACING.SIZE_40,
  }),
  title: css({
    marginBottom: SPACING.SIZE_20,
    [MQ.S]: typography.eyebrow,
    [MQ.M]: [
      typography.primaryHeadline,
      {
        marginBottom: SPACING.SIZE_10,
        textTransform: 'initial',
      },
    ],
  }),
};

export default styles;
