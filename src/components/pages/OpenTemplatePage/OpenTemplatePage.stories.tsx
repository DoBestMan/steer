import { GlobalsContextProvider } from '~/context/Globals.context';

import { headerArticleMock } from './mock-data/HeaderArticleMock.story.mock';
import { headerLandingMock } from './mock-data/HeaderLandingMock.story.mock';
import OpenTemplatePage from './OpenTemplatePage';

export default {
  component: OpenTemplatePage,
  title: 'OpenTemplate/OpenTemplatePage',
};

export function AllModulesWithHeaderLandingPage() {
  return (
    <GlobalsContextProvider value={{ hostUrl: null }}>
      {/* Template: HeaderLandingPage */}
      <OpenTemplatePage pageData={headerLandingMock} />
    </GlobalsContextProvider>
  );
}

export function AllModulesWithHeaderArticlePage() {
  return (
    <GlobalsContextProvider value={{ hostUrl: null }}>
      {/* Template: HeaderArticlePage */}
      <OpenTemplatePage pageData={headerArticleMock} />
    </GlobalsContextProvider>
  );
}
