import { SiteMenuBrowseItem } from './SiteMenuBrowseItem';
import { SiteMenuLearn } from './SiteMenuLearn';

export interface SiteMenu {
  siteMenuBrowseList: SiteMenuBrowseItem[];
  siteMenuLearn: SiteMenuLearn;
}
