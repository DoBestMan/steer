import { SiteHeaderModule } from '~/data/models/SiteHeaderModule';
import {
  SiteModuleAccordion,
  SiteModuleArticleListWithFeatured,
  SiteModuleBreadcrumbsItem,
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
  | SiteModuleYouTubeVideo;

export interface PageData {
  breadcrumbs?: SiteModuleBreadcrumbsItem[];
  header: SiteHeaderModule;
  metadata?: SitePageMetadata;
  modules?: Array<OpenTemplateModules>;
}
