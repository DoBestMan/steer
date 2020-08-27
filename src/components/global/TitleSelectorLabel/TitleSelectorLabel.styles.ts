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
  description: [
    typography.smallCopyTight,
    {
      color: COLORS.LIGHT.GRAY_70,
      marginTop: SPACING.SIZE_02,
      [MQ.L]: {
        marginTop: 0,
      },
    },
  ],
  disabled: {
    opacity: 0.2,
  },
  flair: [
    typography.secondarySubhead,
    {
      ':before': {
        color: COLORS.GLOBAL.BLACK,
        content: '"•"',
        display: 'inline-block',
        fontSize: 8,
        padding: `0 ${SPACING.SIZE_05}px`,
        position: 'relative',
        top: -SPACING.SIZE_02,
      },
      color: COLORS.GLOBAL.ORANGE,
      paddingRight: SPACING.SIZE_20,
    },
  ],
  label: [
    typography.secondaryHeadline,
    {
      marginRight: SPACING.SIZE_05,
      [MQ.L]: typography.primarySubhead,
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
      paddingBottom: 4,
    },
  },
};

export default styles;
