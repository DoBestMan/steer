import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

export const styles: StylesMap = {
  defaultStyles: {
    ['ol']: {
      marginTop: SPACING.SIZE_20,
      paddingLeft: SPACING.SIZE_40,
      ['li']: {
        listStyleType: 'decimal',
      },
    },
    ['ul']: {
      marginTop: SPACING.SIZE_20,
      paddingLeft: SPACING.SIZE_40,
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
        marginTop: SPACING.SIZE_20,
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
