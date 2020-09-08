import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

export const styles: StylesMap = {
  // To avoid any issues with extra margin at the top of a markdown component,
  // we are using a bunch of sibling selectors because first-of-type does not work
  // when we're trying to find the first of type of p, ul OR ol.
  defaultStyles: {
    ['p']: {
      ['+ p']: {
        marginTop: SPACING.SIZE_20,
      },
      ['+ ol, + ul']: {
        marginTop: SPACING.SIZE_10,
      },
    },
    ['ol, ul']: {
      paddingLeft: SPACING.SIZE_40,
      ['+ p']: {
        marginTop: SPACING.SIZE_20,
      },
      ['+ ol, + ul']: {
        marginTop: SPACING.SIZE_10,
      },
    },
    ['ol']: {
      ['li']: {
        listStyleType: 'decimal',
      },
    },
    ['ul']: {
      ['li']: {
        listStyleType: 'disc',
      },
    },
  },
  editorialMarkdownContainer: {
    ['a']: {
      borderBottomColor: COLORS.LIGHT.GRAY_70,
      borderBottom: '2px dotted',
    },
    ['h2']: [
      typography.primaryHeadline,
      {
        marginTop: SPACING.SIZE_60,
        ['+ p']: {
          marginTop: SPACING.SIZE_20,
        },
        [MQ.L]: {
          marginTop: SPACING.SIZE_80,
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
