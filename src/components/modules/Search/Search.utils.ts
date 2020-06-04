import {
  SearchResultListComponent,
  SearchResultListEnum,
} from './Search.types';

export function getSearchResultComponent(resultType: SearchResultListEnum) {
  return SearchResultListComponent[resultType];
}
