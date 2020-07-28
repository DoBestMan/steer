import {
  COLORS,
  GAP_COLUMNS,
  MQ,
  RADIUS,
  SPACING,
  StylesMap,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const CONSTANTS = {
  CHECKMARK_WIDTH: 10,
  CURRENT_STEP_TRACK_STOP_SIZE: 41,
  TRACK_LINE_BEGINNING_HEIGHT: 5,
  TRACK_LINE_WIDTH: 1,
  TRACK_STOP_SIZE: 11,
};

const styles: StylesMap = {
  content: {
    gridColumn: '2/5',
    paddingBottom: SPACING.SIZE_60,
    [MQ.L]: {
      gridColumn: '2/4',
    },
    [MQ.XL]: {
      gridColumn: '2/5',
    },
  },
  currentLabel: {
    color: COLORS.GLOBAL.ORANGE,
  },
  currentStepTrackStop: {
    alignItems: 'center',
    backgroundColor: COLORS.GLOBAL.ORANGE,
    borderRadius: RADIUS.CIRCLE,
    display: 'flex',
    height: CONSTANTS.CURRENT_STEP_TRACK_STOP_SIZE,
    justifyContent: 'center',
    width: CONSTANTS.CURRENT_STEP_TRACK_STOP_SIZE,
  },
  currentStepTrackStopIcon: {
    '> svg': {
      width: CONSTANTS.CHECKMARK_WIDTH,
    },
    color: COLORS.GLOBAL.WHITE,
  },
  descriptionComponent: [
    typography.bodyCopyTight,
    {
      color: COLORS.LIGHT.GRAY_70,
    },
  ],
  label: [
    typography.primarySubhead,
    {
      color: COLORS.LIGHT.GRAY_70,
    },
  ],
  track: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gridColumn: '1/2',
    justifyContent: 'center',
  },
  trackLastStep: {
    justifyContent: 'flex-start',
  },
  trackLine: {
    backgroundColor: COLORS.LIGHT.GRAY_20,
    flexGrow: 1,
    width: CONSTANTS.TRACK_LINE_WIDTH,
  },
  trackLineBeginning: {
    backgroundColor: COLORS.LIGHT.GRAY_20,
    height: CONSTANTS.TRACK_LINE_BEGINNING_HEIGHT,
    width: CONSTANTS.TRACK_LINE_WIDTH,
  },
  trackOnlyStep: {
    paddingTop: SPACING.SIZE_05,
  },
  trackStop: {
    backgroundColor: COLORS.LIGHT.GRAY_20,
    borderRadius: RADIUS.CIRCLE,
    height: CONSTANTS.TRACK_STOP_SIZE,
    width: CONSTANTS.TRACK_STOP_SIZE,
  },
  wrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    [MQ.L]: {
      gridColumnGap: GAP_COLUMNS.L,
      gridTemplateColumns: 'repeat(5, 1fr)',
    },
    [MQ.XL]: {
      gridColumnGap: GAP_COLUMNS.XL,
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  },
};

export default styles;
