import { CSSObject } from '@emotion/core';

import { COLORS, MQ, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: CSSObject = {
  checkboxLabel: {
    flexGrow: 1,
  },
  container: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    ':not(:last-of-type)': { marginBottom: SPACING.SIZE_15 },
  },
  containerLabel: {
    alignItems: 'center',
    display: 'flex',
  },
  count: [
    typography.smallCopy,
    {
      color: COLORS.LIGHT.GRAY_70,
      paddingTop: SPACING.SIZE_02,
    },
  ],
  description: [typography.smallCopyTight, { color: COLORS.LIGHT.GRAY_70 }],
  flair: [
    typography.smallCopyTight,
    {
      ':before': {
        color: COLORS.GLOBAL.BLACK,
        padding: `0 ${SPACING.SIZE_05}px`,
        content: '"•"',
        fontSize: 8,
      },
      color: COLORS.GLOBAL.ORANGE,
    },
  ],
  group: {
    marginBottom: SPACING.SIZE_40,
  },
  groupTitle: [
    typography.eyebrow,
    {
      color: COLORS.LIGHT.GRAY_70,
      marginBottom: SPACING.SIZE_15,
    },
  ],
  label: [
    typography.secondaryHeadline,
    {
      marginRight: SPACING.SIZE_05,
      [MQ.L]: typography.primarySubhead,
    },
  ],
  title: [
    typography.eyebrow,
    {
      marginBottom: SPACING.SIZE_40,
      [MQ.L]: { display: 'none' },
    },
  ],
};

export default styles;
