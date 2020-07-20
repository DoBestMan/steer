import CatalogPageContainer from '~/components/pages/CatalogPage/CatalogPage.container';
import { emptyCatalogProducts } from '~/components/pages/CatalogPage/CatalogPage.mocks';
import { vehiclesNoOeWithSize } from '~/components/pages/CatalogPage/CatalogSummary/CatalogSummary.mocks';
import { SearchBy } from '~/components/pages/CatalogPage/mapppers/meta';

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
      searchBy={SearchBy.vehicle}
      searchByParams={{ make: 'make', model: 'model', year: 'year' }}
    />
  );
}

export default Catalog;
