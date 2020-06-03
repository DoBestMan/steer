import { CSSObject } from '@emotion/core';

import { COLORS, MQ, RADIUS, SPACING, Z_INDEX } from '~/lib/constants';

const ICON_SIZE = {
  H: 50,
  W: 50,
};
const styles: CSSObject = {
  decorator: {
    color: COLORS.GLOBAL.ORANGE,
    display: 'flex',
    div: {
      // overlap brand images
      ':nth-of-type(1)': {
        left: 0,
        zIndex: Z_INDEX.TOP,
      },
      ':nth-of-type(2)': {
        left: -SPACING.SIZE_25,
        zIndex: Z_INDEX.FRONT,
      },
      ':nth-of-type(3)': {
        left: -SPACING.SIZE_50,
        zIndex: Z_INDEX.ZERO,
      },
      height: ICON_SIZE.H,
      position: 'relative',
      width: ICON_SIZE.W,
    },
    height: ICON_SIZE.H,
    position: 'relative',
    width: '100%',
    zIndex: Z_INDEX.ZERO,
    [MQ.S]: {
      marginBottom: SPACING.SIZE_40,
    },
    [MQ.L]: {
      justifyContent: 'center',
      marginBottom: 0,
      p: {
        marginTop: -5, // line height causes misalignemnt to right column content
      },
    },
    [MQ.XL]: {
      // exception for jumbo headline, should be 60px on XL for card decorator
      fontSize: '6.0rem',
      letterSpacing: '-0.04em',
      lineHeight: 60 / 60, // '60px',
    },
  },
  description: {
    color: COLORS.DARK.GRAY_40,
    marginBottom: SPACING.SIZE_40,
  },
  eyebrow: {
    color: COLORS.GLOBAL.ORANGE,
    display: 'flex',
  },
  eyebrowIcon: {
    paddingLeft: 8,
  },
  root: {
    backgroundColor: COLORS.DARK.GRAY_90,
    borderRadius: RADIUS.RADIUS_15,
    [MQ.S]: {
      padding: SPACING.SIZE_40,
    },
    [MQ.XL]: {
      padding: SPACING.SIZE_60,
    },
  },
  title: {
    color: COLORS.GLOBAL.WHITE,
    marginBottom: SPACING.SIZE_10,
  },
};

export default styles;
