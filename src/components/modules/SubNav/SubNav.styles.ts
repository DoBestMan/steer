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
    top: SPACING.SIZE_20,
    zIndex: Z_INDEX.FRONT,
    [MQ.M]: {
      display: 'none',
    },
  }),
  link: css({
    alignContent: 'center',
    color: COLORS.LIGHT.GRAY_70,
    display: 'flex',
    [MQ.S]: typography.bodyCopy,
    [MQ.XL]: typography.smallCopy,
  }),
  linkSection: css({
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
      li: {
        ':not(:last-of-type)': {
          marginRight: SPACING.SIZE_30,
        },
      },
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
  modalContent: css({
    height: '100%',
    [MQ.S]: {
      background: COLORS.GLOBAL.WHITE,
    },
    [MQ.M]: {
      background: 'none',
    },
  }),
  overlay: {
    background: COLORS.LIGHT.GRAY_20,
    zIndex: Z_INDEX.TOP,
  },
  root: css({
    height: '100%',
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
        paddingTop: SPACING.SIZE_60,
        svg: {
          width: 20,
        },
      },
    ],
  }),
};

export default styles;
