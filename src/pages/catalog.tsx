import CatalogPageContainer from '~/components/pages/CatalogPage/CatalogPage.container';
import {
  emptyCatalogProducts,
  emptyHandleUpdateFilters,
} from '~/components/pages/CatalogPage/CatalogPage.mocks';
import { vehiclesNoOeWithSize } from '~/components/pages/CatalogPage/CatalogSummary/CatalogSummary.mocks';

function Catalog() {
  // TODO: add prop handleUpdateFilters and wire up data
  return (
    <CatalogPageContainer
      siteCatalogProducts={emptyCatalogProducts}
      siteCatalogSummary={vehiclesNoOeWithSize}
      handleUpdateFilters={emptyHandleUpdateFilters}
    />
  );
}

export default Catalog;
