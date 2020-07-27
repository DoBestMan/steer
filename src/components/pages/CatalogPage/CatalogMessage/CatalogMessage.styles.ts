import {
  BORDERS,
  COLORS,
  GAP_COLUMNS,
  MQ,
  SPACING,
  StylesMap,
  TIME,
} from '~/lib/constants';
import { disableGlobalFocus } from '~/styles/document/accessibility.styles';
import { typography, typographyStyles } from '~/styles/typography.styles';

const styles: StylesMap = {
  brandImage: {
    width: 100,
    img: {
      height: 20,
      float: 'right',
      width: 'auto',
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
      marginBottom: SPACING.SIZE_40,
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
    '> *:not(:last-child)': {
      marginBottom: SPACING.SIZE_10,

      [MQ.M]: {
        marginBottom: 0,
      },
    },

    '> *:not(:first-of-type)': {
      marginLeft: SPACING.SIZE_10,
    },

    marginBottom: SPACING.SIZE_25,
  },

  dataMomentHeading: {
    marginBottom: SPACING.SIZE_10,

    [MQ.M]: {
      marginBottom: SPACING.SIZE_20,
    },
  },

  dataMomentHelp: [
    disableGlobalFocus,
    typography.smallCopyTight,
    {
      '&:active': {
        borderColor: COLORS.ORANGE.SHADE_30,
        color: COLORS.ORANGE.SHADE_30,
      },
      '&:hover:not(:active), &:focus:not(:active)': {
        borderColor: COLORS.ORANGE.SHADE_85,
      },
      borderBottom: BORDERS.DOTTED_TRANSPARENT_2PX,
      color: COLORS.ORANGE.SHADE_85,
      transition: `border-color ${TIME.MS100}ms ease, color ${TIME.MS100}ms ease`,
    },
  ],

  heading: [
    typography.primaryHeadline,
    {
      marginBottom: SPACING.SIZE_20,

      [MQ.M]: {
        marginBottom: SPACING.SIZE_40,
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

  noResultsLink: [
    disableGlobalFocus,
    {
      '&:active': {
        borderColor: COLORS.ORANGE.TINT_70,
        color: COLORS.ORANGE.TINT_70,
      },
      '&:hover:not(:active), &:focus:not(:active)': {
        borderColor: COLORS.GLOBAL.WHITE,
      },
      borderBottom: BORDERS.DOTTED_TRANSPARENT_2PX,
      transition: `border-color ${TIME.MS100}ms ease, color ${TIME.MS100}ms ease`,
    },
  ],

  noResultsLinkWrapper: {
    '&:not(:last-child)': {
      marginBottom: SPACING.SIZE_15,
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
          marginBottom: SPACING.SIZE_20,
        },
      },
    ],
  },
};

export default styles;
