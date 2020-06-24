import { SiteCatalogProductItem } from './SiteCatalogProductItem';
import { SiteImage } from './SiteImage';

export interface SiteCatalogProductGroup {
  description: string;
  icon: SiteImage | null;
  id: string;
  name: string;
  productList: SiteCatalogProductItem[];
  siteQueryParams: Record<string, string> | null;
}

export type SiteCatalogProductGroupList = Array<SiteCatalogProductGroup>;
