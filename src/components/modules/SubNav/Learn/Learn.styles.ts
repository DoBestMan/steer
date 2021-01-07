import { BORDERS, COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  icon: {
    marginBottom: SPACING.SIZE_20,
  },
  learnText: {
    p: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      letterSpacing: '-0.01em',
    },
  },
  link: {
    ':not(:last-of-type)': {
      marginRight: SPACING.SIZE_20,
    },
  },
  more: {
    color: COLORS.LIGHT.GRAY_70,
    marginBottom: SPACING.SIZE_10,
    marginTop: SPACING.SIZE_30,
  },
  moreLinks: {
    display: 'flex',
    marginBottom: SPACING.SIZE_60,
  },
  number: {
    color: COLORS.GLOBAL.ORANGE,
    minWidth: 60,
  },
  root: [
    typography.tertiaryHeadline,
    {
      background: COLORS.GLOBAL.WHITE,
      color: COLORS.GLOBAL.BLACK,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      [MQ.L]: [
        typography.primarySubhead,
        {
          padding: `0 ${SPACING.SIZE_60}px`,
        },
      ],
    },
  ],
  step: {
    ':not(:last-of-type)': {
      borderBottom: BORDERS.SOLID_GRAY_10_1PX,
    },
    display: 'flex',
    padding: `${SPACING.SIZE_20}px 0`,
  },
  stepList: {
    marginBottom: SPACING.SIZE_40,
  },
  support: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: SPACING.SIZE_50,
  },
  supportTitle: {
    color: COLORS.LIGHT.GRAY_70,
    marginBottom: SPACING.SIZE_20,
  },
  text: typography.bodyCopy,
  title: {
    marginBottom: SPACING.SIZE_20,
  },
};

export default styles;
