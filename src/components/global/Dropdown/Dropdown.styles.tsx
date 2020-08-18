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

const DROPDOWN_MIN_WIDTH = 325;
const DROPDOWN_MAX_WIDTH = 400;

const styles: StylesMap = {
  actionBarDropdown: {
    paddingBottom: ACTION_BAR_HEIGHT.SM + SPACING.SIZE_20,
    minWidth: DROPDOWN_MIN_WIDTH,
    [MQ.M]: {
      paddingBottom: ACTION_BAR_HEIGHT.MED + SPACING.SIZE_20,
    },
    [MQ.L]: {
      paddingBottom: ACTION_BAR_HEIGHT.LG + SPACING.SIZE_20,
    },
  },
  actionBarModal: {
    paddingBottom: ACTION_BAR_HEIGHT.SM,
    [MQ.M]: {
      paddingBottom: ACTION_BAR_HEIGHT.MED,
    },
    [MQ.L]: {
      paddingBottom: ACTION_BAR_HEIGHT.LG,
    },
  },
  carouselDropdown: {
    marginTop: SPACING.SIZE_05 + 3, // allows border bottom to display for link buttons
    maxWidth: DROPDOWN_MAX_WIDTH,
    minWidth: DROPDOWN_MIN_WIDTH,
  },
  defaultDropdown: {
    marginLeft: -SPACING.SIZE_10,
  },
  open: {
    display: 'block',
  },
  root: [
    typography.primarySubhead,
    {
      ':empty': {
        display: 'none',
      },
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
      pointerEvents: 'auto',
      position: 'absolute',
      zIndex: Z_INDEX.TOP,
    },
  ],
};

export default styles;
