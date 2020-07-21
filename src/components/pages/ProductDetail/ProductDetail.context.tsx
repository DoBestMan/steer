import { ReactNode, useState } from 'react';

import { createContext } from '~/lib/utils/context';

interface Props {
  children: ReactNode;
}

export interface ProductDetailContextProps {
  quantity: {
    front: number;
    rear?: number;
  };
  setQuantity: (values: { front: number; rear?: number }) => void;
}

const ProductDetailContext = createContext<ProductDetailContextProps>();

function useContextSetup() {
  const [quantity, setQuantity] = useState<{ front: number; rear?: number }>({
    front: 0,
    rear: 0,
  });

  return {
    quantity,
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
