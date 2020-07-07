import CatalogPageContainer from '~/components/pages/CatalogPage/CatalogPage.container';
import {
  emptyCatalogProducts,
  emptyHandleUpdateResults,
} from '~/components/pages/CatalogPage/CatalogPage.mocks';
import { vehiclesNoOeWithSize } from '~/components/pages/CatalogPage/CatalogSummary/CatalogSummary.mocks';

function Catalog() {
  // TODO: add prop handleUpdateResults and wire up data
  return (
    <CatalogPageContainer
      siteCatalogProducts={emptyCatalogProducts}
      siteCatalogSummary={vehiclesNoOeWithSize}
      handleUpdateResults={emptyHandleUpdateResults}
    />
  );
}

export default Catalog;
