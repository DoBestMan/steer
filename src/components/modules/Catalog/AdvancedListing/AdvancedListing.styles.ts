import { CSSObject } from '@emotion/core';

import { BORDERS, COLORS, MQ, RADIUS, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

import { IMAGE_SIZES } from './AdvancedListing.constants';

const WRAPPER_HEIGHT = {
  S: 195,
  M: 215,
  XL: 260,
};

const styles: CSSObject = {
  bottomSection: {
    alignItems: 'flex-end',
    display: 'flex',
    width: '100%',
    [MQ.XL]: { width: '50%' },
  },
  bottomSectionTop: {
    alignItems: 'flex-start',
  },
  brand: {
    height: 20,
    img: {
      height: '100%',
      width: 'auto',
    },
    marginBottom: SPACING.SIZE_10,
    width: '100%',

    [MQ.M]: {
      marginBottom: SPACING.SIZE_15,
    },

    [MQ.XL]: {
      marginBottom: SPACING.SIZE_20,
      maxWidth: 130,
    },
  },
  imageContainer: {
    width: IMAGE_SIZES[0].width,
    [MQ.M]: {
      width: IMAGE_SIZES[1].width,
    },
    [MQ.XL]: {
      width: IMAGE_SIZES[2].width,
    },
  },
  imageWrapper: {
    alignItems: 'flex-end',
    backgroundColor: COLORS.LIGHT.GRAY_10,
    borderRadius: RADIUS.RADIUS_10,
    display: 'flex',
    height: WRAPPER_HEIGHT.S,
    justifyContent: 'center',
    minHeight: '100%',
    position: 'relative',

    [MQ.M]: {
      height: WRAPPER_HEIGHT.M,
    },
    [MQ.XL]: {
      height: WRAPPER_HEIGHT.XL,
    },
  },
  info: {
    padding: `${SPACING.SIZE_25}px 0 0`,
    [MQ.M]: {
      borderBottom: BORDERS.SOLID_GRAY_20_1PX,
      padding: `${SPACING.SIZE_15}px 0 ${SPACING.SIZE_20}px 0`,
    },
    [MQ.XL]: { padding: `${SPACING.SIZE_20}px 0 ${SPACING.SIZE_30}px 0` },
  },
  leftSection: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  linkIcon: {
    display: 'inline-flex',
    height: 9,
    marginLeft: 5,
    position: 'relative',
    top: 1,
    width: 5,
  },
  linkText: {
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
      color: COLORS.LIGHT.GRAY_70,
      display: 'flex',
      margin: `${SPACING.SIZE_01}px 0 ${SPACING.SIZE_05}px`,
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
  pricesContainer: {
    marginBottom: SPACING.SIZE_05,
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
      color: COLORS.LIGHT.GRAY_70,
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
    typography.secondarySubhead,
    {
      color: COLORS.GLOBAL.BLACK,
      [MQ.L]: typography.primarySubhead,
    },
  ],
};

export default styles;
