import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  containerLabel: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  count: [
    typography.smallCopyTight,
    {
      color: COLORS.LIGHT.GRAY_70,
    },
  ],
  description: [typography.smallCopyTight, { color: COLORS.LIGHT.GRAY_70 }],
  disabled: {
    opacity: 0.2,
  },
  flair: [
    typography.secondarySubhead,
    {
      ':before': {
        color: COLORS.LIGHT.GRAY_70,
        padding: `0 ${SPACING.SIZE_05}px`,
        content: '"•"',
        fontSize: 8,
      },
      color: COLORS.GLOBAL.ORANGE,
    },
  ],
  label: [
    typography.secondaryHeadline,
    {
      marginRight: SPACING.SIZE_05,
      [MQ.L]: typography.tertiaryHeadline,
    },
  ],
  root: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  rootActive: { color: COLORS.GLOBAL.ORANGE },
  // main label line height causes misalignment on various breakpoints so wrap tags (flair, count)
  tags: {
    alignItems: 'flex-end',
    display: 'flex',
    paddingBottom: 3,
    [MQ.M]: {
      paddingBottom: SPACING.SIZE_05,
    },
    [MQ.L]: {
      paddingBottom: SPACING.SIZE_02,
    },
  },
};

export default styles;
