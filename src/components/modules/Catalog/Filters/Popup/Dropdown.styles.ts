import {
  BORDERS,
  COLORS,
  MQ,
  RADIUS,
  SPACING,
  StylesMap,
  Z_INDEX,
} from '~/lib/constants';
import { hideScrollbar } from '~/styles/document/accessibility.styles';
import { typography } from '~/styles/typography.styles';

import { ACTION_BAR_HEIGHT } from './ActionBar.styles';

const styles: StylesMap = {
  open: {
    display: 'block',
  },
  actionBar: {
    paddingBottom: ACTION_BAR_HEIGHT.SM + SPACING.SIZE_20,
    [MQ.M]: {
      paddingBottom: ACTION_BAR_HEIGHT.MED + SPACING.SIZE_20,
    },
    [MQ.L]: {
      paddingBottom: ACTION_BAR_HEIGHT.LG + SPACING.SIZE_20,
    },
  },
  root: [
    typography.primarySubhead,
    {
      // allow dropdown content to be scrollable with action bar overlaying content
      '> div:first-of-type': [
        hideScrollbar,
        {
          maxHeight: 500,
          minHeight: 150,
          overflow: 'auto',
          padding: SPACING.SIZE_30,
        },
      ],
      background: COLORS.GLOBAL.WHITE,
      border: BORDERS.SOLID_GRAY_10_1PX,
      borderRadius: RADIUS.RADIUS_15,
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      color: COLORS.GLOBAL.BLACK,
      display: 'none',
      marginTop: SPACING.SIZE_05,
      pointerEvents: 'auto',
      position: 'absolute',
      zIndex: Z_INDEX.TOP,
    },
  ],
};

export default styles;
