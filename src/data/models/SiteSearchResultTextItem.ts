import { SiteSearchResultAction } from './SiteSearchResultAction';

export interface SiteSearchResultTextItem {
  action: SiteSearchResultAction;
  detailLabel: string | null;
  label: string;
  labelSegments: { label: string; matches: boolean }[];
  type: 'SiteSearchResultTextItem';
}
