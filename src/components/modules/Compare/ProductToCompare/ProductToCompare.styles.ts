import { keyframes } from '@emotion/core';

import {
  COLORS,
  MQ,
  PRODUCT,
  SPACING,
  StylesMap,
  TIME,
  Z_INDEX,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const IMAGE_SIZE = {
  S: 90,
  B: 120,
};

export const removingProduct = keyframes({
  '0%': {
    opacity: 1,
  },
  '100%': {
    opacity: 0,
  },
});

const styles: StylesMap = {
  addButton: [
    typography.secondarySubhead,
    {
      fontSize: '12px',
      paddingLeft: SPACING.SIZE_20,
      paddingRight: SPACING.SIZE_20,
      width: 'max-content',
    },
  ],
  bigImage: {
    height: IMAGE_SIZE.B,
    width: IMAGE_SIZE.B,
  },
  blackButton: {
    background: COLORS.GLOBAL.BLACK,
    opacity: '0.3',
  },
  brand: {
    marginBottom: SPACING.SIZE_05,
    '& span img': {
      maxWidth: SPACING.SIZE_110,
    },
  },
  brandContainer: {
    maxWidth: 122,
    maxHeight: 15,
    img: {
      height: 15,
      width: 'auto',
      maxWidth: 12,
    },
  },
  brandLabel: [
    typography.largeCopy,
    {
      color: COLORS.GLOBAL.WHITE,
      display: 'block',
      fontWeight: 'bold',
      lineHeight: `${PRODUCT.BRAND_IMAGE_HEIGHT}px`,

      [MQ.XL]: {
        fontSize: `${22 / 10}rem`,
      },
    },
  ],
  buttonAddToCart: {
    marginBottom: SPACING.SIZE_10,
    marginTop: SPACING.SIZE_15,
    width: '100%',
    justifyContent: 'center',
  },
  buttonLearnMore: {
    marginBottom: SPACING.SIZE_20,
  },
  closeButton: {
    '&:active': {
      opacity: 0.45,
    },
    '&:focus:not(:active)': {
      opacity: 0.45,
    },
    '&:hover:not(:active)': {
      opacity: 0.45,
    },
    alignItems: 'center',
    background: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '50%',
    color: COLORS.GLOBAL.WHITE,
    cursor: 'pointer',
    display: 'flex',
    height: SPACING.SIZE_30,
    justifyContent: 'center',
    position: 'absolute',
    right: SPACING.SIZE_10,
    top: SPACING.SIZE_02,
    width: SPACING.SIZE_30,
    zIndex: Z_INDEX.FRONT,
  },
  image: {
    backgroundBlendMode: 'darken',
    height: IMAGE_SIZE.S,
    marginBottom: SPACING.SIZE_25,
    mixBlendBode: 'multiply',
    opacity: 0.9,
    position: 'relative',
    width: IMAGE_SIZE.S,
    [MQ.M]: {
      marginBottom: SPACING.SIZE_30,
    },
  },
  info: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
  isRemoving: {
    animation: `${removingProduct} ${TIME.MS750}ms linear forwards`,
  },
  name: {
    color: COLORS.LIGHT.GRAY_70,
  },
  root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'relative',
    width: '100%',
  },
  shadow: {
    bottom: -SPACING.SIZE_20,
    left: 0,
    opacity: 1,
    pointerEvents: 'none',
    position: 'absolute',
    width: '100%',
    zIndex: Z_INDEX.BEHIND,
  },
  subcopy: [
    typography.smallCopyTight,
    {
      color: COLORS.GLOBAL.WHITE,
      height: SPACING.SIZE_30,
      marginBottom: SPACING.SIZE_02,
      marginTop: SPACING.SIZE_02,
      width: IMAGE_SIZE.S,
    },
  ],
  subHead: [
    typography.secondarySubhead,
    {
      whiteSpace: 'nowrap',
    },
  ],
  tireSkeleton: {
    '& > span': {
      display: 'inline-block',
      height: '100%',
      width: '100%',
    },
    '& svg': {
      height: '100%',
      width: '100%',
      background: COLORS.GLOBAL.ORANGE,
    },
  },
  tireSkeletonBg: {
    '& svg': {
      background: COLORS.GLOBAL.WHITE,
    },
  },
};

export default styles;
