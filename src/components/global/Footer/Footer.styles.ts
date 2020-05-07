import { css } from '@emotion/core';

import { COLORS, MQ, SPACING } from '~/lib/constants';
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

const styles = {
  companyLinksSection: css({
    order: 4,
    [MQ.L]: {
      order: 3,
    },
  }),

  container: css({
    padding: `${SPACING.SIZE_40}px 0`,

    [MQ.XL]: {
      padding: `${SPACING.SIZE_60}px 0`,
    },
  }),

  copyrightSection: css({
    order: 8,
    paddingTop: SPACING.SIZE_20,

    [MQ.XL]: [
      borderTop,
      {
        marginTop: SPACING.SIZE_60,
        paddingTop: SPACING.SIZE_60,
      },
    ],
  }),

  linksHeading: [
    typography.secondaryHeadline,
    css({
      marginBottom: SPACING.SIZE_20,

      [MQ.L]: [typography.tertiaryHeadline],
    }),
  ],

  logo: {
    width: CONSTANTS.LOGO_SIZE_SMALL,

    [MQ.M]: {
      width: CONSTANTS.LOGO_SIZE,
    },
  },

  logoSection: [
    borderTopWithGapAndSpacing,
    css({
      order: 6,
      paddingBottom: 0,

      [MQ.XL]: {
        border: 'none',
        margin: 0,
        order: 3,
        padding: 0,
      },
    }),
  ],

  mailingListSection: [
    borderTop,
    borderBottom,
    css({
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
    }),
  ],

  socialHeading: css({
    display: 'none',

    [MQ.XL]: {
      display: 'block',
    },
  }),

  socialLinksSection: [
    borderTopWithSpacing,
    css({
      order: 7,
      paddingBottom: 0,
      ul: css({
        li: {
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
      }),

      [MQ.XL]: {
        border: 'none',
        margin: 0,
        padding: 0,
      },
    }),
  ],

  supportButton: css({
    '&:not(:last-child)': {
      marginBottom: SPACING.SIZE_20,

      [MQ.M]: {
        marginBottom: 0,
      },
    },
  }),

  supportSection: [
    layout.container,
    layout.centeredHorizontal,
    css({
      order: 1,
      paddingBottom: SPACING.SIZE_20,

      [MQ.M]: {
        paddingBottom: SPACING.SIZE_30,
      },

      [MQ.L]: [
        borderBottomWithGap,
        {
          marginBottom: SPACING.SIZE_60,
          paddingBottom: SPACING.SIZE_60,
        },
      ],
    }),
  ],

  supportSectionButtons: css({
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
        paddingBottom: SPACING.SIZE_60,
      },
    ],
  }),

  text: [
    typography.bodyCopy,
    css({
      color: COLORS.LIGHT.GRAY_70,
    }),
  ],

  tiresLinksSection: css({
    order: 5,

    [MQ.L]: {
      order: 4,
    },
  }),
};

export default styles;
