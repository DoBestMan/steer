import { ReactNode, useState } from 'react';

import { createContext } from '~/lib/utils/context';

export interface CatalogPageContextProps {
  handleUpdateResults: (
    filters: Record<string, string>,
    withoutScroll?: boolean,
  ) => void;
  isAdvancedView: boolean;
  isLoading: boolean;
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

  const handleUpdateResults = async (
    filters: Record<string, string>,
    withoutScroll?: boolean,
  ) => {
    setIsLoading(true);
    await handleUpdateFilters(filters, withoutScroll);
    setIsLoading(false);
  };

  return {
    handleUpdateResults,
    isAdvancedView,
    isLoading,
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
