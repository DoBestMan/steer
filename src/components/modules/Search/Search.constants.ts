export enum SearchStateEnum {
  BRAND = 'brand',
  FREE_SEARCH = 'free-search',
  POPULAR = 'popular',
  TIRE_SIZE = 'tire-size',
  VEHICLE = 'vehicle',
}

export type SearchStateType =
  | 'brand'
  | 'free-search'
  | 'popular'
  | 'tire-size'
  | 'vehicle';

export const SearchState: Record<string, SearchStateType> = {
  [SearchStateEnum.BRAND]: 'brand',
  [SearchStateEnum.FREE_SEARCH]: 'free-search',
  [SearchStateEnum.POPULAR]: 'popular',
  [SearchStateEnum.TIRE_SIZE]: 'tire-size',
  [SearchStateEnum.VEHICLE]: 'vehicle',
};
