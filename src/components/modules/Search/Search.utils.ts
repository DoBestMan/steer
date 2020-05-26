import {
  SearchResultListComponent,
  SearchResultListEnum,
} from './Search.constants';

export function getSearchResultComponent(resultType: SearchResultListEnum) {
  return SearchResultListComponent[resultType];
}
