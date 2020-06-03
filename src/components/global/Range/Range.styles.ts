import { CSSObject } from '@emotion/core';

import { COLORS, RADIUS, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

export const INDICATOR_SIZE = 20;
const RAIL_HEIGHT = 2;

const styles: CSSObject = {
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
    background: COLORS.GLOBAL.ORANGE,
    borderRadius: RADIUS.CIRCLE,
    cursor: 'grab',
    height: INDICATOR_SIZE,
    position: 'absolute',
    top: -SPACING.SIZE_10,
    width: INDICATOR_SIZE,
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
  root: {
    padding: `${SPACING.SIZE_10}px 0`,
  },
};

export default styles;
