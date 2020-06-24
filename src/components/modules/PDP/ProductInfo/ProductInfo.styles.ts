import { CSSObject } from '@emotion/core';

import { BORDERS, COLORS, MQ, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const CONSTANTS = {
  HEADER_MAX_WIDTH: 140,
};

const styles: CSSObject = {
  brand: {
    alignItems: 'center',
    display: 'flex',
    marginBottom: SPACING.SIZE_05,
    maxWidth: CONSTANTS.HEADER_MAX_WIDTH,
    span: typography.tertiaryHeadline,
  },
  crossSell: [
    typography.bodyCopy,
    {
      borderTop: BORDERS.SOLID_GRAY_20_1PX,
      marginTop: SPACING.SIZE_20,
      paddingTop: SPACING.SIZE_25,
      textAlign: 'center',

      [MQ.M]: {
        marginTop: SPACING.SIZE_25,
      },

      [MQ.L]: {
        marginTop: SPACING.SIZE_40,
        paddingTop: SPACING.SIZE_40,
      },
    },
  ],
  crossSellButton: {
    justifyContent: 'center',
    marginTop: SPACING.SIZE_15,
    width: '100%',

    [MQ.M]: {
      width: 'auto',
      marginTop: SPACING.SIZE_25,
    },

    [MQ.L]: {
      marginTop: SPACING.SIZE_20,
    },
  },
  loadIndex: {
    fontWeight: 'normal',
  },
  name: {
    display: 'block',
  },
  nameWrapper: {
    flex: 0.6,
  },
  priceFeature: [
    typography.primarySubhead,
    {
      color: COLORS.GLOBAL.ORANGE,
      whiteSpace: 'nowrap',
    },
  ],
  pricesWrapper: {
    flex: 0.4,
    textAlign: 'right',
    maxWidth: CONSTANTS.HEADER_MAX_WIDTH,

    [MQ.L]: {
      textAlign: 'left',
      marginTop: SPACING.SIZE_40,
    },
  },
  productName: typography.primaryHeadline,
  productNameLong: typography.secondaryHeadline,
  promoTags: {
    marginTop: SPACING.SIZE_25,

    [MQ.L]: {
      marginTop: SPACING.SIZE_20,
    },
  },
  ratingValue: [typography.smallCopyTight],
  reviews: {
    alignItems: 'center',
    display: 'flex',
  },
  sizeButton: [
    typography.primaryHeadline,
    {
      alignItems: 'center',
      display: 'flex',
    },
  ],
  sizeButtonIcon: {
    marginLeft: SPACING.SIZE_05,
  },
  sizeNoRating: {
    marginBottom: SPACING.SIZE_20,

    [MQ.L]: {
      marginBottom: 0,
    },
  },
  wrapper: {
    alignItems: 'flex-end',
    display: 'flex',
    justifyContent: 'space-between',

    [MQ.L]: {
      alignItems: 'flex-start',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
  },
};

export default styles;
