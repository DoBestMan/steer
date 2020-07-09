// final structure should be something like `/firestone-tires/winter`

import CatalogPageContainer from '~/components/pages/CatalogPage/CatalogPage.container';
import { emptyCatalogProducts } from '~/components/pages/CatalogPage/CatalogPage.mocks';
import { vehiclesNoOeWithSize } from '~/components/pages/CatalogPage/CatalogSummary/CatalogSummary.mocks';

function BrandCategory() {
  // TODO: update results function add prop handleUpdateFilters

  return (
    <CatalogPageContainer
      serverData={{
        siteCatalogProducts: emptyCatalogProducts,
        siteCatalogSummary: vehiclesNoOeWithSize,
      }}
      //  TODO: update endpoints
      endpoints={{
        summary: '/summary-vehicle',
        products: '/products-vehicle',
      }}
      hasTopPicks={false}
    />
  );
}

export default BrandCategory;
