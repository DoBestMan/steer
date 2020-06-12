import { SiteSearchResultGroup } from './SiteSearchResultGroup';
import {
  fromUserHistorySearchItemToSiteSearchResultTextItem,
  UserHistorySearchItem,
} from './UserHistorySearchItem';

export interface UserHistorySearch {
  items: Array<UserHistorySearchItem>;
}

export function fromUserHistorySearchToSiteSearchResultGroup(
  obj: UserHistorySearch,
): SiteSearchResultGroup {
  return {
    label: '',
    siteSearchResultList: obj.items.map(
      fromUserHistorySearchItemToSiteSearchResultTextItem,
    ),
  };
}
