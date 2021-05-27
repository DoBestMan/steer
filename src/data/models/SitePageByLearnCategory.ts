import { SiteHeaderModule } from '~/data/models/SiteHeaderModule';
import { SiteLinkWithLabel } from '~/data/models/SiteLinkWithLabel';
import { OpenTemplateModules } from '~/data/models/SiteOpenTemplate';
import { SitePageMetadata } from '~/data/models/SitePageMetadata';

import { SiteModuleBreadcrumbsItem } from './SiteModules';

export interface SitePageByLearnCategoryResponse {
  breadcrumbs?: SiteModuleBreadcrumbsItem[];
  header: SiteHeaderModule;
  metadata: SitePageMetadata;
  modules?: Array<OpenTemplateModules>;
  quickLinks: SiteLinkWithLabel[];
}
