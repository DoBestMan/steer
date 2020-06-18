import {
  BORDERS,
  COLORS,
  MQ,
  RADIUS,
  SPACING,
  StylesMap,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

export const ACTION_BAR_HEIGHT = {
  SM: 90,
  MED: 100,
  LG: 80,
};

const styles: StylesMap = {
  open: {
    display: 'block',
  },
  reset: [
    typography.primarySubhead,
    {
      color: COLORS.LIGHT.GRAY_70,
    },
  ],
  root: {
    alignItems: 'center',
    background: COLORS.GLOBAL.WHITE,
    borderBottomLeftRadius: RADIUS.RADIUS_15,
    borderBottomRightRadius: RADIUS.RADIUS_15,
    borderTop: BORDERS.SOLID_GRAY_20_1PX,
    bottom: 0,
    display: 'flex',
    justifyContent: 'space-between',
    left: 0,
    position: 'fixed',
    right: 0,
    [MQ.S]: {
      height: ACTION_BAR_HEIGHT.SM,
      padding: `${SPACING.SIZE_20}px ${SPACING.SIZE_30}px`,
    },
    [MQ.M]: {
      height: ACTION_BAR_HEIGHT.MED,
      padding: `${SPACING.SIZE_25}px ${SPACING.SIZE_40}px`,
      position: 'absolute',
    },
    [MQ.L]: {
      height: ACTION_BAR_HEIGHT.LG,
      padding: `${SPACING.SIZE_15}px ${SPACING.SIZE_30}px`,
    },
  },
};

export default styles;
