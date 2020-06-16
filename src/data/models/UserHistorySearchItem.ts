import { SearchResultEnum } from '~/components/modules/Search/Search.types';

import { SiteLink } from './SiteLink';
import { SiteSearchResultActionLink } from './SiteSearchResultActionLink';
import { SiteSearchResultImageItem } from './SiteSearchResultImageItem';
import { SiteSearchResultTextItem } from './SiteSearchResultTextItem';

export interface UserHistorySearchItem {
  detailLabel?: string | null;
  label: string;
  link: SiteLink;
}

export function fromUserHistorySearchItemToSiteSearchResultTextItem(
  obj: UserHistorySearchItem,
): SiteSearchResultTextItem {
  return {
    action: {
      type: 'SiteSearchResultActionLink',
      link: obj.link,
    } as SiteSearchResultActionLink,
    detailLabel: obj.detailLabel ?? null,
    label: obj.label,
    labelSegments: [],
    type: 'SiteSearchResultTextItem',
  };
}

export function fromSiteSearchResultTextItemToUserHistorySearchItem(
  obj: SiteSearchResultTextItem | SiteSearchResultImageItem,
): UserHistorySearchItem | null {
  // If the result doesn't have a link, don't save it to past searches.
  if (!('link' in obj.action)) {
    return null;
  }

  if (obj.type === SearchResultEnum.TEXT) {
    return {
      label: obj.label,
      detailLabel: obj.detailLabel,
      link: obj.action.link,
    };
  }
  if (obj.type === SearchResultEnum.IMAGE) {
    return {
      label: obj.image.altText,
      link: obj.action.link,
    };
  }

  return null;
}
