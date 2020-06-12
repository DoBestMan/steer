import { useRouter } from 'next/router';

import HeaderContainer from '~/components/modules/Catalog/Header.container';
import { CatalogSummaryContextProvider } from '~/context/CatalogSummary.context';

import styles from './CatalogPage.styles';
import CatalogSummary from './CatalogSummary/CatalogSummary';

function CatalogPage() {
  // TEMP: use route params for testing flows
  const router = useRouter();
  const { hasMultipleTireSizes, hasResults, isSearch } = router.query;

  return (
    <div css={styles.root}>
      <CatalogSummaryContextProvider
        hasMultipleTireSizes={hasMultipleTireSizes === 'true'}
        hasResults={hasResults === 'true'}
        isSearch={isSearch === 'true'}
      >
        <CatalogSummary
          hasMultipleTireSizes={hasMultipleTireSizes === 'true'}
          isSearch={isSearch === 'true'}
        />
      </CatalogSummaryContextProvider>
      <HeaderContainer />
    </div>
  );
}

export default CatalogPage;
