import { CSSObject } from '@emotion/core';

import { COLORS, RADIUS, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: CSSObject = {
  checkmark: {
    background: COLORS.GLOBAL.BLACK,
    borderRadius: RADIUS.CIRCLE,
    color: COLORS.GLOBAL.WHITE,
    height: 12,
    marginLeft: SPACING.SIZE_05,
    padding: 3,
    width: 12,
  },
  gliderContainer: {
    '.glider-slide': {
      flex: '0 1 0',
      marginRight: SPACING.SIZE_30,
      minWidth: 'auto',
    },
  },
  heading: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: SPACING.SIZE_20,
  },
  learnMoreButton: [
    typography.smallCopyTight,
    {
      color: COLORS.LIGHT.GRAY_70,
    },
  ],
  statDetail: [
    typography.smallCopy,
    {
      color: COLORS.LIGHT.GRAY_70,
      display: 'block',
      lineHeight: 1.25,
      whiteSpace: 'nowrap',
    },
  ],
  statHeading: [
    typography.primaryHeadline,
    {
      marginBottom: SPACING.SIZE_05,
      whiteSpace: 'nowrap',
    },
  ],
  title: [
    typography.tertiaryHeadline,
    {
      alignItems: 'center',
      display: 'flex',
    },
  ],
};

export default styles;
