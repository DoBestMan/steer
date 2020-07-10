import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: SPACING.SIZE_40,

    [MQ.L]: {
      display: 'block',
      paddingBottom: 0,
    },
  },
  cta: {
    alignSelf: 'flex-end',
    paddingTop: SPACING.SIZE_05,
    [MQ.L]: {
      paddingTop: SPACING.SIZE_10,
    },
  },
  momentList: {
    marginBottom: SPACING.SIZE_10,
    [MQ.M]: {
      marginBottom: SPACING.SIZE_15,
    },
    [MQ.L]: {
      marginBottom: SPACING.SIZE_40,
    },
  },
  ratingContainer: {
    display: 'flex',
    flexDirection: 'column',
    [MQ.M]: {
      paddingTop: SPACING.SIZE_05,
    },
    [MQ.L]: {
      paddingTop: SPACING.SIZE_10,
      display: 'block',
    },
  },
  ratingsList: {
    marginBottom: SPACING.SIZE_40,
    [MQ.M]: {
      marginBottom: SPACING.SIZE_60,
    },
    [MQ.L]: {
      marginBottom: SPACING.SIZE_40,
    },
  },
  section: {
    backgroundColor: COLORS.GLOBAL.BLACK,
  },
  seeAll: {
    marginTop: SPACING.SIZE_20,
    [MQ.L]: {
      marginTop: SPACING.SIZE_40,
    },
  },
  source: {
    '.preposition': {
      display: 'none',
      [MQ.M]: {
        display: 'inline-block',
      },
    },
  },
  sources: [
    typography.bodyCopy,
    {
      color: COLORS.DARK.GRAY_40,
      display: 'flex',
      flexDirection: 'column',
      paddingTop: SPACING.SIZE_02,
    },
  ],
  title: [
    typography.primaryHeadline,
    {
      color: COLORS.GLOBAL.WHITE,
    },
  ],
};

export default styles;
