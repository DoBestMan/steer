import { EASING, TIME } from '~/lib/constants';

import { STAGES } from './CatalogSummary.constants';

// TODO: move?
export const CONSTANTS = {
  EASING: EASING.CUBIC_EASE_IN_OUT,
  [STAGES.LOADING]: {
    CONTENT_MIN_HEIGHT: {
      S: '100vh',
      M: '100vh',
      L: '100vh',
    },
    CONTENT_TOP: {
      S: 0,
      M: 0,
      L: 0,
    },
  },
  [STAGES.BUILD_IN]: {
    BG_IN_DELAY: TIME.MS1200,
    BG_IN_DURATION: TIME.MS300,
    CONTENT_MIN_HEIGHT: {
      S: '40vh',
      M: '35vh',
      L: '33.33vh',
    },
    CONTENT_TOP: {
      S: 'max(60vh, 385px)',
      M: 'max(65vh, 517px)',
      L: 'max(66.6vh, 308px)',
    },
    DURATION: TIME.MS1200,
    MESSAGE_IN_DELAY: TIME.MS1200,
    MESSAGE_IN_DURATION: TIME.MS300,
    VEHICLE_IN_DURATION: TIME.MS1200,
  },
  [STAGES.DATA_MOMENT]: {
    CONTENT_MIN_HEIGHT: {
      S: '40vh',
      M: '35vh',
      L: '33.33vh',
    },
    CONTENT_TOP: {
      S: 'max(60vh, 260px)',
      M: 'max(65vh, 425px)',
      L: 'max(66.6vh, 408px)',
    },
    DURATION: TIME.MS1200,
    MESSAGE_IN_DELAY: TIME.MS300,
    MESSAGE_IN_DURATION: TIME.MS300,
  },
  [STAGES.TOP_PICKS]: {
    CONTENT_MIN_HEIGHT: {
      S: '40vh',
      M: '35vh',
      L: '33.33vh',
    },
    CONTENT_TOP: {
      S: 'max(60vh, 385px)',
      M: 'max(65vh, 517px)',
      L: 'max(66.6vh, 538px)',
    },
    DURATION: TIME.MS1200,
    MESSAGE_IN_DELAY: TIME.MS300,
    MESSAGE_IN_DURATION: TIME.MS300,
  },
  [STAGES.NO_RESULTS]: {
    CONTENT_MIN_HEIGHT: {
      S: '60vh',
      M: '65vh',
      L: '66.66vh',
    },
    CONTENT_TOP: {
      S: 'max(40vh, 255px)',
      M: 'max(35vh, 350px)',
      L: 'max(33.3vh, 350px)',
    },
    DURATION: TIME.MS1200,
    MESSAGE_IN_DELAY: TIME.MS600,
    MESSAGE_IN_DURATION: TIME.MS300,
    VEHICLE_IN_DURATION: TIME.MS600,
  },
};
