import { CSSObject } from '@emotion/core';

import { BORDERS, COLORS, MQ, SPACING, TIME } from '~/lib/constants';
import { disableGlobalFocus } from '~/styles/document/accessibility.styles';
import { typography, typographyStyles } from '~/styles/typography.styles';

import { BRANDS } from '../CatalogPage.constants';

const styles: CSSObject = {
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
      width: 220,
    },
  ],

  dataMomentCopyNoOE: {
    width: 260,
  },

  dataMomentCtaWrapper: {
    'button:not(:last-child)': {
      marginBottom: SPACING.SIZE_10,

      [MQ.M]: {
        margin: `0 ${SPACING.SIZE_10}px 0 0`,
      },
    },

    marginBottom: SPACING.SIZE_25,
  },

  dataMomentHeading: {
    marginBottom: SPACING.SIZE_10,

    [MQ.M]: {
      marginTop: SPACING.SIZE_20,
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

  loadingContainer: {
    alignItems: 'center',
    color: COLORS.GLOBAL.WHITE,
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
  },

  [`logo_${BRANDS.BRIDGESTONE}`]: {
    height: 11,
    width: 73,

    [MQ.M]: {
      height: 13,
      width: 87,
    },
  },
  [`logo_${BRANDS.CONTINENTAL}`]: {
    height: 14,
    width: 70,

    [MQ.M]: {
      height: 17,
      width: 84,
    },
  },
  [`logo_${BRANDS.MICHELIN}`]: {
    height: 16,
    width: 80,

    [MQ.M]: {
      height: 19,
      width: 95,
    },
  },
  [`logo_${BRANDS.PIRELLI}`]: {
    height: 12,
    width: 48,

    [MQ.M]: {
      height: 14,
      width: 57,
    },
  },

  noResultsButton: [
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

  noResultsButtonWrapper: {
    '&:not(:last-child)': {
      marginBottom: SPACING.SIZE_15,
    },
  },

  noResultsHeading: {
    marginBottom: SPACING.SIZE_40,

    [MQ.M]: {
      marginBottom: SPACING.SIZE_60,
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
