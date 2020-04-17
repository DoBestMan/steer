import { css } from '@emotion/core';

import { MQ, RADIUS, SPACING } from '~/lib/constants';

import { typography } from '~/styles/global/typography.styles';
import { colors, backgroundColors } from '~/styles/global/colors.styles';

const styles = {
  decorator: [
    colors.GLOBAL.ORANGE,
    css({
      display: 'flex',
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
    }),
  ],
  description: [typography.bodyCopy, colors.DARK.GRAY_40],
  eyebrow: [typography.secondaryHeadline, colors.GLOBAL.ORANGE],
  eyebrowIcon: css({
    paddingLeft: 8,
  }),
  link: [
    typography.bodyCopy,
    colors.DARK.GRAY_40,
    css({
      marginRight: 6,
    }),
  ],
  root: [
    backgroundColors.DARK.GRAY_90,
    typography.jumboHeadline,
    css({
      borderRadius: RADIUS.ROUNDED,

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
