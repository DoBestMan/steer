import { SiteHeaderModule } from '~/data/models/SiteHeaderModule';
import {
  SiteModuleAccordion,
  SiteModuleArticleListWithFeatured,
  SiteModuleBreadcrumbsItem,
  SiteModuleButtonGrid,
  SiteModuleDataTableVertical,
  SiteModuleGoogleForm,
  SiteModuleGraphicGrid,
  SiteModuleImage,
  SiteModuleLinkList,
  SiteModuleMailingListSignUp,
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
  | SiteModuleGoogleForm
  | SiteModuleGraphicGrid
  | SiteModuleImage
  | SiteModuleLinkList
  | SiteModuleMarkdown
  | SiteModuleQuote
  | SiteModuleReviews
  | SiteModuleTextList
  | SiteModuleYouTubeVideo
  | SiteModuleDataTableVertical
  | SiteModuleButtonGrid
  | SiteModuleMailingListSignUp;

export interface PageData {
  slugUrl?: string;
  basePath?: string;
  isBasePath?: boolean;
  breadcrumbs?: SiteModuleBreadcrumbsItem[];
  header: SiteHeaderModule;
  metadata?: SitePageMetadata;
  modules?: Array<OpenTemplateModules>;
}
