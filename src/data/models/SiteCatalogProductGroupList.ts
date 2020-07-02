import { SiteCatalogProductItem } from './SiteCatalogProductItem';
import { SiteImage } from './SiteImage';

export enum SiteCatalogProductGroupEnum {
  SiteCatalogProductGroup = 'SiteCatalogProductGroup',
}

export interface SiteCatalogProductGroup {
  description: string;
  icon: SiteImage | null;
  id: string;
  name: string;
  productList: SiteCatalogProductItem[];
  siteQueryParams: Record<string, string> | null;
  type: SiteCatalogProductGroupEnum;
}

export type SiteCatalogProductGroupList = Array<SiteCatalogProductGroup>;
