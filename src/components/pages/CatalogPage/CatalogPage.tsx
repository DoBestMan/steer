import { ThemeProvider } from 'emotion-theming';

import Feedback from '~/components/global/Feedback/Feedback';
import { useCatalogPageContext } from '~/context/CatalogPage.context';
import { CatalogSummaryContextProvider } from '~/context/CatalogSummary.context';
import { SiteCatalogFilters } from '~/data/models/SiteCatalogFilters';
import { SiteCatalogProducts } from '~/data/models/SiteCatalogProducts';
import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';

import CatalogGrid from './CatalogGrid/CatalogGrid';
import styles from './CatalogPage.styles';
import { defaultTheme, headerAdvanced } from './CatalogPage.theme';
import CatalogSummary from './CatalogSummary/CatalogSummary';

interface Props {
  catalogGridRef: React.Ref<HTMLDivElement>;
  comesFromSearch: boolean;
  hasLocalData: boolean;
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
  comesFromSearch,
  hasLocalData,
  hasTopPicks,
  siteCatalogProducts,
  siteCatalogSummary,
  onPreviewFilters,
  previewFiltersData,
}: Props) {
  const { isAdvancedView, showCatalogGrid } = useCatalogPageContext();

  const totalResult = siteCatalogProducts.siteCatalogFilters?.totalMatches || 0;
  const hasResults = totalResult > 0;
  // page has no top picks and does not come from search OR `showCatalogGrid` is true
  // `showCatalogGrid` is set within top picks
  const isGridVisible = (!hasTopPicks && !showCatalogGrid) || showCatalogGrid;

  return (
    <ThemeProvider
      theme={{ ...defaultTheme, ...(isAdvancedView && headerAdvanced) }}
    >
      {hasTopPicks && (
        <CatalogSummaryContextProvider
          comesFromSearch={comesFromSearch}
          hasLocalData={hasLocalData}
          siteCatalogSummary={siteCatalogSummary}
        >
          <CatalogSummary exploreMore={scrollToGrid} />
        </CatalogSummaryContextProvider>
      )}
      {isGridVisible && (
        <>
          <div css={styles.grid} ref={catalogGridRef}>
            <CatalogGrid
              hasResults={hasResults}
              previewFiltersData={previewFiltersData}
              onPreviewFilters={onPreviewFilters}
              siteCatalogProducts={siteCatalogProducts}
              hasTopPicks={hasTopPicks}
              siteCatalogSummary={siteCatalogSummary}
            />
          </div>
          {hasResults && <Feedback />}
        </>
      )}
    </ThemeProvider>
  );
}

export default CatalogPage;
