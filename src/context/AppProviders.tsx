import { ReactNode } from 'react';

import { SearchContextProvider } from '~/components/modules/Search/Search.context';
import { SearchModalContextProvider } from '~/components/modules/Search/SearchModal.context';
import { SiteGlobals } from '~/data/models/SiteGlobals';
import { SiteMenu } from '~/data/models/SiteMenu';

import { FooterContextProvider } from './Footer.context';
import { GlobalsContextProvider } from './Globals.context';
import { GlobalToastContextProvider } from './GlobalToast.context';
import { ModalContextProvider } from './Modal.context';
import { RouterContextProvider } from './Router.context';
import { SiteGlobalsContextProvider } from './SiteGlobals.context';
import { SiteMenuContextProvider } from './SiteMenu.context';
import { UserPersonalizationContextProvider } from './UserPersonalization.context';

interface Props {
  children: ReactNode;
  hostUrl?: string | null;
  siteGlobalsContextValue?: SiteGlobals;
  siteMenuContextValue?: SiteMenu;
}

// Container to wrap _app.tsx in context providers.
// Not all providers need to go here; only ones used throughout the app
function AppProviders({
  children,
  hostUrl,
  siteGlobalsContextValue,
  siteMenuContextValue,
}: Props) {
  return (
    <GlobalsContextProvider value={{ hostUrl }}>
      <SiteGlobalsContextProvider value={siteGlobalsContextValue}>
        <SiteMenuContextProvider value={siteMenuContextValue}>
          <UserPersonalizationContextProvider>
            <FooterContextProvider>
              <SearchContextProvider>
                <SearchModalContextProvider>
                  <GlobalToastContextProvider>
                    <RouterContextProvider>
                      <ModalContextProvider>{children}</ModalContextProvider>
                    </RouterContextProvider>
                  </GlobalToastContextProvider>
                </SearchModalContextProvider>
              </SearchContextProvider>
            </FooterContextProvider>
          </UserPersonalizationContextProvider>
        </SiteMenuContextProvider>
      </SiteGlobalsContextProvider>
    </GlobalsContextProvider>
  );
}

export default AppProviders;
