import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

export const styles: StylesMap = {
  // To avoid any issues with extra margin at the top of a markdown component,
  // we are using a bunch of sibling selectors because first-of-type does not work
  // when we're trying to find the first of type of p, ul OR ol.
  defaultStyles: {
    ['.indented']: {
      paddingLeft: SPACING.SIZE_20,
    },
    ['blockquote']: {
      border: `1px solid ${COLORS.LIGHT.GRAY_20}`,
      borderLeft: 'none',
      borderRight: 'none',
      margin: `${SPACING.SIZE_20}px 0`,
      ['p']: [
        typography.largeCopy,
        {
          color: COLORS.GLOBAL.BLACK,
        },
      ],
      padding: SPACING.SIZE_20,
      textAlign: 'center',
    },
    ['ol']: {
      ['li']: {
        listStyleType: 'decimal',
      },
    },
    ['ol > li']: {
      listStyleType: 'decimal',
    },
    ['ol, ul']: {
      ['+ ol, + ul']: {
        marginTop: SPACING.SIZE_20,
      },
      ['+ p']: {
        marginTop: SPACING.SIZE_20,
      },
      ['li']: {
        ['&::marker']: [
          typography.primarySubhead,
          {
            paddingRight: SPACING.SIZE_40,
            color: COLORS.GLOBAL.BLACK,
          },
        ],
        paddingLeft: SPACING.SIZE_20,
      },
      ['ol']: {
        paddingLeft: SPACING.SIZE_25,
      },
      paddingLeft: SPACING.SIZE_60,
      ['ul']: {
        paddingLeft: SPACING.SIZE_20,
      },
    },
    ['p']: {
      ['+ p']: {
        marginTop: SPACING.SIZE_20,
      },
      ['+ ol, + ul']: {
        marginTop: SPACING.SIZE_20,
      },
    },
    ['ul > li']: {
      listStyleType: 'disc',
    },
  },
  editorialMarkdownContainer: {
    ['a']: {
      borderBottom: `2px dotted ${COLORS.GLOBAL.ORANGE}`,
    },
    ['h2']: [
      typography.primaryHeadline,
      {
        marginTop: SPACING.SIZE_60,
        ['+ p']: {
          marginTop: SPACING.SIZE_20,
        },
      },
    ],
    ['h3']: [
      typography.secondaryHeadline,
      {
        marginTop: SPACING.SIZE_40,
        [MQ.L]: {
          marginTop: SPACING.SIZE_60,
        },
      },
    ],
    ['h4']: [
      typography.eyebrow,
      {
        marginTop: SPACING.SIZE_40,
        [MQ.L]: {
          marginTop: SPACING.SIZE_60,
        },
      },
    ],
    ['hr']: {
      borderColor: COLORS.LIGHT.GRAY_20,
      marginTop: SPACING.SIZE_60,
      [MQ.L]: {
        marginTop: SPACING.SIZE_80,
      },
    },
    ['ol']: {
      ['li']: [
        typography.bodyCopy,
        {
          color: COLORS.LIGHT.GRAY_70,
          marginTop: SPACING.SIZE_10,
        },
      ],
    },
    ['p']: [
      typography.bodyCopy,
      {
        color: COLORS.LIGHT.GRAY_70,
      },
    ],
    ['ul']: {
      ['li']: [
        typography.bodyCopy,
        {
          color: COLORS.LIGHT.GRAY_70,
          marginTop: SPACING.SIZE_10,
        },
      ],
    },
  },
};
