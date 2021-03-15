import { FiltersContextProvider } from '~/components/modules/Catalog/Filters/Filters.context';
import { useUserPersonalizationContext } from '~/context/UserPersonalization.context';
import { SiteCatalogFilters } from '~/data/models/SiteCatalogFilters';
import { SiteCatalogProducts } from '~/data/models/SiteCatalogProducts';

import Header from './Header';

interface Props {
  hasTopPicks: boolean;
  isInternal?: boolean;
  onPreviewFilters: (filters?: Record<string, string>) => Promise<void>;
  previewFiltersData: { filters: SiteCatalogFilters; totalMatches: number };
  showingResult: number;
  siteCatalogProducts: SiteCatalogProducts;
  sizeList?: string[];
}

export default function HeaderContainer({
  hasTopPicks,
  showingResult,
  siteCatalogProducts,
  sizeList,
  onPreviewFilters,
  previewFiltersData,
}: Props) {
  const { locationString } = useUserPersonalizationContext();
  return (
    <FiltersContextProvider
      previewFiltersData={previewFiltersData}
      onPreviewFilters={onPreviewFilters}
      siteCatalogFilters={siteCatalogProducts.siteCatalogFilters}
    >
      <Header
        siteCatalogProducts={siteCatalogProducts}
        hasTopPicks={hasTopPicks}
        showingResult={showingResult}
        isInternal={false}
        sizeList={sizeList}
        location={locationString}
      />
    </FiltersContextProvider>
  );
}
