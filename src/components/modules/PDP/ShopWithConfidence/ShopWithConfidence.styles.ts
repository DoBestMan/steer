import { CSSObject } from '@emotion/core';

import { COLORS, MQ, RADIUS, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: CSSObject = {
  carouselContainer: {
    '.swiper-slide': {
      flex: '0 1 auto',
      minWidth: 'auto',

      [MQ.L]: {
        '&:not(:last-of-type)': {
          marginRight: SPACING.SIZE_90,
        },
      },
    },
  },
  checkmark: {
    background: COLORS.GLOBAL.BLACK,
    borderRadius: RADIUS.CIRCLE,
    color: COLORS.GLOBAL.WHITE,
    height: 12,
    marginLeft: SPACING.SIZE_05,
    padding: 3,
    width: 12,
  },
  heading: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: SPACING.SIZE_20,

    [MQ.L]: {
      display: 'block',
      marginBottom: SPACING.SIZE_30,
    },
  },
  learnMoreButton: [
    typography.labelCopyTight,
    {
      color: COLORS.LIGHT.GRAY_70,

      span: {
        borderColor: COLORS.LIGHT.GRAY_70,
      },

      ':hover, :focus': {
        span: {
          borderColor: COLORS.GLOBAL.BLACK,
        },
      },
    },
  ],
  statDetail: [
    typography.labelCopyTight,
    {
      color: COLORS.LIGHT.GRAY_70,
      display: 'block',
      lineHeight: 1.25,
      whiteSpace: 'nowrap',

      [MQ.L]: typography.bodyCopyTight,
    },
  ],
  statHeading: [
    typography.primaryHeadline,
    {
      display: 'block',
      marginBottom: SPACING.SIZE_05,
      whiteSpace: 'nowrap',
      [MQ.L]: {
        marginBottom: SPACING.SIZE_05,
      },
    },
  ],
  title: [
    typography.tertiaryHeadline,
    {
      alignItems: 'center',
      display: 'flex',

      [MQ.L]: {
        marginBottom: SPACING.SIZE_05,
      },
    },
  ],
};

export default styles;
