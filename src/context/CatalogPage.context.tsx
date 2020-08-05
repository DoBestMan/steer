import { ReactNode, useState } from 'react';

import { SiteCatalogProductItem } from '~/data/models/SiteCatalogProductItem';
import { createContext } from '~/lib/utils/context';

export interface CatalogPageContextProps {
  displayedProducts: SiteCatalogProductItem[];
  handleUpdateResults: (
    filters: Record<string, string>,
    withoutScroll?: boolean,
  ) => void;
  isAdvancedView: boolean;
  isLoading: boolean;
  setDisplayedProducts(products: SiteCatalogProductItem[]): void;
  setIsAdvancedView(isAdvancedView: boolean): void;
  setIsLoading(isLoading: boolean): void;
}

interface SetupProps {
  handleUpdateFilters: (
    filters: Record<string, string>,
    withoutScroll?: boolean,
  ) => void;
}

const CatalogPageContext = createContext<CatalogPageContextProps>();

function useContextSetup({ handleUpdateFilters }: SetupProps) {
  const [isAdvancedView, setIsAdvancedView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [displayedProducts, setDisplayedProducts] = useState<
    SiteCatalogProductItem[]
  >([]);

  const handleUpdateResults = async (
    filters: Record<string, string>,
    withoutScroll?: boolean,
  ) => {
    setIsLoading(true);
    await handleUpdateFilters(filters, withoutScroll);
    setDisplayedProducts([]);
    setIsLoading(false);
  };

  return {
    displayedProducts,
    handleUpdateResults,
    isAdvancedView,
    isLoading,
    setDisplayedProducts,
    setIsAdvancedView,
    setIsLoading,
  };
}

interface Props {
  children: ReactNode;
  handleUpdateFilters: (
    filters: Record<string, string>,
    withoutScroll?: boolean,
  ) => void;
}

export function CatalogPageContextProvider({
  children,
  handleUpdateFilters,
}: Props) {
  const value = useContextSetup({
    handleUpdateFilters,
  });

  return (
    <CatalogPageContext.Provider value={value}>
      {children}
    </CatalogPageContext.Provider>
  );
}

export const useCatalogPageContext = CatalogPageContext.useContext;
