import SearchCarousel from './SearchCarousel';
import SearchSection from './SearchSection';

export enum SearchStateEnum {
  BRAND = 'brand',
  FREE_SEARCH = 'free-search',
  POPULAR = 'popular',
  REAR_TIRE = 'rear-tire',
  TIRE_SIZE = 'tire-size',
  VEHICLE = 'vehicle',
}

export type SearchStateType =
  | 'brand'
  | 'free-search'
  | 'popular'
  | 'tire-size'
  | 'vehicle'
  | 'rear-tire';

export const SearchState: Record<string, SearchStateType> = {
  [SearchStateEnum.BRAND]: 'brand',
  [SearchStateEnum.FREE_SEARCH]: 'free-search',
  [SearchStateEnum.POPULAR]: 'popular',
  [SearchStateEnum.REAR_TIRE]: 'rear-tire',
  [SearchStateEnum.TIRE_SIZE]: 'tire-size',
  [SearchStateEnum.VEHICLE]: 'vehicle',
};

export enum SearchResultListEnum {
  CAROUSEL = 'SiteSearchResultsCarousel',
  LIST = 'SiteSearchResultsList',
}

export const SearchResultListComponent = {
  [SearchResultListEnum.CAROUSEL]: SearchCarousel,
  [SearchResultListEnum.LIST]: SearchSection,
};

export enum SearchInputEnum {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export type SearchInputType = 'primary' | 'secondary';
