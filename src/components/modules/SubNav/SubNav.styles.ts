import { css } from '@emotion/core';

import { BORDERS, COLORS, MQ, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles = {
  flair: css({
    paddingLeft: SPACING.SIZE_10,
  }),
  flairIcon: css({
    maxWidth: 20,
    paddingLeft: 5,

    svg: {
      // aligning items in flex container will misalign text flair
      paddingBottom: 8,
    },
  }),
  flairSeparator: css({
    ':before': {
      content: '"•"',
      fontSize: 6,
    },
    alignItems: 'center',
    display: 'flex',
    paddingLeft: SPACING.SIZE_10,
  }),
  header: css({
    marginBottom: SPACING.SIZE_15,
  }),
  image: css({
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    span: {
      maxWidth: 30, // targets svg icon
    },
  }),
  imageContainer: css({
    alignItems: 'flex-end',
    bottom: 0,
    display: 'flex',
    height: '100%',
    pointerEvents: 'none',
    position: 'absolute',
    right: 0,
  }),
  info: css({
    color: COLORS.LIGHT.GRAY_70,
  }),
  infoTitle: css({
    fontWeight: 'bold',
  }),
  label: css({
    display: 'flex',
  }),
  link: {
    [MQ.S]: typography.bodyCopy,
    [MQ.XL]: typography.smallCopy,
  },
  linkContainer: css({
    display: 'flex',
    marginBottom: SPACING.SIZE_10,
    position: 'relative',
  }),
  linkDecoration: css({
    ':before': {
      content: '"•"',
      fontSize: 20,
    },
    left: -SPACING.SIZE_15,
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
  }),
  list: css({
    marginBottom: SPACING.SIZE_30,
  }),
  listItem: css({
    borderBottom: BORDERS.SOLID_GRAY_10_1PX,
    display: 'flex',
    justifyContent: 'space-between',
    padding: `${SPACING.SIZE_20}px 0`,
    position: 'relative',
  }),
  more: css({
    padding: `${SPACING.SIZE_20}px 0`,
  }),
  root: css({
    [MQ.S]: {
      backgroundColor: COLORS.LIGHT.OFF_WHITE,
    },
    [MQ.M]: {
      backgroundColor: COLORS.GLOBAL.WHITE,
    },
  }),
  selected: css({
    color: COLORS.GLOBAL.ORANGE,
  }),
  subnavLabel: css({
    color: COLORS.LIGHT.GRAY_70,
    marginBottom: SPACING.SIZE_10,
  }),
  title: css({
    alignItems: 'center',
    display: 'flex',
  }),
};

export default styles;
