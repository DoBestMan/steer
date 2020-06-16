import { useRouter } from 'next/router';

import HeaderContainer from '~/components/modules/Catalog/Header.container';
import { CatalogSummaryContextProvider } from '~/context/CatalogSummary.context';

import styles from './CatalogPage.styles';
import CatalogSummary from './CatalogSummary/CatalogSummary';
import {
  vehiclesDisambiguation,
  vehiclesNoOeWithSize,
  vehiclesNoResultWithTrim,
} from './CatalogSummary/CatalogSummary.mocks';

function CatalogPage() {
  // TEMP: use route params for testing flows
  const router = useRouter();
  const { flow, isSearch } = router.query;

  // SiteCatalogSummary response
  let catalogSummaryResponse = vehiclesNoOeWithSize;
  // From the SiteCatalogProducts response
  let numberOfProducts = 232;

  if (flow === 'disambiguation') {
    catalogSummaryResponse = vehiclesDisambiguation;
  } else if (flow === 'noResults') {
    catalogSummaryResponse = vehiclesNoResultWithTrim;
    numberOfProducts = 0;
  }

  return (
    <div css={styles.root}>
      <CatalogSummaryContextProvider
        catalogSummaryResponse={catalogSummaryResponse}
        isSearch={isSearch === 'true'}
        numberOfProducts={numberOfProducts}
      >
        <CatalogSummary />
      </CatalogSummaryContextProvider>
      <HeaderContainer />
    </div>
  );
}

export default CatalogPage;
