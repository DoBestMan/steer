import { COLORS, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  supportContainer: {
    marginBottom: -SPACING.SIZE_20,
    marginTop: SPACING.SIZE_20,
  },
  supportItem: {
    flex: 1,
    paddingRight: SPACING.SIZE_40,
    marginBottom: SPACING.SIZE_20,
    whiteSpace: 'nowrap',
  },
  supportOptions: {
    alignItems: 'flex-start',
    display: 'flex',
    flexWrap: 'wrap',
  },
  supportTitle: [
    typography.primarySubhead,
    {
      color: COLORS.GLOBAL.WHITE,
      marginBottom: SPACING.SIZE_20,
      marginTop: SPACING.SIZE_20,
    },
  ],
  title: [
    typography.primaryHeadline,
    {
      color: COLORS.GLOBAL.WHITE,
      marginBottom: SPACING.SIZE_20,
    },
  ],
};

export default styles;
