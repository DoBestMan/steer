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
    [MQ.L]: {
      order: 3,
    },
  },

  container: {
    backgroundColor: COLORS.GLOBAL.WHITE,
  },

  copyrightSection: {
    order: 8,
    padding: `${SPACING.SIZE_20}px 0 ${SPACING.SIZE_40}px`,

    [MQ.XL]: [
      borderTop,
      {
        marginTop: SPACING.SIZE_60,
        padding: `${SPACING.SIZE_60}px 0`,
      },
    ],
  },

  featuredInfoModule: {
    '&:not(:last-of-type)': {
      '&::after': {
        backgroundColor: COLORS.LIGHT.GRAY_20,
        content: '""',
        height: '100%',
        position: 'absolute',
        right: -10,
        top: 0,
        width: 1,
      },
    },
    padding: `${SPACING.SIZE_20}px 0`,
    position: 'relative',
    [MQ.M]: {
      '&:not(:last-of-type)': {
        '&::after': {
          content: 'none',
        },
      },
      padding: 0,
    },
  },

  featuredInfoTitle: [
    typography.primarySubhead,
    {
      [MQ.M]: typography.primarySubhead,
      [MQ.XL]: typography.primarySubhead,
    },
  ],

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
      order: 6,
      paddingBottom: 0,

      [MQ.XL]: {
        border: 'none',
        margin: 0,
        order: 3,
        padding: 0,
      },
    },
  ],

  mailingListSection: [
    borderTop,
    borderBottom,
    {
      margin: `${SPACING.SIZE_40}px 0`,
      order: 3,
      padding: `${SPACING.SIZE_40}px 0`,

      [MQ.L]: {
        border: 'none',
        margin: 0,
        order: 5,
        padding: 0,
      },

      [MQ.XL]: {
        order: 7,
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

  socialHeading: {
    display: 'none',

    [MQ.XL]: {
      display: 'block',
      marginBottom: SPACING.SIZE_15,
    },
  },

  socialLinksSection: [
    borderTopWithSpacing,
    {
      order: 7,
      paddingBottom: 0,
      ul: {
        li: {
          '&:not(:last-child)': {
            marginBottom: SPACING.SIZE_15,
          },

          display: 'inline',
          marginLeft: SPACING.SIZE_15,

          // the first span is the icon
          'span:nth-of-type(1)': {
            paddingRight: 0, // Remove padding from base footer links
            [MQ.L]: {
              display: 'flex',
              justifyContent: 'center',
              width: CONSTANTS.ICON_WIDTH,
            },
            [MQ.XL]: {
              marginRight: SPACING.SIZE_15,
            },
          },

          // the second span is the text
          'span:nth-of-type(2)': {
            display: 'none',
            paddingTop: SPACING.SIZE_05,

            [MQ.XL]: {
              display: 'block',
            },
          },

          [MQ.XL]: {
            display: 'block',
            marginLeft: 0,
          },
        },

        textAlign: 'right',

        [MQ.XL]: {
          textAlign: 'left',
        },
      },

      [MQ.XL]: {
        border: 'none',
        margin: 0,
        padding: 0,
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

      [MQ.L]: [
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
      borderBottom,
      {
        marginBottom: SPACING.SIZE_60,
        padding: `${SPACING.SIZE_60}px 0`,
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

    [MQ.L]: {
      order: 4,
    },
  },
};

export default styles;
