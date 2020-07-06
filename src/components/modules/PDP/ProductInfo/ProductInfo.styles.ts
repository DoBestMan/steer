import { CSSObject } from '@emotion/core';

import { BORDERS, MQ, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const CONSTANTS = {
  HEADER_MAX_WIDTH: 140,
};

const styles: CSSObject = {
  crossSellWrapper: [
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
  loadIndex: {
    fontWeight: 'normal',
  },
  name: {
    display: 'block',
  },
  nameWrapper: {
    [MQ.L]: {
      flex: 0.6,
    },
  },
  pricesWrapper: {
    textAlign: 'right',
    maxWidth: CONSTANTS.HEADER_MAX_WIDTH,

    [MQ.L]: {
      textAlign: 'left',
      marginTop: SPACING.SIZE_40,
    },
  },
  promoTags: {
    marginTop: SPACING.SIZE_25,

    [MQ.L]: {
      marginTop: SPACING.SIZE_20,
    },
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
