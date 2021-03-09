import { ReactNode } from 'react';

import { SiteGlobals } from '~/data/models/SiteGlobals';
import { useApiDataWithDefault } from '~/hooks/useApiDataWithDefault';
import { VIEWPORTS } from '~/lib/constants/viewport';
import { createContext } from '~/lib/utils/context';

// exported for testing
export const SiteGlobalsContext = createContext<SiteGlobals>();

const REFRESH_INTERVAL = 600_000; // 10 minutes

function useContextSetup(defaultData: { siteGlobals?: SiteGlobals }) {
  const {
    data: { siteGlobals },
    error,
  } = useApiDataWithDefault<{ siteGlobals?: SiteGlobals }>({
    defaultData,
    endpoint: '/globals',
    options: {
      refreshInterval: REFRESH_INTERVAL,
    },
  });

  if (error) {
    console.error(error);
  }

  return (
    siteGlobals || {
      customerServiceEnabled: false,
      priceDisplayInAddtoCart: true,
      customerServiceNumber: {
        display: '',
        value: '',
      },
      siteTheme: null,
    }
  );
}

interface Props {
  children: ReactNode;
  userAgentType?: string;
  value?: SiteGlobals;
}

export function SiteGlobalsContextProvider({
  children,
  userAgentType,
  value,
}: Props) {
  const providerValue = useContextSetup({ siteGlobals: value });
  const isDesktop = userAgentType === VIEWPORTS.DESKTOP;

  return (
    <SiteGlobalsContext.Provider
      value={{ ...providerValue, isDesktop, userAgentType }}
    >
      {children}
    </SiteGlobalsContext.Provider>
  );
}

export const useSiteGlobalsContext = SiteGlobalsContext.useContext;
