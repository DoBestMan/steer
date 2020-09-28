import isStrictEqual from 'fast-deep-equal';
import { ReactNode, useState } from 'react';

import { SiteMenu } from '~/data/models/SiteMenu';
import { useApiDataWithDefault } from '~/hooks/useApiDataWithDefault';
import { eventEmitters } from '~/lib/events/emitters';
import { createContext } from '~/lib/utils/context';

const SiteMenuContext = createContext<SiteMenu>();

function useContextSetup(defaultData?: SiteMenu) {
  const [dataMenu, setDataMenu] = useState(defaultData);

  const { error } = useApiDataWithDefault({
    defaultData,
    endpoint: '/menu',
    includeUserRegion: true,
    includeUserZip: true,
    options: {
      // Avoid re-rendering SubNav if the data are the same
      onSuccess: (data) => {
        if (isStrictEqual(data, dataMenu)) {
          return;
        }

        setDataMenu({
          ...data,
        });
      },
    },
    revalidateEmitter: eventEmitters.userPersonalizationLocationUpdate,
  });

  if (error) {
    console.error(error);
  }

  // can't render app without localized or global menu data
  if (!defaultData && !dataMenu) {
    throw new Error(error?.message);
  }

  return dataMenu || defaultData;
}

interface Props {
  children: ReactNode;
  value?: SiteMenu;
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
