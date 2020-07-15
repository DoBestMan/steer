import { ThemeProvider } from 'emotion-theming';
import { useRouter } from 'next/router';

import { useCatalogPageContext } from '~/context/CatalogPage.context';
import { CatalogSummaryContextProvider } from '~/context/CatalogSummary.context';
import { SiteCatalogFilters } from '~/data/models/SiteCatalogFilters';
import { SiteCatalogProducts } from '~/data/models/SiteCatalogProducts';
import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';

import CatalogGrid from './CatalogGrid/CatalogGrid';
import styles from './CatalogPage.styles';
import { defaultTheme, headerAdvanced } from './CatalogPage.theme';
import CatalogSummary from './CatalogSummary/CatalogSummary';
import {
  vehiclesDisambiguation,
  vehiclesNoOeWithSize,
  vehiclesNoResultWithTrim,
} from './CatalogSummary/CatalogSummary.mocks';

interface Props {
  catalogGridRef: React.Ref<HTMLDivElement>;
  comesFromSearch: boolean;
  hasTopPicks: boolean;
  onPreviewFilters: (filters: Record<string, string>) => Promise<void>;
  previewFiltersData: SiteCatalogFilters;
  scrollToGrid: () => void;
  siteCatalogProducts: SiteCatalogProducts;
  siteCatalogSummary: SiteCatalogSummary;
}

function CatalogPage({
  scrollToGrid,
  catalogGridRef,
  hasTopPicks,
  comesFromSearch,
  siteCatalogProducts,
  siteCatalogSummary,
  onPreviewFilters,
  previewFiltersData,
}: Props) {
  // TEMP: use route params for testing flows
  const router = useRouter();

  const { isAdvancedView, showCatalogGrid } = useCatalogPageContext();

  const { flow } = router.query;

  // TODO: Fake data waiting for mock data: SiteCatalogSummary response
  let catalogSummaryResponse = vehiclesNoOeWithSize;

  if (flow === 'disambiguation') {
    catalogSummaryResponse = vehiclesDisambiguation;
  } else if (flow === 'noResults') {
    catalogSummaryResponse = vehiclesNoResultWithTrim;
  }

  const totalResult =
    catalogSummaryResponse.siteCatalogSummaryMeta?.totalResults || 0;
  const hasResults = totalResult > 0;

  return (
    <ThemeProvider
      theme={{ ...defaultTheme, ...(isAdvancedView && headerAdvanced) }}
    >
      <div css={styles.root}>
        {hasTopPicks && (
          <CatalogSummaryContextProvider
            isLocalDataByDefault={comesFromSearch}
            siteCatalogSummary={siteCatalogSummary}
          >
            <CatalogSummary exploreMore={scrollToGrid} />
          </CatalogSummaryContextProvider>
        )}
        {/* Render when there's result, and not coming from search */}
        {hasResults && showCatalogGrid && (
          <div ref={catalogGridRef}>
            <CatalogGrid
              previewFiltersData={previewFiltersData}
              onPreviewFilters={onPreviewFilters}
              siteCatalogProducts={siteCatalogProducts}
              hasTopPicks={hasTopPicks}
              siteCatalogSummary={siteCatalogSummary}
            />
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}

export default CatalogPage;
