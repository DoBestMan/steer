import { FiltersContextProvider } from '~/components/modules/Catalog/Filters/Filters.context';
import { useUserPersonalizationContext } from '~/context/UserPersonalization.context';
import { SiteCatalogProducts } from '~/data/models/SiteCatalogProducts';

import Header from './Header';

interface Props {
  hasTopPicks: boolean;
  isInternal?: boolean;
  siteCatalogProducts: SiteCatalogProducts;
  sizeList?: string[];
}

export default function HeaderContainer({
  hasTopPicks,
  siteCatalogProducts,
  sizeList,
}: Props) {
  const { locationString } = useUserPersonalizationContext();
  return (
    <FiltersContextProvider
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
