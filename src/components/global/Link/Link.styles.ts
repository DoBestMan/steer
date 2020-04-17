import { css } from '@emotion/core';

import { colors } from '~/styles/global/colors.styles';
import { typography } from '~/styles/global/typography.styles';

import { LWeight, LSize, LTheme, TIME, MQ } from '~/lib/constants';

const styles = {
  icon: css({
    paddingLeft: 5,
  }),
  link: css({
    borderBottom: '2px dotted transparent',
    transition: `border-color ${TIME.MS100}ms ease`,
  }),
  root: css({
    '&:hover span, &:focus span': {
      borderColor: 'inherit',
    },

    alignItems: 'center',
    display: 'flex',
  }),

  // conditional styles
  [LTheme.DARK]: [
    colors.DARK.GRAY_40,
    css({
      '&:hover:not(:active)': colors.GLOBAL.WHITE,
    }),
  ],
  [LTheme.LIGHT]: [
    colors.GLOBAL.BLACK,
    css({
      '&:active span, &:focus span': colors.LIGHT.GRAY_70,
    }),
  ],
  [LSize.REG]: typography.bodyCopy,
  [LSize.SM]: typography.smallCopy,
  [LWeight.BOLD]: css({
    fontWeight: 'bold',
  }),
  [LWeight.NORMAL]: css({
    fontWeight: 'normal',
  }),
};

export const footerLink = [
  colors.LIGHT.GRAY_70,
  typography.bodyCopy,
  css({
    '&:hover': colors.GLOBAL.BLACK,
    display: 'inline-block',
    [MQ.XL]: typography.smallCopy,
  }),
];

export const navLink = [
  colors.LIGHT.GRAY_70,
  typography.tertiaryHeadline,
  css({
    '&:hover span': colors.GLOBAL.BLACK,

    // eslint-disable-next-line sort-keys
    '&:active span, &:focus span': colors.GLOBAL.ORANGE,
    [MQ.XL]: typography.tertiaryHeadline,
  }),
];

export default styles;
