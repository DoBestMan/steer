import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import {
  borderBottom,
  borderBottomWithGap,
  borderTop,
  borderTopWithGapAndSpacing,
  borderTopWithSpacing,
} from '~/styles/borders.styles';
import { layout } from '~/styles/layout.styles';
import { typography } from '~/styles/typography.styles';

const CONSTANTS = {
  ICON_WIDTH: 22, // Width of the widest icon (youtube)
  LOGO_SIZE: 130,
  LOGO_SIZE_SMALL: 100,
};

const styles: StylesMap = {
  companyLinksSection: {
    order: 4,
  },

  container: {
    backgroundColor: COLORS.GLOBAL.WHITE,
  },

  copyrightSection: {
    order: 8,
    padding: `${SPACING.SIZE_50}px 0 ${SPACING.SIZE_40}px`,

    [MQ.M]: {
      padding: `${SPACING.SIZE_20}px 0 ${SPACING.SIZE_40}px`,
    },

    [MQ.XL]: [
      borderTop,
      {
        marginTop: SPACING.SIZE_60,
        padding: `${SPACING.SIZE_60}px 0`,
      },
    ],
  },

  customerSupportSection: {
    order: 5,

    [MQ.L]: {
      order: 4,
    },
  },

  linksHeading: [
    typography.secondaryHeadline,
    {
      marginBottom: SPACING.SIZE_20,

      [MQ.L]: [typography.tertiaryHeadline],
    },
  ],

  logo: {
    width: CONSTANTS.LOGO_SIZE_SMALL,

    [MQ.M]: {
      width: CONSTANTS.LOGO_SIZE,
    },
  },

  logoLink: {
    display: 'inline-flex',
  },

  logoSection: [
    borderTopWithGapAndSpacing,
    {
      alignItems: 'flex-end',
      display: 'initial',
      order: 6,
      paddingBottom: 0,
      position: 'relative',

      [MQ.XL]: {
        alignItems: 'flex-start',
        border: 'none',
        display: 'initial',
        margin: 0,
        order: 3,
        padding: 0,
      },
    },
  ],

  logoTagline: {
    bottom: -35,
    left: 0,
    position: 'absolute',
    width: 230,
    [MQ.M]: {
      width: 215,
      position: 'inherit',
      paddingTop: SPACING.SIZE_15,
    },
  },

  mailingListSection: [
    borderTop,
    borderBottom,
    {
      margin: `${SPACING.SIZE_40}px 0`,
      order: 3,
      padding: `${SPACING.SIZE_40}px 0`,
      [MQ.L]: {
        marginTop: 0,
      },
      [MQ.XL]: {
        border: 'none',
        order: 7,
        padding: 0,
      },
    },
  ],

  promotions: [
    borderBottom,
    {
      padding: `${SPACING.SIZE_20}px 0`,
      [MQ.M]: {
        padding: `${SPACING.SIZE_40}px 0`,
      },
      [MQ.L]: {
        padding: `${SPACING.SIZE_60}px 0`,
      },
    },
  ],
  simpleSnapSection: {
    order: 5,
    marginTop: SPACING.SIZE_40,
    paddingTop: SPACING.SIZE_40,
    color: COLORS.LIGHT.GRAY_70,
  },
  socialHeading: {
    display: 'none',
  },

  socialLinksSection: [
    borderTopWithSpacing,
    {
      order: 7,
      paddingBottom: 0,
      ul: {
        alignItems: 'flex-end',
        display: 'flex',
        justifyContent: 'flex-end',
        li: {
          '&.listItem:not(:last-child)': {
            marginBottom: 'unset',
          },
          display: 'flex',
          justifyContent: 'center',

          marginLeft: SPACING.SIZE_15,

          // the first span is the icon
          'span:nth-of-type(1)': {
            paddingRight: 0, // Remove padding from base footer links
            [MQ.L]: {
              width: CONSTANTS.ICON_WIDTH,
            },
          },

          // the second span is the text
          'span:nth-of-type(2)': {
            display: 'none',
            paddingTop: SPACING.SIZE_05,
          },
        },
      },

      [MQ.XL]: {
        order: 9,
        marginTop: SPACING.SIZE_60,
        padding: `${SPACING.SIZE_60}px 0`,
      },
    },
  ],

  supportButton: {
    '&:not(:last-child)': {
      marginBottom: SPACING.SIZE_20,

      [MQ.M]: {
        marginBottom: 0,
      },
    },
  },

  supportSection: [
    layout.container,
    layout.centeredHorizontal,
    {
      order: 1,
      padding: `${SPACING.SIZE_40}px 0 ${SPACING.SIZE_20}px`,

      [MQ.M]: {
        paddingBottom: SPACING.SIZE_30,
      },

      [MQ.XL]: [
        borderBottomWithGap,
        {
          marginBottom: SPACING.SIZE_60,
          padding: `${SPACING.SIZE_60}px 0`,
        },
      ],
    },
  ],

  supportSectionButtons: {
    display: 'flex',
    flexDirection: 'column',
    order: 2,

    [MQ.M]: {
      flexDirection: 'row',
    },

    [MQ.L]: [
      {
        padding: `${SPACING.SIZE_60}px 0`,
      },
    ],

    [MQ.XL]: [
      borderBottom,
      {
        marginBottom: SPACING.SIZE_60,
      },
    ],
  },

  text: [
    typography.bodyCopy,
    {
      color: COLORS.LIGHT.GRAY_70,
    },
  ],

  tiresLinksSection: {
    order: 5,
    marginTop: SPACING.SIZE_40,

    [MQ.M]: {
      marginTop: 0,
    },
    [MQ.L]: {
      order: 4,
    },
  },
};

export default styles;
