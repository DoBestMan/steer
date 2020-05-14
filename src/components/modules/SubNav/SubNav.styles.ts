import { css } from '@emotion/core';

import { COLORS, MQ, SPACING, Z_INDEX } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles = {
  action: css({
    padding: SPACING.SIZE_10,
  }),
  actions: css({
    background: COLORS.GLOBAL.WHITE,
    display: 'flex',
    justifyContent: 'space-between',
    padding: `${SPACING.SIZE_30}px ${SPACING.SIZE_10}px`,
    width: '100%',
    [MQ.M]: {
      display: 'none',
    },
  }),
  border: css({
    background: COLORS.GLOBAL.ORANGE,
    bottom: 0,
    height: 20,
    left: 0,
    position: 'absolute',
    width: '100%',
    [MQ.M]: {
      display: 'none',
    },
  }),
  close: css({
    position: 'absolute',
    right: SPACING.SIZE_20,
    top: SPACING.SIZE_30,
    zIndex: Z_INDEX.FRONT,
    [MQ.M]: {
      display: 'none',
    },
  }),
  closeSubNav: css({
    color: COLORS.LIGHT.GRAY_70,
    [MQ.S]: {
      display: 'none',
    },
    [MQ.M]: {
      display: 'flex',
    },
  }),
  link: css({
    alignContent: 'center',
    color: COLORS.LIGHT.GRAY_70,
    display: 'flex',
    whiteSpace: 'nowrap',

    [MQ.S]: typography.bodyCopy,
    [MQ.XL]: typography.smallCopy,
  }),
  linkSection: css({
    li: {
      marginRight: SPACING.SIZE_30,
    },
    span: {
      // overrides nav link sizes
      [MQ.S]: typography.bodyCopy,
      [MQ.M]: [
        {
          fontSize: '1.5rem',
          fontWeight: 'bold',
        },
      ],
    },
    [MQ.M]: {
      display: 'flex',
    },
  }),
  linkSectionIcons: css({
    li: {
      // accommodates margins from designs, icon only buttons have extra padding to make them more clickable
      // MVP will have hardcoded text link first and icon links following
      ':first-of-type': {
        marginRight: SPACING.SIZE_20,
      },
      ':last-of-type': {
        marginRight: -SPACING.SIZE_10,
      },
      marginRight: SPACING.SIZE_10,
    },
  }),
  modal: {
    // full width modal
    background: 'none',
    border: 0,
    borderRadius: 0,
    bottom: 0,
    left: 0,
    padding: 0,
    right: 0,
    top: 0,
  },
  overlay: {
    background: COLORS.LIGHT.GRAY_20,
    zIndex: Z_INDEX.TOP,
  },
  root: css({
    height: '100%',
  }),
  smallShow: css({
    [MQ.S]: {
      display: 'initial',
    },
    [MQ.M]: {
      display: 'none',
    },
  }),
  subnav: css({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'relative',
    [MQ.S]: {
      backgroundColor: COLORS.LIGHT.OFF_WHITE,
      padding: `${SPACING.SIZE_70}px ${SPACING.SIZE_20}px 0 ${SPACING.SIZE_20}px`,
    },
    [MQ.M]: {
      backgroundColor: COLORS.GLOBAL.WHITE,
      padding: `0 ${SPACING.SIZE_40}px`,
    },
    [MQ.L]: {
      padding: `0 ${SPACING.SIZE_60}px`,
    },
  }),
  subnavInnerGrid: css({
    [MQ.M]: {
      height: '100%',
    },
  }),
  subnavLinkList: css({
    display: 'flex',
    width: '100%',
    [MQ.S]: [
      typography.bodyCopy,
      {
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'space-between',
        marginBottom: SPACING.SIZE_40,
      },
    ],
    [MQ.M]: [
      typography.bodyCopy,
      {
        flexDirection: 'row',
        flexGrow: 0,
        height: 'auto',
        justifyContent: 'space-between',
        marginBottom: 'unset',
        paddingBottom: SPACING.SIZE_80,
        paddingTop: SPACING.SIZE_50 + SPACING.SIZE_02, // align to main nav links
        svg: {
          width: 20,
        },
      },
    ],
  }),
};

export default styles;
