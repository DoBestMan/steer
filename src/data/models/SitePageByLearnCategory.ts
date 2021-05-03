import { SiteHeaderModule } from '~/data/models/SiteHeaderModule';
import { SiteLinkWithLabel } from '~/data/models/SiteLinkWithLabel';
import { OpenTemplateModules } from '~/data/models/SiteOpenTemplate';
import { SitePageMetadata } from '~/data/models/SitePageMetadata';

export interface SitePageByLearnCategoryResponse {
  header: SiteHeaderModule;
  metadata: SitePageMetadata;
  modules?: Array<OpenTemplateModules>;
  quickLinks: SiteLinkWithLabel[];
}
