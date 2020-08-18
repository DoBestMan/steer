import { MQ, RADIUS, SPACING, StylesMap } from '~/lib/constants';

export const styles: StylesMap = {
  imageSectionLarge: {
    display: 'none',
    [MQ.L]: {
      display: 'block',
    },
  },
  imageSectionSmall: {
    [MQ.L]: {
      display: 'none',
    },
  },
  linkSection: {
    marginTop: SPACING.SIZE_20,
    ['h2']: {
      marginTop: SPACING.SIZE_20,
    },
  },
  promotionSection: {
    display: 'flex',
    ['div[data-component="promotion-card"]']: {
      ['&:nth-of-type(even)']: {
        marginRight: 0,
      },
      [MQ.M]: {
        borderRadius: RADIUS.RADIUS_15,
        margin: `0 ${SPACING.SIZE_20}px ${SPACING.SIZE_20}px 0`,
        overflow: 'hidden',
        width: '48%',
      },
      [MQ.L]: {
        margin: `0 ${SPACING.SIZE_15}px ${SPACING.SIZE_20}px 0`,
        width: '49%',
      },
    },
    ['div[data-component="promotion-card"] ~ div[data-component="promotion-card"]']: {
      display: 'none',
      [MQ.M]: {
        display: 'block',
      },
    },
    ['div[data-component="promotion-card-body"]']: {
      height: '100%',
    },
    flexWrap: 'wrap',
  },
  reviewLinkContainer: {
    display: 'flex',
  },
  spacingBottom60: {
    marginBottom: SPACING.SIZE_60,
  },
  spacingTop20: {
    marginTop: SPACING.SIZE_20,
  },
};
