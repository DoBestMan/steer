import { ReactNode, useState } from 'react';

import { createContext } from '~/lib/utils/context';

export interface CatalogPageContextProps {
  isAdvancedView: boolean;
  setIsAdvancedView(isAdvancedView: boolean): void;
  setShowCatalogGrid(showCatalogGrid: boolean): void;
  showCatalogGrid: boolean;
}

interface SetupProps {
  showCatalogGridInit?: boolean;
}

const CatalogPageContext = createContext<CatalogPageContextProps>();

function useContextSetup({ showCatalogGridInit = false }: SetupProps) {
  const [showCatalogGrid, setShowCatalogGrid] = useState(showCatalogGridInit);
  const [isAdvancedView, setIsAdvancedView] = useState(false);

  return {
    isAdvancedView,
    setIsAdvancedView,
    setShowCatalogGrid,
    showCatalogGrid,
  };
}

interface Props {
  children: ReactNode;
  showCatalogGridInit?: boolean;
}

export function CatalogPageContextProvider({
  children,
  showCatalogGridInit,
}: Props) {
  const value = useContextSetup({
    showCatalogGridInit,
  });

  return (
    <CatalogPageContext.Provider value={value}>
      {children}
    </CatalogPageContext.Provider>
  );
}

export const useCatalogPageContext = CatalogPageContext.useContext;
