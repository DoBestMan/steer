import { CSSObject } from '@emotion/core';

import { BORDERS, COLORS, MQ, RADIUS, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: CSSObject = {
  bottomSection: {
    alignItems: 'flex-end',
    display: 'flex',
    width: '100%',
    [MQ.XL]: { width: '50%' },
  },
  brand: {
    maxWidth: 90,
    marginBottom: SPACING.SIZE_05,
    [MQ.XL]: {
      marginBottom: SPACING.SIZE_20,
      maxWidth: 130,
    },
  },
  imageWrapper: {
    alignItems: 'flex-end',
    backgroundColor: COLORS.LIGHT.GRAY_10,
    borderRadius: RADIUS.RADIUS_10,
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    position: 'relative',
  },
  info: {
    borderBottom: BORDERS.SOLID_GRAY_20_1PX,
    padding: `${SPACING.SIZE_20}px 0`,
    [MQ.M]: { padding: `0 0 ${SPACING.SIZE_20}px 0` },
    [MQ.XL]: { padding: `0 0 ${SPACING.SIZE_30}px 0` },
  },
  leftSection: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  linkIcon: {
    marginLeft: 5,
    width: 5,
    height: 9,
  },
  linkText: {
    alignItems: 'center',
    display: 'flex',
    '&::after': {
      content: '""',
      height: '100%',
      left: 0,
      position: 'absolute',
      top: 0,
      width: '100%',
    },
  },
  moment: [
    typography.secondarySubhead,
    {
      alignItems: 'center',
      color: COLORS.LIGHT.GRAY_70,
      display: 'flex',
      marginBottom: SPACING.SIZE_02,
      [MQ.XL]: { lineHeight: '20px' },
    },
  ],
  momentIcon: {
    width: 12,
    height: 12,
    marginRight: SPACING.SIZE_05,
  },
  momentList: {
    marginTop: SPACING.SIZE_20,
    [MQ.XL]: { marginTop: SPACING.SIZE_30 },
  },
  momentPromo: {
    color: COLORS.GLOBAL.ORANGE,
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
  },
  ratingBars: {
    width: '100%',
  },
  ratingBarsSection: {
    display: 'none',
    [MQ.XL]: {
      display: 'flex',
    },
  },
  ratingQuantity: {
    [MQ.XL]: { display: 'none' },
  },
  ratingValue: [
    typography.smallCopy,
    {
      whiteSpace: 'nowrap',
      [MQ.XL]: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.GLOBAL.ORANGE,
      },
    },
  ],
  reviews: {
    alignItems: 'flex-end',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: SPACING.SIZE_20,
    width: '100%',
  },
  reviewsCount: [
    typography.smallCopy,
    {
      display: 'none',
      [MQ.XL]: {
        display: 'block',
      },
    },
  ],
  rightSection: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  root: {
    position: 'relative',

    '&:hover > div': {
      borderColor: COLORS.GLOBAL.ORANGE,
    },
  },
  specList: {
    textAlign: 'right',
    width: '100%',
    [MQ.XL]: {
      textAlign: 'left',
    },
  },
  sticker: {
    left: -SPACING.SIZE_05,
    position: 'absolute',
    top: -SPACING.SIZE_15,

    [MQ.M]: {
      left: -SPACING.SIZE_10,
      top: -SPACING.SIZE_15,
    },
    [MQ.XL]: {
      left: -SPACING.SIZE_20,
      top: -SPACING.SIZE_20,
    },
  },
  title: [
    typography.primarySubhead,
    {
      color: COLORS.LIGHT.GRAY_70,
    },
  ],
};

export default styles;
