import Router, { useRouter } from 'next/router';
import queryString, { ParsedQuery } from 'query-string';
import { ParsedUrlQuery } from 'querystring';
import { ReactNode, useCallback, useEffect, useState } from 'react';

import { useSearchContext } from '~/components/modules/Search/Search.context';
import { useSearchModalContext } from '~/components/modules/Search/SearchModal.context';
import { useUserPersonalizationContext } from '~/context/UserPersonalization.context';
import { VehicleMetadata } from '~/data/models/VehicleMetadata';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';
import { createContext } from '~/lib/utils/context';
import { getLegacyCheckoutURL } from '~/lib/utils/legacy-routes';
import {
  getParsedHash,
  getStringifiedParams,
  interpolateRoute,
} from '~/lib/utils/routes';
import { appendTiresToString } from '~/lib/utils/string';

import { ProductDetailResponse } from './ProductDetail.container';

const CONSTANTS = {
  PRODUCT_DETAIL_ROUTE: ROUTE_MAP[ROUTES.PRODUCT_DETAIL],
  PLA_ROUTE: ROUTE_MAP[ROUTES.PRODUCT_DETAIL_PLA],
};

interface Props {
  children: ReactNode;
  serverData: ProductDetailResponse;
}

interface Quantity {
  front: number;
  rear?: number;
}

export interface ProductDetailContextProps {
  addToCart: ({ shouldAddCoverage }: { shouldAddCoverage: boolean }) => void;
  changeSize: (value: string) => void;
  data: ProductDetailResponse | null;
  isLoading: boolean;
  quantity: Quantity;
  queryParams: Record<string, string>;
  searchForVehicle: () => void;
  setData: (_: ProductDetailResponse) => void;
  setIsLoading: (_: boolean) => void;
  setQuantity: (_: Quantity) => void;
}

const ProductDetailContext = createContext<ProductDetailContextProps>();

function getQueryParams({
  hashParams,
  queryParams,
  vehicle,
}: {
  hashParams: ParsedQuery | null;
  queryParams: ParsedUrlQuery;
  vehicle: VehicleMetadata | null;
}) {
  return getStringifiedParams({
    ...queryParams,
    ...hashParams,
    ...vehicle,
  });
}

function useContextSetup({
  serverData,
}: {
  serverData: ProductDetailResponse;
}): ProductDetailContextProps {
  const { userPersonalizationData } = useUserPersonalizationContext();
  const [data, setData] = useState<ProductDetailResponse | null>(serverData);
  const router = useRouter();
  const { vehicle } = useUserPersonalizationContext();
  const { query, asPath } = router;
  const [quantity, setQuantity] = useState<{ front: number; rear?: number }>({
    front: 0,
    rear: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [hashParams, setHashParams] = useState(getParsedHash(asPath));
  const queryParams = getQueryParams({
    hashParams,
    queryParams: query,
    vehicle,
  });
  const isPLA = !!router.pathname.match(CONSTANTS.PLA_ROUTE);

  const {
    lockSearchStateToVehicle,
    setShouldPreventLinkNavigation,
  } = useSearchContext();
  const { setIsSearchOpen } = useSearchModalContext();

  const searchForVehicle = useCallback(() => {
    lockSearchStateToVehicle();
    setShouldPreventLinkNavigation(true);
    setIsSearchOpen(true);
  }, [
    lockSearchStateToVehicle,
    setShouldPreventLinkNavigation,
    setIsSearchOpen,
  ]);

  const onHashChange = useCallback(
    (url) => {
      const newHashParams = getParsedHash(url);
      setHashParams(newHashParams);

      window.scrollTo({
        top: 0,
      });
    },
    [setHashParams],
  );

  useEffect(() => {
    Router.events.on('hashChangeComplete', onHashChange);

    return () => {
      Router.events.off('hashChangeComplete', onHashChange);
    };
  }, [onHashChange]);

  useEffect(() => {
    setHashParams(getParsedHash(asPath));
  }, [asPath]);

  const addToCart = useCallback(
    ({ shouldAddCoverage }: { shouldAddCoverage: boolean }) => {
      if (!data || !data.siteProduct.siteProductLineSizeDetail) {
        return;
      }

      // TODO: Replace front and rear by product IDs
      const checkoutURL = getLegacyCheckoutURL({
        front: '10309',
        quantity,
        rear: data.siteProduct.siteProductLineRearSizeDetail
          ? '106519'
          : undefined,
        roadHazard: shouldAddCoverage,
        userZip: userPersonalizationData?.userLocation?.zip || undefined,
      });

      window.location.href = checkoutURL;
    },
    [data, quantity, userPersonalizationData],
  );

  const changeSize = useCallback(
    (value) => {
      setIsLoading(true);
      const interpolatedRoute = interpolateRoute(
        CONSTANTS.PRODUCT_DETAIL_ROUTE,
        {
          ...queryParams,
          ...(isPLA && { brand: appendTiresToString(router.query.brand) }),
        },
      );
      const querystring = queryString.stringify({
        ...hashParams,
        tireSize: value,
        rearSize: undefined,
      });

      router.push(
        `${CONSTANTS.PRODUCT_DETAIL_ROUTE}#${querystring}`,
        `${interpolatedRoute}#${querystring}`,
      );
    },
    [isPLA, queryParams, router, hashParams, setIsLoading],
  );

  return {
    addToCart,
    changeSize,
    data,
    isLoading,
    quantity,
    queryParams,
    searchForVehicle,
    setData,
    setIsLoading,
    setQuantity,
  };
}

export function ProductDetailContextProvider({ children, serverData }: Props) {
  const value = useContextSetup({ serverData });

  return (
    <ProductDetailContext.Provider value={value}>
      {children}
    </ProductDetailContext.Provider>
  );
}

export const useProductDetailContext = ProductDetailContext.useContext;
