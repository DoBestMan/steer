import { SiteImage } from './SiteImage';
import { SiteSearchResultAction } from './SiteSearchResultAction';

export interface SiteSearchResultImageItem {
  action: SiteSearchResultAction;
  image: SiteImage;
  type: 'SiteSearchResultImageItem';
}
