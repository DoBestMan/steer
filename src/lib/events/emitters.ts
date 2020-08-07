import { Emitter } from '../utils/Emitter';

export const eventEmitters = {
  newCatalogSearchQuery: new Emitter<{ comesFromSearch: boolean }>(),
  setNavVisibility: new Emitter<{ isVisible: boolean }>(),
  skipPageTransition: new Emitter<null>(),
  userPersonalizationLocationUpdate: new Emitter<null>(),
};
