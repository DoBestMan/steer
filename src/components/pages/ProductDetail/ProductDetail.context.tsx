import { ReactNode, useCallback, useState } from 'react';

import { useSearchContext } from '~/components/modules/Search/Search.context';
import { useUserPersonalizationContext } from '~/context/UserPersonalization.context';
import { createContext } from '~/lib/utils/context';
import { getLegacyCheckoutURL } from '~/lib/utils/legacy-routes';
import { ProductDetailResponse } from '~/pages/api/product-detail';

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
  data: ProductDetailResponse | null;
  quantity: Quantity;
  searchForVehicle: () => void;
  setData: (_: ProductDetailResponse) => void;
  setQuantity: (_: Quantity) => void;
}

const ProductDetailContext = createContext<ProductDetailContextProps>();

function useContextSetup({
  serverData,
}: {
  serverData: ProductDetailResponse;
}): ProductDetailContextProps {
  const { userPersonalizationData } = useUserPersonalizationContext();
  const [data, setData] = useState<ProductDetailResponse | null>(serverData);
  const [quantity, setQuantity] = useState<Quantity>({
    front: 0,
    rear: 0,
  });
  const {
    lockSearchStateToVehicle,
    setShouldPreventLinkNavigation,
    setIsSearchOpen,
  } = useSearchContext();

  const searchForVehicle = useCallback(() => {
    lockSearchStateToVehicle();
    setShouldPreventLinkNavigation(true);
    setIsSearchOpen(true);
  }, [
    lockSearchStateToVehicle,
    setShouldPreventLinkNavigation,
    setIsSearchOpen,
  ]);

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

  return {
    addToCart,
    data,
    quantity,
    searchForVehicle,
    setData,
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
