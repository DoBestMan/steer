import { SiteSearchResultImageItem } from './SiteSearchResultImageItem';
import { SiteSearchResultTextItem } from './SiteSearchResultTextItem';

export interface SiteSearchResultGroup {
  label: string;
  siteSearchResultList: (
    | SiteSearchResultImageItem
    | SiteSearchResultTextItem
  )[];
}
