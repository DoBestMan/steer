import CatalogPageContainer from '~/components/pages/CatalogPage/CatalogPage.container';
import {
  emptyCatalogProducts,
  emptyHandleUpdateResults,
} from '~/components/pages/CatalogPage/CatalogPage.mocks';

function Catalog() {
  // TODO: add prop handleUpdateResults and wire up data
  return (
    <CatalogPageContainer
      siteCatalogProducts={emptyCatalogProducts}
      handleUpdateResults={emptyHandleUpdateResults}
    />
  );
}

export default Catalog;
