import { CSSObject } from '@emotion/core';

import { COLORS, RADIUS, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

import { RANGE_SLIDER_SIZE } from './Range.constants';

export const INDICATOR_SIZE = {
  [RANGE_SLIDER_SIZE.REGULAR]: 20,
  [RANGE_SLIDER_SIZE.SMALL]: 8,
};
// prevents rail width changing
const LABEL_SM_WIDTH = 35;
const RAIL_HEIGHT = 2;

const styles: CSSObject = {
  container: {
    marginLeft: SPACING.SIZE_05,
    marginRight: SPACING.SIZE_10,
    padding: `${SPACING.SIZE_10}px 0`,
    width: '100%',
  },
  fillColor: {
    backgroundColor: COLORS.GLOBAL.ORANGE,
    height: RAIL_HEIGHT,
    position: 'absolute',
    width: 100,
  },
  indicator: {
    ':active': {
      cursor: 'grabbing',
    },
    '> span': {
      alignItems: 'center',
      color: COLORS.GLOBAL.WHITE,
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
      left: 0,
      pointerEvents: 'none',
      position: 'absolute',
      width: '100%',
    },
    borderRadius: RADIUS.CIRCLE,
    cursor: 'grab',
    position: 'absolute',
  },
  labels: [
    typography.secondaryHeadline,
    {
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: SPACING.SIZE_15,
      width: '100%',
    },
  ],
  labelSm: [typography.bodyCopyTight, { minWidth: LABEL_SM_WIDTH }],
  maxIndicator: {
    right: 0,
  },
  minIndicator: {
    left: 0,
  },
  rail: {
    backgroundColor: COLORS.LIGHT.GRAY_20,
    borderRadius: RADIUS.RADIUS_25,
    height: RAIL_HEIGHT,
    position: 'relative',
    width: '100%',
  },
  rootSmall: {
    display: 'flex',
    width: '100%',
  },

  [RANGE_SLIDER_SIZE.REGULAR]: {
    background: COLORS.GLOBAL.ORANGE,
    height: INDICATOR_SIZE[RANGE_SLIDER_SIZE.REGULAR],
    top: -SPACING.SIZE_10,
    width: INDICATOR_SIZE[RANGE_SLIDER_SIZE.REGULAR],
  },
  [RANGE_SLIDER_SIZE.SMALL]: {
    background: COLORS.GLOBAL.WHITE,
    border: `2px solid ${COLORS.GLOBAL.ORANGE}`,
    height: INDICATOR_SIZE[RANGE_SLIDER_SIZE.SMALL],
    top: -3,
    width: INDICATOR_SIZE[RANGE_SLIDER_SIZE.SMALL],
  },
};

export default styles;
