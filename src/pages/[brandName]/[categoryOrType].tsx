// final structure should be something like `/firestone-tires/winter`

import CatalogPageContainer from '~/components/pages/CatalogPage/CatalogPage.container';
import {
  emptyCatalogProducts,
  emptyHandleUpdateResults,
} from '~/components/pages/CatalogPage/CatalogPage.mocks';

function BrandCategory() {
  // TODO: update results function add prop handleUpdateResults

  return (
    <CatalogPageContainer
      handleUpdateResults={emptyHandleUpdateResults}
      siteCatalogProducts={emptyCatalogProducts}
      hasTopPicks={false}
    />
  );
}

export default BrandCategory;
