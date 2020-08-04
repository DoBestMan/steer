import { Props as HeaderArticlePageProps } from '~/components/global/HeaderArticlePage/HeaderArticlePage';
import { HeaderLandingPageProps } from '~/components/global/HeaderLandingPage/HeaderLandingPage';

export type SiteHeaderTypes =
  | 'SiteModuleHeaderArticle'
  | 'SiteModuleHeaderLanding';

export interface SiteHeaderLandingPage extends HeaderLandingPageProps {
  type: SiteHeaderTypes;
}

export interface SiteHeaderArticlePage extends HeaderArticlePageProps {
  type: SiteHeaderTypes;
}

export type SiteHeaderModule = SiteHeaderLandingPage | SiteHeaderArticlePage;
