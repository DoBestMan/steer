import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography, typographyStyles } from '~/styles/typography.styles';

export const styles: StylesMap = {
  closeButton: {
    marginTop: SPACING.SIZE_60,
  },
  container: {
    padding: `${SPACING.SIZE_10}px 0`,
    [MQ.L]: {
      padding: 0,
    },
  },
  contentSection: {
    marginTop: SPACING.SIZE_40,
    'p:first-of-type': {
      marginTop: 0,
    },
    p: [
      typography.bodyCopy,

      {
        marginTop: SPACING.SIZE_20,
      },
    ],
  },
  eyebrow: {
    color: COLORS.GLOBAL.WHITE,
    marginTop: SPACING.SIZE_40,
  },
  specItem: {
    borderBottom: `1px solid ${COLORS.DARK.GRAY_80}`,
    display: 'inline-flex',
    flexDirection: 'column',
    gridColumn: 'span 2',
    marginTop: SPACING.SIZE_20,
    paddingBottom: SPACING.SIZE_10,
    [MQ.M]: {
      gridColumn: 'span 3',
    },
    [MQ.L]: {
      gridColumn: 'span 6',
    },
  },
  specItemLabel: {
    display: 'block',
  },
  specItemValue: {
    color: COLORS.GLOBAL.WHITE,
    display: 'block',
    marginTop: SPACING.SIZE_10,
  },
  title: [
    typography.jumboHeadline,
    {
      color: COLORS.GLOBAL.WHITE,
      marginTop: SPACING.SIZE_50,
      [MQ.L]: typographyStyles.primaryHeadline.XL,
    },
  ],
};
