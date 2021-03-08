import { CSSObject } from '@emotion/core';

import {
  BREAKPOINTS,
  COLORS,
  GRID_MARGIN,
  MQ,
  SPACING,
  Z_INDEX,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: CSSObject = {
  carousel: {
    '.featured-grid-carousel': {
      display: 'flex',
      [MQ.L]: {
        flex: 1,
        justifyContent: 'center',
      },
    },
  },
  featureDescription: [
    typography.bodyCopyTight,
    {
      marginBottom: SPACING.SIZE_20,
    },
  ],
  header: [
    typography.primaryHeadline,
    {
      [MQ.M]: { marginLeft: GRID_MARGIN.M },
      [MQ.L]: { marginLeft: GRID_MARGIN.L },
      [MQ.XL]: { marginLeft: GRID_MARGIN.XL },
      marginBottom: SPACING.SIZE_20,
      marginLeft: GRID_MARGIN.S,
    },
  ],
  icon: {
    color: COLORS.GLOBAL.BLACK,
    justifyContent: 'center',
    marginBottom: SPACING.SIZE_10,
    minHeight: 35,
  },
  infoSection: {
    position: 'relative',
    width: 170,
    [`@media(max-width: ${BREAKPOINTS.M}px)`]: {
      marginLeft: SPACING.SIZE_80,
    },
  },
  item: {
    ':first-of-type': {
      marginLeft: GRID_MARGIN.S,
      [MQ.M]: { marginLeft: GRID_MARGIN.M },
      [MQ.L]: { marginLeft: GRID_MARGIN.L },
      [MQ.XL]: { marginLeft: GRID_MARGIN.XL },
    },
    ':last-of-type': {
      marginRight: GRID_MARGIN.S,
      [MQ.M]: { marginRight: GRID_MARGIN.M },
      [MQ.L]: { marginRight: GRID_MARGIN.L },
      [MQ.XL]: { marginRight: GRID_MARGIN.XL },
    },
    height: 'auto',
    marginRight: SPACING.SIZE_40,
    width: 270,
    [`@media(max-width: ${BREAKPOINTS.M}px)`]: {
      ':first-of-type': {
        marginLeft: 0,
      },
      ':last-of-type': {
        marginRight: 0,
        width: '100vw',
        'div:last-of-type': {
          marginLeft: 0,
        },
      },
      marginLeft: 0,
      marginRight: 0,
      width: 'calc(100vw - 80px)',
    },
  },
  itemWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
  },
  root: {
    padding: `${SPACING.SIZE_60}px 0 ${SPACING.SIZE_20}px`,
    backgroundColor: COLORS.LIGHT.GRAY_10,
  },
  stepCountCircle: {
    backgroundColor: COLORS.GLOBAL.WHITE,
    border: `solid 2px ${COLORS.GLOBAL.ORANGE}`,
    borderRadius: '50%',
    display: 'block',
    height: 40,
    padding: 8,
    position: 'absolute',
    right: SPACING.SIZE_10,
    top: 0,
    width: 40,
    zIndex: Z_INDEX.FRONT,
    [`@media(max-width: ${BREAKPOINTS.M}px)`]: {
      left: GRID_MARGIN.S,
    },
  },
  stepCountMiddleLine: {
    backgroundColor: COLORS.GLOBAL.ORANGE,
    height: 1,
    position: 'absolute',
    right: 0,
    top: SPACING.SIZE_20,
    verticalAlign: 'middle',
    width: 80,
    [`@media(max-width: ${BREAKPOINTS.M}px)`]: {
      left: 0,
      right: 'auto',
      width: 70,
    },
  },
  stepCountMiddleLineFirst: {
    backgroundColor: COLORS.GLOBAL.ORANGE,
    height: 1,
    position: 'absolute',
    right: 0,
    top: SPACING.SIZE_20,
    verticalAlign: 'middle',
    width: 50,
    [`@media(max-width: ${BREAKPOINTS.M}px)`]: {
      left: GRID_MARGIN.S,
      right: 'auto',
    },
  },
  stepCountSection: [
    typography.primarySubhead,
    {
      color: COLORS.GLOBAL.ORANGE,
      display: 'flex',
      flexDirection: 'row',
      height: 40,
      marginRight: SPACING.SIZE_10,
      marginTop: SPACING.SIZE_20,
      maxWidth: 80,
      position: 'relative',
      [`@media(max-width: ${BREAKPOINTS.M}px)`]: {
        display: 'block',
        left: 0,
        position: 'absolute',
      },
    },
  ],
  stepCountSectionFirst: [
    typography.primarySubhead,
    {
      color: COLORS.GLOBAL.ORANGE,
      height: 40,
      marginRight: SPACING.SIZE_10,
      marginTop: SPACING.SIZE_20,
      position: 'relative',
      width: 60,
      [`@media(max-width: ${BREAKPOINTS.M}px)`]: {
        display: 'block',
        left: 0,
        position: 'absolute',
      },
    },
  ],
  title: [
    typography.primarySubhead,
    {
      marginBottom: SPACING.SIZE_10,

      [MQ.L]: {
        br: {
          display: 'none',
        },
      },

      span: {
        display: 'block',
      },
    },
  ],
};

export default styles;
