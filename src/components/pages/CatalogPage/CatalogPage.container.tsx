import { useRouter } from 'next/router';

import { CatalogPageContextProvider } from '~/context/CatalogPage.context';
import { SiteCatalogProducts } from '~/data/models/SiteCatalogProducts';
import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';

import CatalogPage from './CatalogPage';

interface Props {
  handleUpdateFilters: (filters: Record<string, string>) => void;
  hasTopPicks?: boolean;
  siteCatalogProducts: SiteCatalogProducts;
  siteCatalogSummary: SiteCatalogSummary;
}

function CatalogPageContainer({
  hasTopPicks = true,
  handleUpdateFilters,
  siteCatalogSummary,
  siteCatalogProducts,
}: Props) {
  // TEMP: use route params for testing flows
  const router = useRouter();
  const { isSearch } = router.query;

  return (
    <CatalogPageContextProvider
      handleUpdateFilters={handleUpdateFilters}
      showCatalogGridInit={isSearch !== 'true'}
    >
      <CatalogPage
        // later will be an context state
        comesFromSearch={isSearch === 'true'}
        hasTopPicks={hasTopPicks}
        siteCatalogProducts={siteCatalogProducts}
        siteCatalogSummary={siteCatalogSummary}
      />
    </CatalogPageContextProvider>
  );
}

export default CatalogPageContainer;
