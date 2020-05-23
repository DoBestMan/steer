import { Sceneries } from './Scenery.types';

export const SCENERIES: Record<string, Sceneries> = {
  RURAL: Sceneries['scenery--rural'],
  SUBURBAN: Sceneries['scenery--suburban'],
  URBAN: Sceneries['scenery--urban'],
};

export const SCENERIES_WIDTH: Record<string, number> = {
  RURAL: 1641,
  SUBURBAN: 1512,
  URBAN: 1397,
};
