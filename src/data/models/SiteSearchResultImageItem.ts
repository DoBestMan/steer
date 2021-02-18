import { SiteImage } from './SiteImage';
import { SiteSearchResultAction } from './SiteSearchResultAction';

export interface SiteSearchResultImageItem {
  action: SiteSearchResultAction;
  detailLabel?: string;
  image: SiteImage;
  label?: string;
  type: 'SiteSearchResultImageItem';
}
