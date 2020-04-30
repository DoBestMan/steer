import { css } from '@emotion/core';

import { MQ, RADIUS, SPACING } from '~/lib/constants';
import { backgroundColors, colors } from '~/styles/colors.styles';
import { typography } from '~/styles/typography.styles';

const ICON_SIZE = {
  H: 50,
  W: 50,
};
const styles = {
  decorator: [
    colors.GLOBAL.ORANGE,
    typography.jumboHeadline,
    css({
      display: 'flex',
      height: ICON_SIZE.H,
      img: {
        // overlap brand images
        ':nth-of-type(1)': {
          left: 0,
          zIndex: 2,
        },
        ':nth-of-type(2)': {
          left: -SPACING.SIZE_25,
          zIndex: 1,
        },
        ':nth-of-type(3)': {
          left: -SPACING.SIZE_50,
        },
        height: ICON_SIZE.H,
        position: 'relative',
        width: ICON_SIZE.W,
      },
      position: 'relative',
      width: '100%',
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
    }),
  ],
  description: [
    typography.bodyCopy,
    colors.DARK.GRAY_40,
    css({
      marginBottom: SPACING.SIZE_40,
    }),
  ],
  eyebrow: [
    typography.secondaryHeadline,
    colors.GLOBAL.ORANGE,
    { display: 'flex' },
  ],
  eyebrowIcon: css({
    paddingLeft: 8,
  }),
  root: [
    backgroundColors.DARK.GRAY_90,
    typography.jumboHeadline,
    css({
      borderRadius: RADIUS.RADIUS_15,

      [MQ.S]: {
        padding: SPACING.SIZE_40,
      },
      [MQ.XL]: {
        padding: SPACING.SIZE_60,
      },
    }),
  ],
  title: [
    typography.secondaryHeadline,
    colors.GLOBAL.WHITE,
    css({
      marginBottom: SPACING.SIZE_10,
    }),
  ],
};

export default styles;
