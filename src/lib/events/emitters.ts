import { Emitter } from '../utils/Emitter';

export const eventEmitters = {
  newCatalogSearchQuery: new Emitter<{ comesFromSearch: boolean }>(),
  setNavVisibility: new Emitter<{ isVisible: boolean }>(),
  userPersonalizationLocationUpdate: new Emitter<null>(),
};
