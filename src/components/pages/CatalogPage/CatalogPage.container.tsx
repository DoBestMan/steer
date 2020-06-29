import { useRouter } from 'next/router';

import { CatalogPageContextProvider } from '~/context/CatalogPage.context';
import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';

import CatalogPage from './CatalogPage';

interface Props {
  hasTopPicks?: boolean;
  siteCatalogSummary?: SiteCatalogSummary;
}

function CatalogPageContainer({
  hasTopPicks = true,
  siteCatalogSummary,
}: Props) {
  // TEMP: use route params for testing flows
  const router = useRouter();
  const { isSearch } = router.query;

  return (
    <CatalogPageContextProvider showCatalogGridInit={isSearch !== 'true'}>
      <CatalogPage
        // later will be an context state
        comesFromSearch={isSearch === 'true'}
        hasTopPicks={hasTopPicks}
        siteCatalogSummary={siteCatalogSummary}
      />
    </CatalogPageContextProvider>
  );
}

export default CatalogPageContainer;
