import { FiltersContextProvider } from '~/components/modules/Catalog/Filters/Filters.context';
import { useUserPersonalizationContext } from '~/context/UserPersonalization.context';
import { SiteCatalogProducts } from '~/data/models/SiteCatalogProducts';

import Header from './Header';

interface Props {
  handleUpdateResults: (filters: Record<string, string>) => void;
  hasTopPicks: boolean;
  isAdvancedView: boolean;
  isInternal?: boolean;
  siteCatalogProducts: SiteCatalogProducts;
  sizeList?: string[];
  toggleView: () => void;
}

export default function HeaderContainer({
  handleUpdateResults,
  hasTopPicks,
  isAdvancedView,
  siteCatalogProducts,
  sizeList,
  toggleView,
}: Props) {
  const { locationString } = useUserPersonalizationContext();
  return (
    <FiltersContextProvider
      siteCatalogFilters={siteCatalogProducts.siteCatalogFilters}
      onApplyFilters={handleUpdateResults}
    >
      <Header
        siteCatalogProducts={siteCatalogProducts}
        hasTopPicks={hasTopPicks}
        isAdvancedView={isAdvancedView}
        isInternal={false}
        sizeList={sizeList}
        onToggleView={toggleView}
        location={locationString}
      />
    </FiltersContextProvider>
  );
}
