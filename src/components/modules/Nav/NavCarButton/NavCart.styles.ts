import { COLORS, SPACING, StylesMap, THEME } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

import { NAV_CONTENT_HEIGHT } from '../Nav.styles';

const BADGE_SIZE = 16;

export const badgeColor = {
  [THEME.LIGHT]: {
    backgroundColor: COLORS.GLOBAL.ORANGE,
  },
  [THEME.ORANGE]: {
    backgroundColor: COLORS.LIGHT.GRAY_70,
  },
};

const styles: StylesMap = {
  badge: [
    typography.eyebrow,
    {
      border: 'none',
      borderRadius: BADGE_SIZE / 2,
      color: COLORS.GLOBAL.WHITE,
      height: BADGE_SIZE,
      lineHeight: 1,
      minWidth: BADGE_SIZE,
      padding: '2px 4px',
      position: 'absolute',
      right: 6 + BADGE_SIZE / 2,
      textAlign: 'center',
      top: -12,
      transform: 'translateX(50%)',
    },
  ],
  link: {
    height: NAV_CONTENT_HEIGHT,
    padding: `${SPACING.SIZE_02}px ${SPACING.SIZE_10}px 0`,
    position: 'relative',
  },
};

export default styles;
