import { SiteLink } from './SiteLink';
import { SiteSearchResultActionLink } from './SiteSearchResultActionLink';
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
  obj: SiteSearchResultTextItem,
): UserHistorySearchItem {
  return {
    label: obj.label,
    detailLabel: obj.detailLabel,
    link: (obj.action as SiteSearchResultActionLink).link,
  };
}
