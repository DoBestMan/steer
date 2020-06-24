import { COLORS, RADIUS, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

import { PROMO_STYLES } from './PromoTag.types';

const ICON_SIZE = 10;

const styles: StylesMap = {
  icon: {
    height: ICON_SIZE,
    width: ICON_SIZE,
    marginLeft: SPACING.SIZE_05,
  },
  root: [
    typography.secondarySubhead,
    {
      alignItems: 'center',
      border: '1px solid',
      borderRadius: RADIUS.RADIUS_5,
      color: COLORS.GLOBAL.ORANGE,
      display: 'inline-flex',
      marginBottom: 7,
      padding: `${SPACING.SIZE_05}px 7px`,
    },
  ],
  [PROMO_STYLES.DEFAULT]: {
    border: 'none',
  },
  [PROMO_STYLES.BLACK_PILL]: {
    backgroundColor: COLORS.GLOBAL.BLACK,
    borderColor: COLORS.GLOBAL.BLACK,
    color: COLORS.GLOBAL.WHITE,
  },
  [PROMO_STYLES.WHITE_PILL]: {
    borderColor: COLORS.GLOBAL.ORANGE,
    color: COLORS.GLOBAL.ORANGE,
  },
  [PROMO_STYLES.ORANGE_PILL]: {
    backgroundColor: COLORS.GLOBAL.ORANGE,
    borderColor: COLORS.GLOBAL.ORANGE,
    color: COLORS.GLOBAL.WHITE,
  },
  uppercase: {
    textTransform: 'uppercase',
  },
};

export const clickableStyles = {
  [PROMO_STYLES.DEFAULT]: {
    ':hover, :focus:not(:active)': {
      color: COLORS.ORANGE.SHADE_15_SOLID,
    },
    ':active': {
      color: COLORS.GLOBAL.ORANGE,
    },
  },
  [PROMO_STYLES.BLACK_PILL]: {
    ':hover, :focus:not(:active)': {
      backgroundColor: COLORS.LIGHT.GRAY_70,
    },
    ':active': {
      backgroundColor: COLORS.GLOBAL.BLACK,
    },
  },
  [PROMO_STYLES.WHITE_PILL]: {
    ':hover, :focus:not(:active)': {
      borderColor: COLORS.ORANGE.SHADE_30_SOLID,
    },
    ':active': {
      backgroundColor: COLORS.LIGHT.GRAY_10,
    },
  },
  [PROMO_STYLES.ORANGE_PILL]: {
    ':hover, :focus:not(:active)': {
      borderColor: COLORS.ORANGE.SHADE_30_SOLID,
    },
    ':active': {
      borderColor: COLORS.ORANGE.TINT_30_SOLID,
    },
  },
};

export default styles;
