import { ReactNode, useCallback, useState } from 'react';

import { useSearchContext } from '~/components/modules/Search/Search.context';
import { createContext } from '~/lib/utils/context';

interface Props {
  children: ReactNode;
}

export interface ProductDetailContextProps {
  addToCart: ({ shouldAddCoverage }: { shouldAddCoverage: boolean }) => void;
  quantity: {
    front: number;
    rear?: number;
  };
  searchForVehicle: () => void;
  setQuantity: (values: { front: number; rear?: number }) => void;
}

const ProductDetailContext = createContext<ProductDetailContextProps>();

function useContextSetup(): ProductDetailContextProps {
  const [quantity, setQuantity] = useState<{ front: number; rear?: number }>({
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

  function addToCart({ shouldAddCoverage }: { shouldAddCoverage: boolean }) {
    // TODO: Integrate [WCS-1014]
    alert(`Add to cart: Coverage? ${shouldAddCoverage.toString()}`);
  }

  return {
    addToCart,
    quantity,
    searchForVehicle,
    setQuantity,
  };
}

export function ProductDetailContextProvider({ children }: Props) {
  const value = useContextSetup();

  return (
    <ProductDetailContext.Provider value={value}>
      {children}
    </ProductDetailContext.Provider>
  );
}

export const useProductDetailContext = ProductDetailContext.useContext;
