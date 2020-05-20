import { ReactNode } from 'react';

import { SearchContextProvider } from '~/components/modules/Search/Search.context';
import { SiteGlobals } from '~/data/models/SiteGlobals';
import { SiteMenu } from '~/data/models/SiteMenu';

import { SiteGlobalsContextProvider } from './SiteGlobals.context';
import { SiteMenuContextProvider } from './SiteMenu.context';
import { UserPersonalizationContextProvider } from './UserPersonalization.context';

interface Props {
  children: ReactNode;
  siteGlobalsContextValue: SiteGlobals;
  siteMenuContextValue: SiteMenu;
}

// Container to wrap _app.tsx in context providers.
// Not all providers need to go here; only ones used throughout the app
function AppProviders({
  children,
  siteGlobalsContextValue,
  siteMenuContextValue,
}: Props) {
  return (
    <SiteGlobalsContextProvider value={siteGlobalsContextValue}>
      <SiteMenuContextProvider value={siteMenuContextValue}>
        <UserPersonalizationContextProvider>
          <SearchContextProvider>{children}</SearchContextProvider>
        </UserPersonalizationContextProvider>
      </SiteMenuContextProvider>
    </SiteGlobalsContextProvider>
  );
}

export default AppProviders;
