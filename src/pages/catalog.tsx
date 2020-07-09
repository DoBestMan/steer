import CatalogPageContainer from '~/components/pages/CatalogPage/CatalogPage.container';
import {
  emptyCatalogProducts,
  emptyHandleUpdateFilters,
  emptyOnPreviewResults,
} from '~/components/pages/CatalogPage/CatalogPage.mocks';
import { vehiclesNoOeWithSize } from '~/components/pages/CatalogPage/CatalogSummary/CatalogSummary.mocks';

function Catalog() {
  // TODO: add prop handleUpdateFilters and wire up data
  return (
    <CatalogPageContainer
      handleUpdateFilters={emptyHandleUpdateFilters}
      onPreviewFilters={emptyOnPreviewResults}
      siteCatalogProducts={emptyCatalogProducts}
      siteCatalogSummary={vehiclesNoOeWithSize}
      previewFiltersData={emptyCatalogProducts.siteCatalogFilters}
    />
  );
}

export default Catalog;
