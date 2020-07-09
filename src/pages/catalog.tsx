import CatalogPageContainer from '~/components/pages/CatalogPage/CatalogPage.container';
import { emptyCatalogProducts } from '~/components/pages/CatalogPage/CatalogPage.mocks';
import { vehiclesNoOeWithSize } from '~/components/pages/CatalogPage/CatalogSummary/CatalogSummary.mocks';

function Catalog() {
  // TODO: add prop handleUpdateFilters and wire up data
  return (
    <CatalogPageContainer
      serverData={{
        siteCatalogProducts: emptyCatalogProducts,
        siteCatalogSummary: vehiclesNoOeWithSize,
      }}
      //  TODO: remove this page
      endpoints={{
        summary: '/summary-vehicle',
        products: '/products-vehicle',
      }}
    />
  );
}

export default Catalog;
