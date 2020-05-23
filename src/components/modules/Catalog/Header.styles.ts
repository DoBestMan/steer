import { CSSObject } from '@emotion/core';

import { COLORS, MQ, SPACING, TIME } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: CSSObject = {
  action: {
    alignItems: 'baseline',
    color: COLORS.GLOBAL.WHITE,
    marginBottom: SPACING.SIZE_20,
  },
  back: {
    alignItems: 'center',
    marginLeft: -SPACING.SIZE_05,
    marginTop: -SPACING.SIZE_05,
    [MQ.L]: {
      position: 'absolute',
      right: SPACING.SIZE_60,
    },
  },
  decorator: {
    ':after': {
      content: '"•"',
      fontSize: 10,
      padding: SPACING.SIZE_10,
    },
    alignItems: 'center',
    display: 'flex',
  },
  header: {
    marginBottom: SPACING.SIZE_40,
  },
  info: [
    typography.primarySubhead,
    {
      alignItems: 'baseline',
      display: 'flex',
    },
  ],
  label: {
    marginRight: SPACING.SIZE_15,
    [MQ.S]: typography.secondarySubhead,
    [MQ.M]: typography.primarySubhead,
  },
  link: {
    marginLeft: SPACING.SIZE_05,
  },
  location: {
    color: COLORS.GLOBAL.BLACK,
  },
  root: {
    background: COLORS.GLOBAL.ORANGE,
    color: COLORS.GLOBAL.WHITE,
    transition: `all ${TIME.MS300}ms ease`,
    [MQ.S]: {
      padding: SPACING.SIZE_20,
    },
    [MQ.M]: {
      padding: SPACING.SIZE_40,
    },
    [MQ.L]: {
      padding: SPACING.SIZE_60,
    },
  },
  rootAdvanced: {
    background: COLORS.GLOBAL.BLACK,
  },
  text: {
    color: COLORS.GLOBAL.BLACK,
  },
  textAdvanced: {
    color: COLORS.DARK.GRAY_40,
  },
  title: [typography.primaryHeadline, { marginBottom: SPACING.SIZE_10 }],
  toggle: {
    alignItems: 'center',
    display: 'flex',
    position: 'absolute',
    [MQ.S]: {
      right: SPACING.SIZE_20,
    },
    [MQ.M]: {
      right: SPACING.SIZE_40,
    },
    [MQ.L]: {
      right: SPACING.SIZE_60,
    },
  },
  wrappedLocation: {
    paddingTop: SPACING.SIZE_05,
  },
};

export default styles;
