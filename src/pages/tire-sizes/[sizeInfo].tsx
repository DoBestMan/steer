import { useRouter } from 'next/router';

import CatalogPageContainer from '~/components/pages/CatalogPage/CatalogPage.container';
import {
  emptyCatalogProducts,
  emptyHandleUpdateResults,
} from '~/components/pages/CatalogPage/CatalogPage.mocks';
// import { COLORS } from '~/lib/constants';
import { isRouteDiameterFormat } from '~/lib/utils/routes';

// params will include diameter and category or type
// final structure should be something like `/tire-sizes/12-inch-winter-tires

function fetchDiameter() {}
function fetchClassic() {}

function TireCategory() {
  const { asPath } = useRouter();
  // TODO: get optional param rear tire size
  // const { rear } = router.query;

  const isDiameterRoute = isRouteDiameterFormat(asPath);
  // TODO: remove these functions when backend fns are created
  const dataFn = isDiameterRoute ? fetchDiameter : fetchClassic;
  dataFn(/* api options/params */);

  // TODO: add handleUpdateResults prop
  return (
    <CatalogPageContainer
      handleUpdateResults={emptyHandleUpdateResults}
      siteCatalogProducts={emptyCatalogProducts}
      hasTopPicks={false}
    />
  );
}

export default TireCategory;
