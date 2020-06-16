import { Cars } from '~/components/global/Car/Car.enums';
import { SCENERIES } from '~/components/global/Scenery/Scenery.constants';

export const DEFAULT_VEHICLE = Cars['car--sedan'];
export const DEFAULT_SCENERY = SCENERIES.RURAL;

export enum STAGES {
  BUILD_IN = 'buildIn', // the build-in animation
  DATA_MOMENT = 'dataMoment', // continue, or choose tire size
  LOADING = 'loading', // display loading indicator
  NO_RESULTS = 'noResults',
  TOP_PICKS = 'topPicks',
}

export const shouldScaleVehicleMap: { [key in STAGES]: boolean } = {
  [STAGES.DATA_MOMENT]: true,
  [STAGES.BUILD_IN]: false,
  [STAGES.LOADING]: false,
  [STAGES.NO_RESULTS]: false,
  [STAGES.TOP_PICKS]: true,
};

// TODO: make enter 0 (or close to) for all steps so that
// all transition timings can be done in CSS. Right now CSS
// timing has to factor in the `enter` duration.
export const stageToMessageTimeout = {
  [STAGES.LOADING]: { enter: 0, exit: 0 },
  [STAGES.BUILD_IN]: { enter: 600, exit: 600 },
  [STAGES.DATA_MOMENT]: { enter: 600, exit: 600 },
  [STAGES.TOP_PICKS]: { enter: 600, exit: 600 },
  [STAGES.NO_RESULTS]: { enter: 300, exit: 600 },
};
