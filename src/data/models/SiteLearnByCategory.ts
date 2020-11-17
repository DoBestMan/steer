import { SiteHeaderModule } from '~/data/models/SiteHeaderModule';

import { ListResultMetadata } from './ListResultMetadata';
import { SiteArticle, SiteArticleFeatured } from './SiteArticle';
import { SiteModuleBreadcrumbsItem } from './SiteModules';
import { SitePageMetadata } from './SitePageMetadata';

export interface SiteLearnByCategory {
  header: SiteHeaderModule;
  metadata: SitePageMetadata;
  breadcrumbs: Array<SiteModuleBreadcrumbsItem>;
  articlesPaginationMetaData: ListResultMetadata;
  topArticles?: Array<SiteArticleFeatured>;
  articles: Array<SiteArticle>;
}
