import { BORDERS, COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  container: {
    paddingTop: SPACING.SIZE_70,
    [MQ.M]: {
      padding: `${SPACING.SIZE_110}px ${SPACING.SIZE_20}px 0`,
    },
    [MQ.L]: {
      padding: `${SPACING.SIZE_80}px 0 0`,
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
    margin: `0 ${-SPACING.SIZE_20}px ${SPACING.SIZE_40}px`,
    [MQ.M]: {
      margin: `0 ${-SPACING.SIZE_40}px ${SPACING.SIZE_60}px`,
    },
    [MQ.L]: {
      margin: `0 ${-SPACING.SIZE_60}px ${SPACING.SIZE_60}px`,
    },
  },
  link: [
    typography.primarySubhead,
    {
      color: COLORS.LIGHT.GRAY_70,
    },
  ],
  liveChatSupport: {
    marginTop: SPACING.SIZE_20,
    marginBottom: SPACING.SIZE_20,
  },
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
