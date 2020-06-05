import { SiteSearchResultActionLink } from './SiteSearchResultActionLink';
import { SiteSearchResultActionQuery } from './SiteSearchResultActionQuery';

export type SiteSearchResultAction =
  | SiteSearchResultActionLink
  | SiteSearchResultActionQuery;
