import { CSSObject } from '@emotion/core';

import { BORDERS, COLORS, MQ, SPACING, TIME } from '~/lib/constants';
import { typography, typographyStyles } from '~/styles/typography.styles';

const styles: CSSObject = {
  alternateSearch: {
    borderBottom: BORDERS.SOLID_GRAY_80_1PX,
    padding: `${SPACING.SIZE_60}px 0`,
  },
  alternateSearchCopy: [
    typography.bodyCopy,
    {
      color: COLORS.DARK.GRAY_40,
      paddingBottom: SPACING.SIZE_20,
    },
  ],
  alternateSearchLink: {
    span: {
      borderColor: COLORS.DARK.GRAY_40,
    },
  },
  alternateSearchTitle: [
    typography.tertiaryHeadline,
    {
      color: COLORS.GLOBAL.WHITE,
      paddingBottom: SPACING.SIZE_10,
    },
  ],
  container: {
    padding: `${SPACING.SIZE_40}px 0 0`,
    [MQ.M]: {
      padding: `${SPACING.SIZE_70}px 0 0`,
    },
    [MQ.L]: {
      padding: `${SPACING.SIZE_40}px 0 ${SPACING.SIZE_20}px`,
    },
  },
  eyebrow: [
    typography.primaryHeadline,
    {
      color: COLORS.GLOBAL.ORANGE,
      [MQ.L]: typographyStyles.secondaryHeadline.XL,
    },
  ],
  imageWrapper: {
    margin: `0 -${SPACING.SIZE_20}px`,
    [MQ.L]: {
      margin: `0 -${SPACING.SIZE_60}px`,
    },
  },
  stepItem: [
    typography.bodyCopy,
    {
      '&:not(:last-child)': {
        paddingBottom: SPACING.SIZE_20,
      },
      a: {
        '&:hover': {
          borderColor: COLORS.GLOBAL.WHITE,
          color: COLORS.GLOBAL.WHITE,
        },
        borderBottom: `2px dotted ${COLORS.DARK.GRAY_40}`,
        transition: `border-color ${TIME.MS100}ms ease, color ${TIME.MS100}ms ease`,
      },
      color: COLORS.DARK.GRAY_40,
      listStyleType: 'inherit',
    },
  ],
  stepList: {
    padding: `0 0 ${SPACING.SIZE_60}px ${SPACING.SIZE_25}px`,
  },
  supportPrompt: {
    padding: `${SPACING.SIZE_60}px 0 0`,
  },
  supportPromptButton: {
    '&:not(:last-child)': {
      paddingBottom: SPACING.SIZE_20,
    },
  },
  supportPromptTitle: [
    typography.tertiaryHeadline,
    {
      color: COLORS.GLOBAL.WHITE,
      paddingBottom: SPACING.SIZE_20,
    },
  ],
  title: [
    typography.jumboHeadline,
    {
      color: COLORS.GLOBAL.WHITE,
      margin: `0 0 ${SPACING.SIZE_40}px`,
      [MQ.L]: typographyStyles.primaryHeadline.XL,
    },
  ],
};

export default styles;
