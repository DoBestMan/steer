import { COLORS, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

import { NAV_CONTENT_HEIGHT } from '../Nav.styles';

const BADGE_SIZE = 16;

const styles: StylesMap = {
  badge: [
    typography.eyebrow,
    {
      backgroundColor: COLORS.GLOBAL.ORANGE,
      border: 'none',
      borderRadius: BADGE_SIZE / 2,
      color: COLORS.GLOBAL.WHITE,
      height: BADGE_SIZE,
      lineHeight: 1,
      minWidth: BADGE_SIZE,
      padding: '2px 4px',
      position: 'absolute',
      right: -4 + BADGE_SIZE / 2,
      textAlign: 'center',
      top: -12,
      transform: 'translateX(50%)',
    },
  ],
  link: {
    height: NAV_CONTENT_HEIGHT,
    paddingTop: SPACING.SIZE_02,
    position: 'relative',
  },
};

export default styles;
