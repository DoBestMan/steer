import { Emitter } from '../utils/Emitter';

export const eventEmitters = {
  newCatalogSearchQuery: new Emitter<{ comesFromSearch: boolean }>(),
  userPersonalizationLocationUpdate: new Emitter<null>(),
};
