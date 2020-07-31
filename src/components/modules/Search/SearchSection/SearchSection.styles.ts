import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { disableGlobalFocus } from '~/styles/document/accessibility.styles';
import { links } from '~/styles/links.styles';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  eyebrow: [
    typography.eyebrow,
    {
      color: COLORS.GLOBAL.BLACK,
      marginBottom: SPACING.SIZE_15,
      [MQ.M]: {
        marginBottom: SPACING.SIZE_20,
      },
    },
  ],
  isSelected: {
    borderColor: COLORS.GLOBAL.WHITE,
  },
  itemButton: [
    disableGlobalFocus,
    typography.secondaryHeadline,
    links.darkHighlighted,
    links.borderless,
    {
      [MQ.M]: typography.primaryHeadline,
    },
  ],
  listItem: {
    '&:not(:last-child)': {
      paddingBottom: SPACING.SIZE_15,
    },
    [MQ.L]: {
      '&:not(:last-child)': {
        paddingBottom: SPACING.SIZE_10,
      },
    },
  },
  searchQuery: {
    color: COLORS.ORANGE.TINT_70,
  },
  secondaryItemDisplay: [
    typography.smallCopyTight,
    {
      color: COLORS.ORANGE.SHADE_85,
      marginTop: SPACING.SIZE_05,
      [MQ.M]: typography.bodyCopyTight,
    },
  ],
};

export default styles;
