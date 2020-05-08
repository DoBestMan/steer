import { css } from '@emotion/core';

import { BORDERS, COLORS, MQ, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles = {
  icon: css({
    marginBottom: SPACING.SIZE_20,
  }),
  link: css({
    ':not(:last-of-type)': {
      marginRight: SPACING.SIZE_20,
    },
  }),
  more: css({
    color: COLORS.LIGHT.GRAY_70,
    marginBottom: SPACING.SIZE_10,
  }),
  moreLinks: css({
    display: 'flex',
    marginBottom: SPACING.SIZE_60,
  }),
  number: css({
    color: COLORS.GLOBAL.ORANGE,
    minWidth: 60,
  }),
  root: css({
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
  }),
  step: css({
    ':not(:last-of-type)': {
      borderBottom: BORDERS.SOLID_GRAY_10_1PX,
    },
    display: 'flex',
    padding: `${SPACING.SIZE_20}px 0`,
  }),
  stepList: css({
    marginBottom: SPACING.SIZE_40,
  }),
  support: css({
    display: 'flex',
    div: {
      ':first-of-type': {
        marginRight: SPACING.SIZE_80,
      },
    },
  }),
  supportTitle: css({
    color: COLORS.LIGHT.GRAY_70,
    marginBottom: SPACING.SIZE_20,
  }),
  text: css({
    [MQ.S]: typography.bodyCopy,
    [MQ.L]: typography.bodyCopyTight,
  }),
  title: css({
    marginBottom: SPACING.SIZE_20,
  }),
};

export default styles;
