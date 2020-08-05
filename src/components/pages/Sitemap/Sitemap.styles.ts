import { BORDERS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  breadcrumbs: {
    marginBottom: SPACING.SIZE_50,
    [MQ.L]: {
      marginBottom: SPACING.SIZE_60,
    },
  },
  link: {
    marginBottom: SPACING.SIZE_20,
    width: 'fit-content',
  },
  linkContainer: {
    padding: `${SPACING.SIZE_40}px 0`,
    ':not(:last-of-type)': {
      borderBottom: BORDERS.SOLID_GRAY_20_1PX,
    },
    [MQ.L]: {
      padding: `${SPACING.SIZE_50}px 0`,
    },
  },
  linkHeading: [typography.secondaryHeadline, { width: 'fit-content' }],
  linkListTitle: {
    marginBottom: SPACING.SIZE_30,
  },
  root: {
    padding: `${SPACING.SIZE_65}px 0 ${SPACING.SIZE_100}px 0`,
    [MQ.M]: {
      padding: `${SPACING.SIZE_110}px 0 ${SPACING.SIZE_100}px 0`,
    },
    [MQ.L]: {
      padding: `${SPACING.SIZE_180}px 0 ${SPACING.SIZE_80}px 0`,
    },
  },
  title: [
    typography.jumboHeadline,
    {
      marginBottom: SPACING.SIZE_20,
      [MQ.M]: {
        marginBottom: SPACING.SIZE_40,
      },
      [MQ.L]: {
        marginBottom: SPACING.SIZE_20,
      },
    },
  ],
};

export default styles;
