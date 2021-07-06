import format from 'date-fns/format';
import { NextRouter, useRouter } from 'next/router';
import { setCookie } from 'nookies';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';

import { useSearchModalContext } from '~/components/modules/Search/SearchModal.context';
import { useSiteGlobalsContext } from '~/context/SiteGlobals.context';
import useIsClient from '~/hooks/useIsClient';
import { apiGetSiteBrandDetails } from '~/lib/api/brand-details';
import { apiCjToSetCookie } from '~/lib/api/cj';
import { apiGetProductDetail } from '~/lib/api/product-detail';
import {
  CATALOG_ROUTES,
  ROUTE_MAP,
  ROUTE_TYPE_MAP,
  ROUTES,
} from '~/lib/constants/';
import { LOCAL_STORAGE, PROPERTIES } from '~/lib/constants/localStorage';
import { eventEmitters } from '~/lib/events/emitters';
import GA from '~/lib/helpers/analytics';
import { createContext } from '~/lib/utils/context';
import { getStringifiedParams, isInRouteList } from '~/lib/utils/routes';
import {
  camelToKey,
  keyToKebab,
  removeTireFromQueryParam,
} from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';

const routeRegexMap: Record<string, RegExp> = {};
Object.values(ROUTE_MAP).forEach((route) => {
  routeRegexMap[route] = new RegExp(
    `^${route.replace(/\[\w+\]/g, '[\\w-]+')}(#.*)?$`,
  );
});

export interface RouterContextProps {
  isInRouteTransition: boolean;
  isRouteLoading: boolean;
  prevRoute: string;
  prevUrl: string;
  priceDisplayInAddtoCart: boolean;
  router: NextRouter;
  setContainerEl(containerEl: HTMLDivElement): void;
  setInitTransitionState(initTransitionState: boolean): void;
  setIsRouteLoading(isRouteLoading: boolean): void;
  skipPageTransition: boolean;
}

const RouterContext = createContext<RouterContextProps>();
const COOKIE_CONSTANT = {
  COOKIE_NAME: 'catalogURLCookie',
  DOMAIN: '.simpletire.com',
};

function useRouterContextSetup() {
  const router = useRouter();
  const { asPath } = router;
  const { priceDisplayInAddtoCart } = useSiteGlobalsContext();
  const [prevUrl, setPrevUrl] = useState<string>(ROUTE_MAP[ROUTES.HOME]);
  const [prevRoute, setPrevRoute] = useState<string>(ROUTE_MAP[ROUTES.HOME]);

  const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null);

  // The url of the next page that is loading
  const [nextUrl, setNextUrl] = useState(asPath);
  // Used for showing the route change LoadingBar
  const [isRouteLoading, setIsRouteLoading] = useState(false);
  const [skipPageTransition, setSkipPageTransition] = useState(false);
  const [initTransitionState, setInitTransitionState] = useState(false);

  const { isSearchOpen } = useSearchModalContext();
  const { isClient } = useIsClient();

  const setCjCookie = async (cjevent: string) => {
    return await apiCjToSetCookie(cjevent);
  };
  if (
    router.pathname === ROUTE_MAP[ROUTES.VEHICLE_CATALOG] ||
    router.pathname === ROUTE_MAP[ROUTES.TIRE_SIZE_CATALOG_OR_CATEGORY]
  ) {
    const cookies = new Cookies();
    const catalogURL = isClient && window.location.href;
    if (cookies.get(COOKIE_CONSTANT.COOKIE_NAME) !== catalogURL.toString()) {
      // setting a Client side cookie for catalogURLCookie.
      setCookie(null, COOKIE_CONSTANT.COOKIE_NAME, catalogURL.toString(), {
        maxAge: 86400 * 30,
        path: '/',
        secure: false,
        domain: COOKIE_CONSTANT.DOMAIN,
      });
    }
  }
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

    eventEmitters.setNavVisibility.emit({ isVisible: true });

    // Save the previous url and route
    savePrevUrl();
  }, [savePrevUrl]);

  const handleRouteChangeComplete = useCallback(() => {
    // Route change complete, reset the skipPageTransition state
    setSkipPageTransition(false);

    // Programmatically set focus to app container
    if (!isCatalogTransition) {
      containerEl?.focus();
    }
  }, [containerEl, isCatalogTransition, setSkipPageTransition]);

  const fetchProductDetails = useCallback(async () => {
    const [pathname] = asPath.split('?');
    const dateFormat = 'MMMM d, yyyy';

    if (
      pathname.match(
        routeRegexMap[ROUTE_TYPE_MAP[ROUTES.PRODUCT_DETAIL_PLA]],
      ) ||
      pathname.match(routeRegexMap[ROUTE_TYPE_MAP[ROUTES.PRODUCT_DETAIL]])
    ) {
      const queryParams = getStringifiedParams(router.query);
      const { brand, productLine } = queryParams;
      const brandName = removeTireFromQueryParam(brand);

      if (!brand || !productLine) {
        return;
      }

      const siteProduct = await apiGetProductDetail({
        brand: brandName,
        productLine,
        query: {},
      });
      if (siteProduct.isSuccess) {
        const categorySpec = siteProduct.data.siteProductSpecs.find(
          (spec) => spec.name === 'Category',
        );
        const subtypeSpec = siteProduct.data.siteProductSpecs.find(
          (spec) => spec.name === 'Vehicle',
        );
        const category = categorySpec ? categorySpec.values.toString() : '';
        const subtype = subtypeSpec ? subtypeSpec.values.toString() : '';

        window.localStorage.setItem(
          LOCAL_STORAGE[PROPERTIES.PRODUCT_DETAILS],
          JSON.stringify({
            brand: brandName,
            brandTire: siteProduct.data.siteProductLine.brandTire,
            category,
            date: format(new Date(), dateFormat),
            subtype,
          }),
        );
      }
    } else if (
      pathname.match(routeRegexMap[ROUTE_TYPE_MAP[ROUTES.BRAND_DETAIL]])
    ) {
      const { brand } = getStringifiedParams(router.query);
      const brandName = removeTireFromQueryParam(brand);

      if (!brand) {
        return;
      }

      const siteBrandDetails = await apiGetSiteBrandDetails(brandName);
      if (siteBrandDetails.isSuccess) {
        window.localStorage.setItem(
          LOCAL_STORAGE[PROPERTIES.PRODUCT_DETAILS],
          JSON.stringify({
            brand: brandName,
            brandTire: siteBrandDetails.data.brandTire,
            category: '',
            date: format(new Date(), dateFormat),
            subtype: '',
          }),
        );
      }
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  useEffect(() => {
    if (router.pathname === ROUTE_MAP[ROUTES.PRODUCT_DETAIL]) {
      setNextUrl(router.asPath);
    }
    const { cjevent } = router.query;

    if (cjevent && typeof cjevent === 'string') {
      setCjCookie(cjevent);
    }
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
  }, [
    router,
    handleBeforeHistoryChange,
    handleRouteChangeComplete,
    isSearchOpen,
  ]);

  useEffect(() => {
    const [pathname] = asPath.split('?');
    let as: string | null = null;

    Object.keys(routeRegexMap).some((route) => {
      const regex = routeRegexMap[route];
      const match = pathname.match(regex);
      if (match && route !== ROUTE_TYPE_MAP[ROUTES.OPEN_TEMPLATE]) {
        as = route;
        return true;
      }
      return false;
    });

    if (as) {
      let routeName = Object.keys(ROUTE_MAP).find(
        (type) => ROUTE_MAP[type] === as,
      );

      // PDP and PLP pages have the same url
      // The difference is PDP has queries in the url
      if (routeName === ROUTES.PRODUCT_DETAIL && !asPath.includes('#')) {
        routeName = ROUTES.PRODUCT_LINE;
      }

      if (routeName) {
        let pageType = keyToKebab(camelToKey(routeName));
        if (routeName === ROUTES.PRODUCT_DETAIL_PLA) {
          // Paid PDP page
          pageType = ui('common.paidPDP');
        }

        GA.addToDataLayer({
          event: 'PageType',
          pageType,
        });
      }
    }
  }, [asPath]);

  return {
    isInRouteTransition:
      (nextUrl !== asPath && !skipPageTransition) || initTransitionState,
    isRouteLoading,
    prevRoute,
    prevUrl,
    priceDisplayInAddtoCart,
    router,
    setContainerEl,
    setInitTransitionState,
    setIsRouteLoading,
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
