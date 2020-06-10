import { CSSObject } from '@emotion/core';

import { COLORS, MQ, RADIUS, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const CONSTANTS = {
  DATE_MIN_WIDTH: 80,
  SEPARATOR: '"•"',
  SEPARATOR_EMPTY: '""',
  SEPARATOR_SIZE: 8,
};

const styles: CSSObject = {
  additionalContentContainer: {
    ul: {
      paddingTop: SPACING.SIZE_30,
      paddingBottom: 0, // Override default padding from component
    },
  },
  body: [
    typography.bodyCopy,
    {
      marginTop: SPACING.SIZE_15,
    },
  ],
  container: {
    ':not(:last-of-type)': {
      marginBottom: SPACING.SIZE_20,
    },
    backgroundColor: COLORS.DARK.GRAY_90,
    borderRadius: RADIUS.RADIUS_15,
    color: COLORS.DARK.GRAY_40,
    padding: `${SPACING.SIZE_30}px ${SPACING.SIZE_25}px`,
    [MQ.M]: {
      padding: SPACING.SIZE_30,
    },
    [MQ.L]: {
      padding: `${SPACING.SIZE_30}px ${SPACING.SIZE_25}px`,
    },
    [MQ.XL]: {
      padding: `${SPACING.SIZE_30}px ${SPACING.SIZE_40}px`,
    },
  },
  customerInfo: [
    typography.smallCopyTight,
    {
      '> span:not(:last-child)': {
        display: 'block',
        [MQ.M]: {
          display: 'inline-flex',
        },
        // eslint-disable-next-line sort-keys
        ':after': {
          alignItems: 'center',
          content: CONSTANTS.SEPARATOR_EMPTY,
          display: 'inline-flex',
          fontSize: CONSTANTS.SEPARATOR_SIZE,
          paddingLeft: SPACING.SIZE_05,
          paddingRight: SPACING.SIZE_05,
          [MQ.M]: {
            content: CONSTANTS.SEPARATOR,
          },
        },
      },
    },
  ],
  date: [
    typography.smallCopyTight,
    {
      alignSelf: 'flex-start',
      minWidth: CONSTANTS.DATE_MIN_WIDTH,
      textAlign: 'right',
    },
  ],
  ratingTopContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '> div': {
      marginRight: 0,
    },
  },
  readMore: {
    marginTop: SPACING.SIZE_05,
  },
  title: [
    typography.primarySubhead,
    {
      color: COLORS.GLOBAL.WHITE,
      marginBottom: SPACING.SIZE_02,
    },
  ],
  verifiedCustomer: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  verifiedCustomerIcon: {
    alignItems: 'center',
    marginLeft: SPACING.SIZE_05,
  },
};
export default styles;
