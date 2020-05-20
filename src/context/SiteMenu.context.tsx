import { ReactNode, useEffect } from 'react';

import { SiteMenu } from '~/data/models/SiteMenu';
import { useApiDataWithDefault } from '~/hooks/useApiDataWithDefault';
import { eventEmitters } from '~/lib/events/emitters';
import { createContext } from '~/lib/utils/context';

const SiteMenuContext = createContext<SiteMenu>();

function useContextSetup(defaultData: SiteMenu) {
  const { data, error, revalidate } = useApiDataWithDefault<SiteMenu>({
    defaultData,
    endpoint: '/menu',
    includeUserRegion: true,
    includeUserZip: true,
  });

  if (error) {
    console.error(error);
  }

  useEffect(() => {
    eventEmitters.userPersonalizationLocationUpdate.on(revalidate);

    return () => {
      eventEmitters.userPersonalizationLocationUpdate.off(revalidate);
    };
  }, [revalidate]);

  return data;
}

interface Props {
  children: ReactNode;
  value: SiteMenu;
}

export function SiteMenuContextProvider({ children, value }: Props) {
  const providerValue = useContextSetup(value);
  return (
    <SiteMenuContext.Provider value={providerValue}>
      {children}
    </SiteMenuContext.Provider>
  );
}

export const useSiteMenuContext = SiteMenuContext.useContext;
