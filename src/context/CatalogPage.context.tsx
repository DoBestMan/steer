import { ReactNode, useState } from 'react';

import { createContext } from '~/lib/utils/context';

export interface CatalogPageContextProps {
  handleUpdateResults: (filters: Record<string, string>) => void;
  isAdvancedView: boolean;
  isLoading: boolean;
  setIsAdvancedView(isAdvancedView: boolean): void;
  setIsLoading(isLoading: boolean): void;
  setShowCatalogGrid(showCatalogGrid: boolean): void;
  showCatalogGrid: boolean;
}

interface SetupProps {
  handleUpdateFilters: (filters: Record<string, string>) => void;
  showCatalogGridInit?: boolean;
}

const CatalogPageContext = createContext<CatalogPageContextProps>();

function useContextSetup({
  showCatalogGridInit = false,
  handleUpdateFilters,
}: SetupProps) {
  const [showCatalogGrid, setShowCatalogGrid] = useState(showCatalogGridInit);
  const [isAdvancedView, setIsAdvancedView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateResults = async (filters: Record<string, string>) => {
    setIsLoading(true);
    await handleUpdateFilters(filters);
    setIsLoading(false);
  };

  return {
    handleUpdateResults,
    isAdvancedView,
    isLoading,
    setIsAdvancedView,
    setIsLoading,
    setShowCatalogGrid,
    showCatalogGrid,
  };
}

interface Props {
  children: ReactNode;
  handleUpdateFilters: (filters: Record<string, string>) => void;
  showCatalogGridInit?: boolean;
}

export function CatalogPageContextProvider({
  children,
  handleUpdateFilters,
  showCatalogGridInit,
}: Props) {
  const value = useContextSetup({
    handleUpdateFilters,
    showCatalogGridInit,
  });

  return (
    <CatalogPageContext.Provider value={value}>
      {children}
    </CatalogPageContext.Provider>
  );
}

export const useCatalogPageContext = CatalogPageContext.useContext;
