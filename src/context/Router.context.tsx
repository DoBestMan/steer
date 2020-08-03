import { NextRouter, useRouter } from 'next/router';
import { ReactNode, useCallback, useEffect, useState } from 'react';

import { CATALOG_ROUTES, ROUTE_MAP, ROUTES } from '~/lib/constants/';
import { eventEmitters } from '~/lib/events/emitters';
import { createContext } from '~/lib/utils/context';
import { isInRouteList } from '~/lib/utils/routes';

export interface RouterContextProps {
  isInRouteTransition: boolean;
  isRouteLoading: boolean;
  prevRoute: string;
  prevUrl: string;
  router: NextRouter;
  skipPageTransition: boolean;
}

const RouterContext = createContext<RouterContextProps>();

function useRouterContextSetup() {
  const router = useRouter();
  const { asPath } = router;

  const [prevUrl, setPrevUrl] = useState<string>(ROUTE_MAP[ROUTES.HOME]);
  const [prevRoute, setPrevRoute] = useState<string>(ROUTE_MAP[ROUTES.HOME]);

  // The url of the next page that is loading
  const [nextUrl, setNextUrl] = useState(asPath);
  // Used for showing the route change LoadingBar
  const [isRouteLoading, setIsRouteLoading] = useState(false);
  const [skipPageTransition, setSkipPageTransition] = useState(false);

  const savePrevUrl = useCallback(() => {
    setPrevUrl(router.asPath);
    setPrevRoute(router.pathname);
  }, [router, setPrevUrl, setPrevRoute]);

  useEffect(() => {
    const handleRouteChangeStart = (url: string) => {
      // Route change has begun. Show the loading bar
      setIsRouteLoading(true);

      // Update next url. This causes the page transition to start.
      setNextUrl(url);
    };
    const handleBeforeHistoryChange = () => {
      // Next route has loaded, hide the loading bar
      setIsRouteLoading(false);

      // Save the previous url and route
      savePrevUrl();
    };
    const handleRouteChangeComplete = () => {
      // Route change complete, reset the skipPageTransition state
      setSkipPageTransition(false);
    };
    const handleRouteChangeError = () => {
      // If there is an error, hide the loading bar
      setIsRouteLoading(false);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('beforeHistoryChange', handleBeforeHistoryChange);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeError);

    // Callback when traversing the `history` stack
    router.beforePopState(({ url, options }) => {
      // Reset Catalog Search state
      // Ignore `shallow` route changes, as these signify non-Search route
      // updates, e.g. filter changes or pagination
      if (isInRouteList(url, CATALOG_ROUTES) && !options.shallow) {
        eventEmitters.newCatalogSearchQuery.emit({ comesFromSearch: false });
      }
      return true;
    });

    // Skip page transitions in the Catalog (has it's own loading state)
    const handleSkipPageTransition = () => setSkipPageTransition(true);
    eventEmitters.newCatalogSearchQuery.on(handleSkipPageTransition);

    return () => {
      router.beforePopState(() => true);
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('beforeHistoryChange', handleBeforeHistoryChange);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeError);
      eventEmitters.newCatalogSearchQuery.off(handleSkipPageTransition);
    };
  });

  return {
    isInRouteTransition: nextUrl !== asPath && !skipPageTransition,
    isRouteLoading,
    prevRoute,
    prevUrl,
    router,
    skipPageTransition,
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
