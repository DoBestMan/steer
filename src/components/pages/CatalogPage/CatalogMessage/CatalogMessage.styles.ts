import { CSSObject } from '@emotion/core';

import { MQ, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

import { BRANDS } from '../CatalogPage.constants';

const styles: CSSObject = {
  container: {
    padding: `${SPACING.SIZE_20}px 0`,
    textAlign: 'right',

    [MQ.M]: {
      padding: `${SPACING.SIZE_40}px 0`,
    },
  },

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
};

export default styles;
