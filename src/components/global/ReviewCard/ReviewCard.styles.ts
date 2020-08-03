import { COLORS, MQ, RADIUS, SPACING, StylesMap, THEME } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const CONSTANTS = {
  CONTENT_MAX_WIDTH_M: 480,
  CONTENT_MAX_WIDTH_XL: 605,
  DATE_MIN_WIDTH: 80,
  SEPARATOR: '"•"',
  SEPARATOR_EMPTY: '""',
  SEPARATOR_SIZE: 8,
};

const styles: StylesMap = {
  additionalContentContainer: {
    ul: {
      paddingTop: SPACING.SIZE_20,
      paddingBottom: 0, // Override default padding from component
    },
  },
  body: [
    typography.bodyCopy,
    {
      marginTop: SPACING.SIZE_15,
    },
  ],
  container: {
    ':not(:last-of-type)': {
      marginBottom: SPACING.SIZE_20,
    },
    borderRadius: RADIUS.RADIUS_15,
    padding: `${SPACING.SIZE_30}px ${SPACING.SIZE_25}px`,
    [MQ.M]: {
      padding: SPACING.SIZE_30,
    },
    [MQ.L]: {
      padding: `${SPACING.SIZE_30}px ${SPACING.SIZE_25}px`,
    },
    [MQ.XL]: {
      padding: SPACING.SIZE_40,
    },
  },
  content: {
    [MQ.M]: {
      maxWidth: CONSTANTS.CONTENT_MAX_WIDTH_M,
    },
    [MQ.L]: {
      maxWidth: CONSTANTS.CONTENT_MAX_WIDTH_XL,
    },
  },
  customerInfo: [
    typography.smallCopyTight,
    {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      [MQ.M]: {
        flexDirection: 'row',
      },
      // eslint-disable-next-line sort-keys
      '> span:not(:last-child)': {
        ':after': {
          alignItems: 'center',
          content: CONSTANTS.SEPARATOR_EMPTY,
          display: 'inline-flex',
          fontSize: CONSTANTS.SEPARATOR_SIZE,
          paddingLeft: SPACING.SIZE_05,
          paddingRight: SPACING.SIZE_05,
          [MQ.M]: {
            content: CONSTANTS.SEPARATOR,
          },
        },
      },
    },
  ],

  date: [
    typography.smallCopyTight,
    {
      alignSelf: 'flex-start',
      minWidth: CONSTANTS.DATE_MIN_WIDTH,
      textAlign: 'right',
    },
  ],
  ratingTopContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '> div': {
      marginRight: 0,
    },
  },
  readMore: {
    fontWeight: 'bold',
    marginTop: SPACING.SIZE_20,
  },
  title: [
    typography.primarySubhead,
    {
      marginBottom: SPACING.SIZE_05,
    },
  ],
  verifiedCustomer: {
    alignItems: 'center',
    display: 'flex',
  },
  verifiedCustomerIcon: {
    marginLeft: SPACING.SIZE_05,
  },
};

export const themeStyles = {
  [THEME.LIGHT]: {
    container: {
      backgroundColor: COLORS.LIGHT.GRAY_10,
      color: COLORS.LIGHT.GRAY_70,
    },
    readMore: {
      color: COLORS.LIGHT.GRAY_70,
    },
    title: {
      color: COLORS.GLOBAL.BLACK,
    },
  },

  [THEME.DARK]: {
    container: {
      backgroundColor: COLORS.DARK.GRAY_95,
      color: COLORS.DARK.GRAY_40,
    },
    readMore: {
      color: 'inherit',
    },
    title: {
      color: COLORS.GLOBAL.WHITE,
    },
  },
};

export default styles;
