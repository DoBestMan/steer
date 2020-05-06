import { css } from '@emotion/core';

import { BORDERS, COLORS, MQ, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const ITEM_HEIGHT = 60;
const DECORATOR_CONTENT = {
  content: '"•"',
};

const styles = {
  alignList: css({
    [MQ.M]: {
      marginTop: -SPACING.SIZE_20, // align content with links label
    },
  }),
  categoryList: css({
    [MQ.S]: {
      marginBottom: SPACING.SIZE_40,
    },
    [MQ.L]: {
      marginBottom: SPACING.SIZE_60,
    },
  }),
  container: css({
    color: COLORS.GLOBAL.BLACK,
    display: 'flex',
    marginBottom: SPACING.SIZE_10,
    position: 'relative',
  }),
  content: css({
    background: COLORS.GLOBAL.WHITE,
    [MQ.S]: {
      padding: `0 ${SPACING.SIZE_20}px ${SPACING.SIZE_50}px ${SPACING.SIZE_20}px`,
    },
    [MQ.M]: {
      height: '100%',
      padding: `0 0 ${SPACING.SIZE_50}px 0`,
    },
  }),
  decoration: css({
    ':before': {
      ...DECORATOR_CONTENT,
      fontSize: 20,
    },
    left: -SPACING.SIZE_20,
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
  }),
  flair: css({
    color: COLORS.GLOBAL.ORANGE,
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
      ...DECORATOR_CONTENT,
      fontSize: 6,
    },
    alignItems: 'center',
    display: 'flex',
    paddingLeft: SPACING.SIZE_10,
  }),
  header: css({
    color: COLORS.LIGHT.GRAY_70,
    marginBottom: SPACING.SIZE_10,
    [MQ.S]: [
      typography.tertiaryHeadline,
      {
        paddingTop: SPACING.SIZE_30,
      },
    ],
    [MQ.M]: [
      typography.eyebrow,
      {
        paddingTop: 'unset',
      },
    ],
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
    right: 0,
  }),
  info: css({
    color: COLORS.LIGHT.GRAY_70,
    [MQ.S]: typography.smallCopyTight,
    [MQ.L]: typography.bodyCopyTight,
  }),
  infoTitle: css({
    fontWeight: 'bold',
  }),
  label: css({
    alignItems: 'center',
    display: 'flex',
    [MQ.S]: typography.jumboHeadline,
    [MQ.M]: typography.primaryHeadline,
  }),
  link: typography.bodyCopy,
  linkLabel: css({
    display: 'flex',
  }),
  list: css({
    // enables the entire list item to be clickable while only triggering focus styles on link label
    'a:after': {
      content: "''",
      height: '100%',
      position: 'absolute',
      width: '100%',
    },
    width: '100%',
  }),
  listItem: css({
    ':not(:last-of-type)': {
      borderBottom: BORDERS.SOLID_GRAY_10_1PX,
    },
    display: 'flex',
    height: ITEM_HEIGHT,
    justifyContent: 'space-between',
    padding: `${SPACING.SIZE_20}px 0`,
    position: 'relative',
    width: '100%',
  }),
  listTitle: css({
    marginBottom: SPACING.SIZE_15,
    [MQ.S]: {
      marginTop: SPACING.SIZE_20,
    },
    [MQ.M]: {
      marginTop: 0,
    },
  }),
  mobileHeader: css({
    marginBottom: SPACING.SIZE_20,
    paddingTop: SPACING.SIZE_30,
  }),
  selected: css({
    color: COLORS.GLOBAL.ORANGE,
  }),
};

export default styles;
