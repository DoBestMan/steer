import { NextRouter, useRouter } from 'next/router';
import { ReactNode, useCallback, useEffect, useState } from 'react';

import { ROUTE_MAP, ROUTES } from '~/lib/constants/';
import { createContext } from '~/lib/utils/context';

export interface RouterContextProps {
  prevRoute: string;
  prevUrl: string;
  router: NextRouter;
}

const RouterContext = createContext<RouterContextProps>();

function useRouterContextSetup() {
  const [prevUrl, setPrevUrl] = useState<string>(ROUTE_MAP[ROUTES.HOME]);
  const [prevRoute, setPrevRoute] = useState<string>(ROUTE_MAP[ROUTES.HOME]);

  const router = useRouter();

  const savePrevUrl = useCallback(() => {
    setPrevUrl(router.asPath);
    setPrevRoute(router.pathname);
  }, [router, setPrevUrl, setPrevRoute]);

  useEffect(() => {
    router.events.on('beforeHistoryChange', savePrevUrl);

    return () => {
      router.events.off('beforeHistoryChange', savePrevUrl);
    };
  }, [router, savePrevUrl]);

  return {
    prevUrl,
    prevRoute,
    router,
  };
}

interface Props {
  children: ReactNode;
}

export function RouterContextProvider({ children }: Props) {
  const value = useRouterContextSetup();
  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
}

export const useRouterContext = RouterContext.useContext;
