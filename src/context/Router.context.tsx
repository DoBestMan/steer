import { NextRouter, useRouter } from 'next/router';
import { ReactNode, useCallback, useEffect, useState } from 'react';

import { useSearchModalContext } from '~/components/modules/Search/SearchModal.context';
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
  setContainerEl(containerEl: HTMLDivElement): void;
  skipPageTransition: boolean;
}

const RouterContext = createContext<RouterContextProps>();

function useRouterContextSetup() {
  const router = useRouter();
  const { asPath } = router;

  const [prevUrl, setPrevUrl] = useState<string>(ROUTE_MAP[ROUTES.HOME]);
  const [prevRoute, setPrevRoute] = useState<string>(ROUTE_MAP[ROUTES.HOME]);

  const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null);

  // The url of the next page that is loading
  const [nextUrl, setNextUrl] = useState(asPath);
  // Used for showing the route change LoadingBar
  const [isRouteLoading, setIsRouteLoading] = useState(false);
  const [skipPageTransition, setSkipPageTransition] = useState(false);

  const { isSearchOpen } = useSearchModalContext();

  // For now, the only scenario where the page transition is skipped is
  // the transition into and between Catalog pages
  const isCatalogTransition = skipPageTransition;

  const savePrevUrl = useCallback(() => {
    setPrevUrl(router.asPath);
    setPrevRoute(router.pathname);
  }, [router, setPrevUrl, setPrevRoute]);

  const handleBeforeHistoryChange = useCallback(() => {
    // Next route has loaded, hide the loading bar
    setIsRouteLoading(false);

    // Show the nav (unless it's a Catalog transition)
    if (!isCatalogTransition) {
      eventEmitters.setNavVisibility.emit({ isVisible: true });
    }

    // Save the previous url and route
    savePrevUrl();
  }, [isCatalogTransition, savePrevUrl]);

  const handleRouteChangeComplete = useCallback(() => {
    // Route change complete, reset the skipPageTransition state
    setSkipPageTransition(false);

    // Programmatically set focus to app container
    if (!isCatalogTransition) {
      containerEl?.focus();
    }
  }, [containerEl, isCatalogTransition, setSkipPageTransition]);

  useEffect(() => {
    const handleRouteChangeStart = (url: string) => {
      // Route change has begun. Show the loading bar
      setIsRouteLoading(true);

      // Update next url. This causes the page transition to start.
      setNextUrl(url);

      // Hide the nav
      eventEmitters.setNavVisibility.emit({ isVisible: false });
    };
    const handleRouteChangeError = () => {
      // If there is an error, hide the loading bar
      setIsRouteLoading(false);

      // Make sure Nav is visible
      eventEmitters.setNavVisibility.emit({ isVisible: true });
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('beforeHistoryChange', handleBeforeHistoryChange);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeError);

    // Callback when traversing the `history` stack
    router.beforePopState(({ url, options }) => {
      // Reset Catalog Search state, ignoring:
      // 1. `shallow` route changes, as these signify non-Search route
      //     updates, e.g. filter changes or pagination
      // 2. hitting back to close the search modal
      if (
        isInRouteList(url, CATALOG_ROUTES) &&
        !options.shallow &&
        !isSearchOpen
      ) {
        eventEmitters.newCatalogSearchQuery.emit({ comesFromSearch: false });
      }
      return true;
    });

    // Skip page transitions in the Catalog (has it's own loading state)
    const handleSkipPageTransition = () => setSkipPageTransition(true);
    eventEmitters.newCatalogSearchQuery.on(handleSkipPageTransition);
    eventEmitters.skipPageTransition.on(handleSkipPageTransition);

    return () => {
      router.beforePopState(() => true);
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('beforeHistoryChange', handleBeforeHistoryChange);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeError);
      eventEmitters.newCatalogSearchQuery.off(handleSkipPageTransition);
      eventEmitters.skipPageTransition.off(handleSkipPageTransition);
    };
  });

  return {
    isInRouteTransition: nextUrl !== asPath && !skipPageTransition,
    isRouteLoading,
    prevRoute,
    prevUrl,
    router,
    setContainerEl,
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
