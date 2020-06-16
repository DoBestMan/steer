import { Sceneries } from './Scenery.types';

export enum SCENERIES_KEYS {
  RURAL = 'RURAL',
  SUBURBAN = 'SUBURBAN',
  URBAN = 'URBAN',
}

export const SCENERIES: Record<SCENERIES_KEYS, Sceneries> = {
  RURAL: Sceneries['scenery--rural'],
  SUBURBAN: Sceneries['scenery--suburban'],
  URBAN: Sceneries['scenery--urban'],
};

export const SCENERIES_WIDTH: Record<SCENERIES_KEYS, number> = {
  RURAL: 1641,
  SUBURBAN: 1512,
  URBAN: 1397,
};
