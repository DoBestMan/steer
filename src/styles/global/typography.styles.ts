import { css } from '@emotion/core';
import { MQ } from '~/styles/constants/breakpoints';

export const typography = {
  bodyCopy: css({
    fontFamily: `Circular Std`,
    fontSize: `1.5rem`,
    fontStyle: `normal`,
    fontWeight: `normal`,
    letterSpacing: `-0.01em`,
    lineHeight: `22px`,

    [MQ.M]: {
      fontSize: `1.8rem`,
      lineHeight: `25px`,
    },
  }),
  eyebrow: css({
    fontFamily: `Circular Std`,
    fontSize: `1.2rem`,
    fontStyle: `normal`,
    fontWeight: `bold`,
    lineHeight: `15px`,
    textTransform: 'uppercase',

    [MQ.M]: {
      fontSize: `1.5rem`,
      letterSpacing: `-0.01em`,
      lineHeight: `20px`,
    },
  }),
  jumboHeadline: css({
    fontFamily: `Circular Std`,
    fontSize: `4.0rem`,
    fontStyle: `normal`,
    fontWeight: `bold`,
    letterSpacing: `-0.03em`,
    lineHeight: `40px`,

    [MQ.M]: {
      fontSize: `6.0rem`,
      letterSpacing: `-0.04em`,
      lineHeight: `60px`,
    },

    [MQ.L]: {
      fontSize: `8.0rem`,
      lineHeight: `75px`,
    },
  }),
  primaryHeadline: css({
    fontFamily: `Circular Std`,
    fontSize: `2.5rem`,
    fontStyle: `normal`,
    fontWeight: `bold`,
    letterSpacing: `-0.02em`,
    lineHeight: `30px`,

    [MQ.M]: {
      fontSize: `3.5rem`,
      lineHeight: `40px`,
    },

    [MQ.L]: {
      fontSize: `4.0rem`,
      lineHeight: `45px`,
    },
  }),
  secondaryHeadline: css({
    fontFamily: `Circular Std`,
    fontSize: `2.0rem`,
    fontStyle: `normal`,
    fontWeight: `bold`,
    letterSpacing: `-0.02em`,
    lineHeight: `25px`,

    [MQ.M]: {
      fontSize: `2.4rem`,
      lineHeight: `30px`,
    },

    [MQ.L]: {
      fontSize: `2.8rem`,
      lineHeight: `30px`,
    },
  }),
  smallCopy: css({
    fontFamily: `Circular Std`,
    fontSize: `1.2rem`,
    fontStyle: `normal`,
    fontWeight: `normal`,
    letterSpacing: `-0.01em`,
    lineHeight: `20px`,

    [MQ.M]: {
      fontSize: `1.5rem`,
      letterSpacing: `-0.01em`,
      lineHeight: `22px`,
    },
  }),
  subhead: css({
    fontFamily: `Circular Std`,
    fontSize: `1.2rem`,
    fontStyle: `normal`,
    fontWeight: `bold`,
    lineHeight: `5px`,

    [MQ.M]: {
      fontSize: `1.5rem`,
      letterSpacing: `-0.01em`,
      lineHeight: `20px`,
    },
  }),
  tertiaryHeadline: css({
    fontFamily: `Circular Std`,
    fontSize: `1.4rem`,
    fontStyle: `normal`,
    fontWeight: `bold`,
    letterSpacing: `-0.01em`,
    lineHeight: `20px`,

    [MQ.M]: {
      fontSize: `1.8rem`,
      lineHeight: `25px`,
    },
  }),
};
