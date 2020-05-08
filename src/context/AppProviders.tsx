import { ReactNode } from 'react';

import { SiteGlobals } from '~/data/models/SiteGlobals';

import { SiteGlobalsContextProvider } from './SiteGlobals.context';

interface Props {
  children: ReactNode;
  siteGlobalsContextValue: SiteGlobals;
}

// Container to wrap _app.tsx in context providers.
// Not all providers need to go here; only ones used throughout the app
function AppProviders({ children, siteGlobalsContextValue }: Props) {
  return (
    <SiteGlobalsContextProvider value={siteGlobalsContextValue}>
      {children}
    </SiteGlobalsContextProvider>
  );
}

export default AppProviders;
