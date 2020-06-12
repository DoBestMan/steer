import { CSSObject } from '@emotion/core';

import { BORDERS, COLORS, MQ, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: CSSObject = {
  icon: {
    marginBottom: SPACING.SIZE_20,
  },
  link: {
    ':not(:last-of-type)': {
      marginRight: SPACING.SIZE_20,
    },
  },
  more: {
    color: COLORS.LIGHT.GRAY_70,
    marginBottom: SPACING.SIZE_10,
  },
  moreLinks: {
    display: 'flex',
    marginBottom: SPACING.SIZE_60,
  },
  number: {
    color: COLORS.GLOBAL.ORANGE,
    minWidth: 60,
  },
  root: {
    background: COLORS.GLOBAL.WHITE,
    color: COLORS.GLOBAL.BLACK,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    [MQ.S]: [
      typography.tertiaryHeadline,
      {
        padding: `0 ${SPACING.SIZE_20}px ${SPACING.SIZE_50}px ${SPACING.SIZE_20}px`,
      },
    ],
    [MQ.L]: [
      typography.primarySubhead,
      {
        padding: `0 0 ${SPACING.SIZE_50}px 0`,
      },
    ],
  },
  step: {
    ':not(:last-of-type)': {
      borderBottom: BORDERS.SOLID_GRAY_10_1PX,
    },
    display: 'flex',
    padding: `${SPACING.SIZE_20}px 0`,
  },
  stepList: {
    marginBottom: SPACING.SIZE_40,
  },
  support: {
    display: 'flex',
    div: {
      ':first-of-type': {
        marginRight: SPACING.SIZE_80,
      },
    },
  },
  supportTitle: {
    color: COLORS.LIGHT.GRAY_70,
    marginBottom: SPACING.SIZE_20,
  },
  text: typography.bodyCopy,
  title: {
    marginBottom: SPACING.SIZE_20,
  },
};

export default styles;
