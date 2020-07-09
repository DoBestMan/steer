import { FiltersContextProvider } from '~/components/modules/Catalog/Filters/Filters.context';
import { useUserPersonalizationContext } from '~/context/UserPersonalization.context';
import { SiteCatalogFilters } from '~/data/models/SiteCatalogFilters';
import { SiteCatalogProducts } from '~/data/models/SiteCatalogProducts';

import Header from './Header';

interface Props {
  hasTopPicks: boolean;
  isInternal?: boolean;
  onPreviewFilters: (filters: Record<string, string>) => Promise<void>;
  previewFiltersData: SiteCatalogFilters;
  siteCatalogProducts: SiteCatalogProducts;
  sizeList?: string[];
}

export default function HeaderContainer({
  hasTopPicks,
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
        isInternal={false}
        sizeList={sizeList}
        location={locationString}
      />
    </FiltersContextProvider>
  );
}
