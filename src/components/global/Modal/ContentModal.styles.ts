import { BORDERS, COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  container: {
    paddingTop: SPACING.SIZE_70,
    [MQ.M]: {
      paddingTop: SPACING.SIZE_110,
    },
    [MQ.L]: {
      paddingTop: SPACING.SIZE_90,
    },
  },
  contentContainer: {
    color: COLORS.LIGHT.GRAY_70,

    p: [
      typography.bodyCopy,
      {
        marginBottom: 22, // bodyCopy's line height
      },
    ],

    ul: {
      marginBottom: SPACING.SIZE_40,
      paddingLeft: '1.75rem',

      [MQ.M]: {
        marginBottom: SPACING.SIZE_60,
      },
    },
    li: [
      typography.primarySubhead,
      {
        listStyle: 'initial',
        marginBottom: 15, // bodyCopy's font size
      },
    ],
  },

  imageContainer: {
    marginBottom: SPACING.SIZE_40,
    marginLeft: -SPACING.SIZE_20,
    marginRight: -SPACING.SIZE_20,

    [MQ.M]: {
      marginBottom: SPACING.SIZE_60,
    },
    [MQ.L]: {
      marginLeft: -SPACING.SIZE_60,
      marginRight: -SPACING.SIZE_60,
    },
  },
  link: [
    typography.primarySubhead,
    {
      color: COLORS.LIGHT.GRAY_70,
    },
  ],
  noSubtitle: {
    marginBottom: SPACING.SIZE_40,
    [MQ.M]: {
      marginBottom: SPACING.SIZE_60,
    },
  },
  phoneSupport: {
    marginBottom: SPACING.SIZE_20,
  },
  subtitle: [
    typography.largeCopy,
    {
      marginBottom: SPACING.SIZE_40,
      [MQ.M]: {
        marginBottom: SPACING.SIZE_60,
      },
    },
  ],
  supportContainer: {
    borderTop: BORDERS.SOLID_GRAY_20_1PX,
    marginTop: SPACING.SIZE_50,
    paddingTop: SPACING.SIZE_60,

    [MQ.M]: {
      marginTop: SPACING.SIZE_60,
    },
  },
  supportHeading: [
    typography.tertiaryHeadline,
    {
      marginBottom: SPACING.SIZE_20,
    },
  ],
  title: [
    typography.modalHeadline,
    {
      marginBottom: SPACING.SIZE_10,
      [MQ.M]: {
        marginBottom: SPACING.SIZE_20,
      },
    },
  ],
};

export default styles;
