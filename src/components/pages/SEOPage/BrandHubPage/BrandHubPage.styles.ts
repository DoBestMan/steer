import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  brandsList: {
    marginBottom: SPACING.SIZE_60,
  },
  breadCrumbs: {
    marginBottom: SPACING.SIZE_40,
  },
  header: [
    typography.primaryHeadline,
    {
      marginBottom: SPACING.SIZE_20,
    },
  ],
  pageHeader: {
    [MQ.L]: {
      marginTop: SPACING.SIZE_70,
    },
  },
  root: {
    backgroundColor: COLORS.GLOBAL.WHITE,
    paddingTop: SPACING.SIZE_80,
    [MQ.L]: {
      paddingTop: SPACING.SIZE_120,
    },
  },
  search: {
    marginBottom: SPACING.SIZE_40,
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  searchIcon: {
    display: 'inline-block',
    position: 'absolute',
    right: SPACING.SIZE_20,
  },
  searchInput: {
    width: '100%',
  },
};

export default styles;
