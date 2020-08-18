import { SiteCatalogProductItem } from './SiteCatalogProductItem';
import { SiteIcon } from './SiteIcon';
import { SiteImage } from './SiteImage';

export enum SiteCatalogProductGroupItemEnum {
  SiteCatalogProductGroupItem = 'SiteCatalogProductGroupItem',
}

export interface SiteCatalogProductGroupItem {
  description: string;
  icon: SiteImage | SiteIcon | null;
  id: string;
  name: string;
  productList: SiteCatalogProductItem[];
  siteQueryParams: Record<string, string> | null;
  type: SiteCatalogProductGroupItemEnum;
}

export type SiteCatalogProductGroupList = Array<SiteCatalogProductGroupItem>;
