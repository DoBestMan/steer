import { SiteHeaderModule } from '~/data/models/SiteHeaderModule';
import {
  SiteModuleAccordion,
  SiteModuleArticleListWithFeatured,
  SiteModuleBreadcrumbsItem,
  SiteModuleDataTableVertical,
  SiteModuleGraphicGrid,
  SiteModuleImage,
  SiteModuleLinkList,
  SiteModuleMarkdown,
  SiteModuleQuote,
  SiteModuleReviews,
  SiteModuleTextList,
  SiteModuleYouTubeVideo,
} from '~/data/models/SiteModules';
import { SitePageMetadata } from '~/data/models/SitePageMetadata';

export type OpenTemplateModules =
  | SiteModuleAccordion
  | SiteModuleArticleListWithFeatured
  | SiteModuleGraphicGrid
  | SiteModuleImage
  | SiteModuleLinkList
  | SiteModuleMarkdown
  | SiteModuleQuote
  | SiteModuleReviews
  | SiteModuleTextList
  | SiteModuleYouTubeVideo
  | SiteModuleDataTableVertical;

export interface PageData {
  slugUrl?: string;
  basePath?: string;
  isBasePath?: boolean;
  breadcrumbs?: SiteModuleBreadcrumbsItem[];
  header: SiteHeaderModule;
  metadata?: SitePageMetadata;
  modules?: Array<OpenTemplateModules>;
}
