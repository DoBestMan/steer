import { BORDERS, COLORS, MQ, SPACING, StylesMap, TIME } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

export const styles: StylesMap = {
  button: {
    marginTop: SPACING.SIZE_40,

    [MQ.L]: {
      marginTop: SPACING.SIZE_60,
    },
  },
  content: {
    marginBottom: SPACING.SIZE_50,

    [MQ.M]: {
      marginBottom: 145,
    },
    [MQ.L]: {
      marginBottom: 225,
    },
  },
  copy: [
    typography.bodyCopy,
    {
      color: COLORS.LIGHT.GRAY_70,
      marginTop: SPACING.SIZE_10,

      [MQ.M]: {
        marginTop: SPACING.SIZE_15,
      },

      a: {
        borderBottom: BORDERS.DOTTED_TRANSPARENT_2PX,
        transition: `border-color ${TIME.MS100} ease`,

        '&:hover': {
          borderColor: 'inherit',
        },
      },
    },
  ],
  description: [typography.primaryHeadline, {}],
  header: {
    textAlign: 'center',
  },
  title: [
    typography.jumboHeadline,
    {
      color: COLORS.GLOBAL.ORANGE,
      fontSize: `${75 / 10}rem`,
      marginBottom: SPACING.SIZE_10,
      marginTop: SPACING.SIZE_35,

      [MQ.M]: {
        marginTop: SPACING.SIZE_60,
        fontSize: `${150 / 10}rem`,
      },
      [MQ.L]: {
        marginBottom: SPACING.SIZE_15,
        marginTop: SPACING.SIZE_120,
      },
    },
  ],
};
