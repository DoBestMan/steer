import { ui } from '~/lib/utils/ui-dictionary';

import SearchCarousel from './SearchCarousel';
import SearchSection from './SearchSection';

interface ResultMetadata {
  noExactMatches?: boolean;
}

export interface Results {
  resultMetadata: ResultMetadata;
  siteSearchGroupList: SearchGroup[];
}

export interface SearchGroup {
  label?: string;
  siteSearchResultList: SearchResult[];
  type: SearchResultListEnum;
}

export interface SearchResult {
  action?: SearchResultAction;
  additionalDisplayValue?: string;
  displayImage?: string;
  label: string;
  labelSegments: LabelSegment[];
  type: SearchResultType;
}

export enum SearchResultType {
  SiteSearchResultImageItem = 'SiteSearchResultImageItem',
  SiteSearchResultTextItem = 'SiteSearchResultTextItem',
}

type SearchResultAction =
  | SearchResultActionTypeLink
  | SearchResultActionTypeQuery;

interface SearchResultActionTypeLink {
  link: SearchResultActionLink;
  type: SearchResultActionType.SiteSearchResultActionLink;
}

interface SearchResultActionTypeQuery {
  queryText: string;
  queryType: string;
  type: SearchResultActionType.SiteSearchResultActionQuery;
}

export enum SearchResultActionType {
  SiteSearchResultActionLink = 'SiteSearchResultActionLink',
  SiteSearchResultActionQuery = 'SiteSearchResultActionQuery',
}

interface SearchResultActionLink {
  href: string;
  isExternal: boolean;
}

interface LabelSegment {
  label: string;
  matches: boolean;
}

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

export const SearchStateCopy: Record<string, string> = {
  [SearchStateEnum.BRAND]: ui('search.searchCategories.brand'),
  [SearchStateEnum.POPULAR]: ui('search.searchCategories.popularTires'),
  [SearchStateEnum.TIRE_SIZE]: ui('search.searchCategories.tireSize'),
  [SearchStateEnum.VEHICLE]: ui('search.searchCategories.vehicle'),
};

export const SearchState: Record<string, SearchStateType> = {
  [SearchStateCopy[SearchStateEnum.BRAND]]: 'brand',
  [SearchStateCopy[SearchStateEnum.FREE_SEARCH]]: 'free-search',
  [SearchStateCopy[SearchStateEnum.POPULAR]]: 'popular',
  [SearchStateCopy[SearchStateEnum.REAR_TIRE]]: 'rear-tire',
  [SearchStateCopy[SearchStateEnum.TIRE_SIZE]]: 'tire-size',
  [SearchStateCopy[SearchStateEnum.VEHICLE]]: 'vehicle',
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

export enum SearchModalEnum {
  TIRE_SIZE = 'tire-size',
  VEHICLE_TRIM = 'vehicle-trim',
}
