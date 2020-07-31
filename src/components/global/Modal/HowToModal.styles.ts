import { BORDERS, COLORS, MQ, SPACING, StylesMap, TIME } from '~/lib/constants';
import { links } from '~/styles/links.styles';
import { typography, typographyStyles } from '~/styles/typography.styles';

const styles: StylesMap = {
  alternateSearch: {
    borderBottom: BORDERS.SOLID_GRAY_80_1PX,
    padding: `${SPACING.SIZE_60}px 0`,
  },
  alternateSearchCopy: [
    typography.bodyCopy,
    {
      color: COLORS.DARK.GRAY_40,
    },
  ],
  alternateSearchLink: {
    span: {
      borderColor: COLORS.DARK.GRAY_40,
      transition: `border-color ${TIME.MS100}ms ease, color ${TIME.MS100}ms ease`,
    },
  },
  alternateSearchLinkWrapper: {
    display: 'flex',
  },
  alternateSearchTitle: [
    typography.tertiaryHeadline,
    {
      color: COLORS.GLOBAL.WHITE,
      paddingBottom: SPACING.SIZE_10,
    },
  ],
  container: {
    padding: `${SPACING.SIZE_50}px 0 ${SPACING.SIZE_60}px`,
    [MQ.M]: {
      padding: `${SPACING.SIZE_80}px 0 ${SPACING.SIZE_60}px`,
    },
    [MQ.L]: {
      padding: `${SPACING.SIZE_50}px 0 ${SPACING.SIZE_60}px`,
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
      a: links.dark,
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
