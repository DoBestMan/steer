import { GlobalsContextProvider } from '~/context/Globals.context';

import { headerArticleData } from './mock-data/HeaderArticleData.story.mock';
import { headerLandingData } from './mock-data/HeaderLandingData.story.mock';
import OpenTemplatePage from './OpenTemplatePage';

export default {
  component: OpenTemplatePage,
  title: 'OpenTemplate/OpenTemplatePage',
};

export function AllModulesWithHeaderLandingPage() {
  return (
    <GlobalsContextProvider value={{ hostUrl: null }}>
      {/* Template: HeaderLandingPage */}
      <OpenTemplatePage pageData={headerLandingData} />
    </GlobalsContextProvider>
  );
}

export function AllModulesWithHeaderArticlePage() {
  return (
    <GlobalsContextProvider value={{ hostUrl: null }}>
      {/* Template: HeaderArticlePage */}
      <OpenTemplatePage pageData={headerArticleData} />
    </GlobalsContextProvider>
  );
}
