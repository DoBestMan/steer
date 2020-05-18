import { css, CSSObject } from '@emotion/core';

import { MQ } from '~/lib/constants';

/* line heights are calculated by taking the
ratio of lineHeightInPixels / fontSizeInPixels */

const fontFamily =
  '"Circular Std", "Helvetica Neue", Helvetica, Arial, sans-serif';

export const typographyStyles: { [name: string]: CSSObject } = {
  primaryHeadline: {
    /* eslint-disable sort-keys */
    base: {
      fontFamily,
      fontSize: '2.5rem',
      fontStyle: 'normal',
      fontWeight: 'bold',
      letterSpacing: '-0.02em',
      lineHeight: 30 / 25,
    },
    M: {
      fontSize: '3.5rem',
      lineHeight: 40 / 35,
    },
    XL: {
      fontSize: '4.0rem',
      lineHeight: 45 / 40,
    },
    /* eslint-enable sort-keys */
  },
  secondaryHeadline: {
    /* eslint-disable sort-keys */
    base: {
      fontFamily,
      fontSize: '2.0rem',
      fontStyle: 'normal',
      fontWeight: 'bold',
      letterSpacing: '-0.02em',
      lineHeight: 25 / 20,
    },
    M: {
      fontSize: '2.5rem',
      lineHeight: 30 / 25,
    },
    XL: {
      fontSize: '2.8rem',
      lineHeight: 30 / 28,
    },
    /* eslint-enable sort-keys */
  },
};

export const typography = {
  bodyCopy: css({
    fontFamily,
    fontSize: '1.5rem',
    fontStyle: 'normal',
    fontWeight: 'normal',
    letterSpacing: '-0.01em',
    lineHeight: 22 / 15,
  }),
  bodyCopyTight: css({
    fontFamily,
    fontSize: '1.5rem',
    fontStyle: 'normal',
    fontWeight: 'normal',
    letterSpacing: '-0.01em',
    lineHeight: 20 / 15,
  }),
  eyebrow: css({
    fontFamily,
    fontSize: '1.2rem',
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 15 / 12,
    textTransform: 'uppercase',
  }),
  jumboHeadline: css({
    fontFamily,
    fontSize: '4.0rem',
    fontStyle: 'normal',
    fontWeight: 'bold',
    letterSpacing: '-0.03em',
    lineHeight: 40 / 40,

    [MQ.M]: {
      fontSize: '6.0rem',
      letterSpacing: '-0.04em',
      lineHeight: 60 / 60,
    },

    [MQ.XL]: {
      fontSize: '8.0rem',
      lineHeight: 75 / 80,
    },
  }),
  largeCopy: css({
    fontFamily,
    fontSize: '1.8rem',
    fontStyle: 'normal',
    fontWeight: 'normal',
    letterSpacing: '-0.01em',
    lineHeight: 25 / 18,
  }),
  primaryHeadline: [
    typographyStyles.primaryHeadline.base,
    css({
      [MQ.M]: typographyStyles.primaryHeadline.M,
      [MQ.XL]: typographyStyles.primaryHeadline.XL,
    }),
  ],
  primarySubhead: css({
    fontFamily,
    fontSize: '1.5rem',
    fontStyle: 'normal',
    fontWeight: 'bold',
    letterSpacing: '-0.01em',
    lineHeight: 20 / 15,
  }),
  secondaryHeadline: [
    typographyStyles.secondaryHeadline.base,
    css({
      [MQ.M]: typographyStyles.secondaryHeadline.M,
      [MQ.XL]: typographyStyles.secondaryHeadline.XL,
    }),
  ],
  secondarySubhead: css({
    fontFamily,
    fontSize: '1.2rem',
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 15 / 12,
  }),
  smallCopy: css({
    fontFamily,
    fontSize: '1.2rem',
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 20 / 12,
  }),
  smallCopyTight: css({
    fontFamily,
    fontSize: '1.2rem',
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 15 / 12,
  }),
  tertiaryHeadline: css({
    fontFamily,
    fontSize: '1.5rem',
    fontStyle: 'normal',
    fontWeight: 'bold',
    letterSpacing: '-0.01em',
    lineHeight: 20 / 15,

    [MQ.XL]: {
      fontSize: '1.8rem',
      lineHeight: 25 / 18,
    },
  }),
};
