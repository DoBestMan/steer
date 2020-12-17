import { SiteCatalogProducts } from '~/data/models/SiteCatalogProducts';
import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';
import { SiteSession } from '~/data/models/SiteSession';
import { Emitter } from '~/lib/utils/Emitter';

export interface CatalogPageData {
  serverData: {
    siteCatalogProducts: SiteCatalogProducts | null;
    siteCatalogSummary: SiteCatalogSummary;
  };
}

export interface CatalogApiArgs {
  defaultData: {
    siteCatalogProducts: SiteCatalogProducts | null;
    siteCatalogSummary: SiteCatalogSummary;
  };
  includeUserRegion: boolean;
  includeUserZip: boolean;
  query: Record<string, string>;
  revalidateEmitter: Emitter<null>;
  siteSession?: SiteSession;
}
