import { Cars } from '~/components/global/Car/Car.enums';
import { SCENERIES } from '~/components/global/Scenery/Scenery.constants';
import { NAV_HEIGHT } from '~/components/modules/Nav/Nav.styles';
import { SiteImage } from '~/data/models/SiteImage';
export const DEFAULT_VEHICLE = Cars['car--sedan'];
export const DEFAULT_SCENERY = SCENERIES.RURAL;
export const DEFAULT_IMAGE = {
  altText: '',
  height: 300,
  src: '/images/default-tire.svg',
  width: 300,
} as SiteImage;

export enum STAGES {
  BUILD_IN = 'buildIn', // the build-in animation
  DATA_MOMENT = 'dataMoment', // continue, or choose tire size
  LOADING = 'loading', // display loading indicator
  NO_RESULTS = 'noResults',
  RESULTS = 'results',
}

const overlayIn = 600;
const stageTransition = 800;
const headerHeight = '140px';

export const stageToMessageTimeout = {
  [STAGES.LOADING]: { enter: 0, exit: 0 },
  [STAGES.BUILD_IN]: { enter: overlayIn, exit: stageTransition / 2 },
  [STAGES.DATA_MOMENT]: {
    enter: stageTransition / 2,
    exit: stageTransition / 2,
  },
  [STAGES.RESULTS]: { enter: stageTransition / 2, exit: stageTransition / 2 },
  [STAGES.NO_RESULTS]: { enter: overlayIn, exit: stageTransition / 2 },
};

export const TIMINGS = {
  CONTENT_IN_OUT: 200,
  OVERLAY_IN: overlayIn,
  STAGE_TRANSITION: stageTransition,
  WHEEL_IN_OUT: 200,
};

export const MEASUREMENTS = {
  [STAGES.LOADING]: {
    CONTENT_MIN_HEIGHT: {
      S: NAV_HEIGHT.S,
      M: NAV_HEIGHT.M,
      L: headerHeight,
    },
    CONTENT_TOP: {
      S: 0,
      M: 0,
      L: 0,
    },
  },
  [STAGES.BUILD_IN]: {
    CONTENT_MIN_HEIGHT: {
      S: NAV_HEIGHT.S,
      M: NAV_HEIGHT.M,
      L: headerHeight,
    },
    CONTENT_TOP: {
      S: 0,
      M: 0,
      L: 140,
    },
  },
  [STAGES.DATA_MOMENT]: {
    CONTENT_MIN_HEIGHT: {
      S: NAV_HEIGHT.S,
      M: NAV_HEIGHT.M,
      L: headerHeight,
    },
    CONTENT_TOP: {
      S: 0,
      M: 0,
      L: 0,
    },
  },
  [STAGES.RESULTS]: {
    CONTENT_MIN_HEIGHT: {
      S: NAV_HEIGHT.S,
      M: NAV_HEIGHT.M,
      L: headerHeight,
    },
    CONTENT_TOP: {
      S: 0,
      M: 0,
      L: 0,
    },
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
  },
};
