import { SiteHeaderModule } from '~/data/models/SiteHeaderModule';
import { SiteLinkWithLabel } from '~/data/models/SiteLinkWithLabel';
import { SiteModuleMarkdown } from '~/data/models/SiteModules';
import { SitePageMetadata } from '~/data/models/SitePageMetadata';

export interface SitePageByLearnCategoryResponse {
  content: SiteModuleMarkdown;
  header: SiteHeaderModule;
  metadata: SitePageMetadata;
  quickLinks: SiteLinkWithLabel[];
}
