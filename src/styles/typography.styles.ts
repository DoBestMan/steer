import { CSSObject } from '@emotion/core';

import { CSSObjectType, MQ } from '~/lib/constants';

const fontStyles = (fontSize: number, lineHeight: number) => ({
  fontSize: `${fontSize / 10}rem`,
  lineHeight: lineHeight / fontSize,
});

export const typographyStyles: {
  [name: string]: CSSObjectType;
} = {
  primaryHeadline: {
    base: {
      ...fontStyles(25, 30),
      fontWeight: 'bold',
      letterSpacing: '-0.02em',
    },
    M: fontStyles(35, 40),
    XL: fontStyles(40, 45),
  },
  secondaryHeadline: {
    base: {
      ...fontStyles(20, 25),
      fontWeight: 'bold',
      letterSpacing: '-0.02em',
    },
    M: fontStyles(25, 30),
    XL: fontStyles(28, 30),
  },
  tertiaryHeadline: {
    base: {
      ...fontStyles(15, 20),
      fontWeight: 'bold',
      letterSpacing: '-0.01em',
    },
    XL: fontStyles(18, 25),
  },
};

export const typography: { [className: string]: CSSObject[] } = {
  bodyCopy: [
    fontStyles(15, 22),
    {
      letterSpacing: '-0.01em',
    },
  ],
  bodyCopyTight: [
    fontStyles(15, 20),
    {
      letterSpacing: '-0.01em',
    },
  ],
  eyebrow: [
    fontStyles(12, 15),
    {
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
  ],
  filterItemLabel: [
    fontStyles(20, 25),
    {
      fontWeight: 'bold',
      [MQ.M]: fontStyles(25, 30),
      [MQ.XL]: fontStyles(15, 20),
    },
  ],
  jumboHeadline: [
    fontStyles(40, 40),
    {
      fontWeight: 'bold',
      letterSpacing: '-0.03em',

      [MQ.M]: {
        ...fontStyles(60, 60),
        letterSpacing: '-0.04em',
      },

      [MQ.XL]: fontStyles(80, 75),
    },
  ],
  labelCopy: [
    fontStyles(12, 20),
    {
      [MQ.M]: fontStyles(15, 22),
    },
  ],
  labelCopyTight: [
    fontStyles(12, 15),
    {
      [MQ.M]: fontStyles(15, 20),
    },
  ],
  labelHeadline: [
    fontStyles(12, 15),
    {
      fontWeight: 'bold',
      [MQ.M]: fontStyles(15, 20),
    },
  ],
  largeCopy: [
    fontStyles(18, 25),
    {
      letterSpacing: '-0.01em',
    },
  ],
  locationHeadline: [
    fontStyles(20, 25),
    {
      fontWeight: 'bold',
      [MQ.M]: fontStyles(35, 40),
      [MQ.XL]: fontStyles(28, 30),
    },
  ],
  modalHeadline: [
    fontStyles(40, 40),
    {
      fontWeight: 'bold',
      [MQ.M]: fontStyles(60, 60),
      [MQ.XL]: fontStyles(40, 45),
    },
  ],
  primaryHeadline: [
    typographyStyles.primaryHeadline.base,
    {
      [MQ.M]: typographyStyles.primaryHeadline.M,
      [MQ.XL]: typographyStyles.primaryHeadline.XL,
    },
  ],
  primarySubhead: [
    fontStyles(15, 20),
    {
      fontWeight: 'bold',
      letterSpacing: '-0.01em',
    },
  ],
  secondaryHeadline: [
    typographyStyles.secondaryHeadline.base,
    {
      [MQ.M]: typographyStyles.secondaryHeadline.M,
      [MQ.XL]: typographyStyles.secondaryHeadline.XL,
    },
  ],
  secondarySubhead: [
    fontStyles(12, 15),
    {
      fontWeight: 'bold',
    },
  ],
  smallCopy: [fontStyles(12, 20)],
  smallCopyTight: [fontStyles(12, 15)],
  tertiaryHeadline: [
    typographyStyles.tertiaryHeadline.base,
    {
      [MQ.XL]: typographyStyles.tertiaryHeadline.XL,
    },
  ],
  topPicksPrice: [
    fontStyles(20, 20),
    {
      fontWeight: 'bold',
      letterSpacing: '-0.02em',
    },
  ],
};
