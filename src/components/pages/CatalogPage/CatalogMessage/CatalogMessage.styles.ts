import { COLORS, GAP_COLUMNS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { disableGlobalFocus } from '~/styles/document/accessibility.styles';
import { links } from '~/styles/links.styles';
import { typography, typographyStyles } from '~/styles/typography.styles';

const styles: StylesMap = {
  brandImage: {
    width: 200,
    img: {
      height: 10,
      float: 'right',
      width: 'auto',

      [MQ.M]: {
        height: 14,
      },
    },
  },
  container: {
    backgroundColor: COLORS.GLOBAL.ORANGE,
    color: COLORS.GLOBAL.WHITE,
    padding: `${SPACING.SIZE_20}px 0`,

    [MQ.M]: {
      padding: `${SPACING.SIZE_40}px 0`,
    },
  },

  containerAlignLeft: {
    alignItems: 'flex-start',
    textAlign: 'left',
  },

  containerInner: {
    alignItems: 'flex-end',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'right',
  },

  dataMomentCopy: [
    typography.smallCopyTight,
    {
      color: COLORS.ORANGE.SHADE_85,
      marginBottom: SPACING.SIZE_30,
      textAlign: 'right',

      [MQ.M]: {
        width: `calc(75% - ${GAP_COLUMNS.M / 4}px)`, // 3 of 4 columns
      },

      [MQ.L]: {
        width: `calc(66.66% - ${GAP_COLUMNS.L / 3}px`, // 4 of 6 columns
      },
    },
  ],

  dataMomentCtaWrapper: {
    '> *': {
      marginTop: SPACING.SIZE_10,
    },
    // eslint-disable-next-line sort-keys
    '> *:not(:first-of-type)': {
      marginLeft: SPACING.SIZE_10,
    },

    a: {
      width: 'fit-content',
    },
    alignItems: 'flex-end',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',

    [MQ.M]: {
      flexDirection: 'row',
    },
  },

  dataMomentHeading: {
    marginBottom: SPACING.SIZE_10,

    [MQ.M]: {
      marginBottom: SPACING.SIZE_20,
    },
  },

  dataMomentHelp: [disableGlobalFocus, typography.smallCopyTight, links.light],

  heading: [
    typography.primaryHeadline,
    {
      marginBottom: SPACING.SIZE_10,

      [MQ.M]: {
        marginBottom: SPACING.SIZE_30,
      },
    },
  ],

  list: {
    '> li': {
      ':not(:last-child)': {
        marginBottom: SPACING.SIZE_15,

        [MQ.M]: {
          marginBottom: SPACING.SIZE_20,
        },
      },
      alignItems: 'flex-end',
      display: 'flex',
      flexDirection: 'column',
    },
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },

  noResultsHeading: {
    marginBottom: SPACING.SIZE_40,

    [MQ.M]: {
      marginBottom: SPACING.SIZE_60,
    },
  },

  noResultsLink: [disableGlobalFocus, links.darkHighlighted, links.borderless],

  noResultsLinkWrapper: {
    '&:not(:last-child)': {
      marginBottom: SPACING.SIZE_10,
    },
    [MQ.XL]: {
      '&:not(:last-child)': {
        marginBottom: SPACING.SIZE_05,
      },
    },
  },

  noResultsSection: {
    '> dd': [
      typography.secondaryHeadline,
      {
        marginBottom: SPACING.SIZE_40,
        [MQ.M]: typographyStyles.primaryHeadline.M,
        [MQ.XL]: typographyStyles.primaryHeadline.XL,
      },
    ],
    '> dt': [
      typography.eyebrow,
      {
        color: COLORS.GLOBAL.BLACK,
        marginBottom: SPACING.SIZE_10,

        [MQ.M]: {
          marginBottom: SPACING.SIZE_15,
        },
      },
    ],
  },
};

export default styles;
