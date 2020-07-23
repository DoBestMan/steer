import { ThemeProvider } from 'emotion-theming';

import Feedback from '~/components/global/Feedback/Feedback';
import { useCatalogPageContext } from '~/context/CatalogPage.context';
import { useCatalogSummaryContext } from '~/context/CatalogSummary.context';
import { SiteCatalogFilters } from '~/data/models/SiteCatalogFilters';
import { SiteCatalogProducts } from '~/data/models/SiteCatalogProducts';
import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';

import CatalogGrid from './CatalogGrid/CatalogGrid';
import styles from './CatalogPage.styles';
import { defaultTheme, headerAdvanced } from './CatalogPage.theme';
import CatalogSummary from './CatalogSummary/CatalogSummary';

interface Props {
  catalogGridRef: React.Ref<HTMLDivElement>;
  onPreviewFilters: (filters: Record<string, string>) => Promise<void>;
  previewFiltersData: SiteCatalogFilters;
  scrollToGrid: () => void;
  siteCatalogProducts: SiteCatalogProducts;
  siteCatalogSummary: SiteCatalogSummary;
}

function CatalogPage({
  scrollToGrid,
  catalogGridRef,
  siteCatalogProducts,
  siteCatalogSummary,
  onPreviewFilters,
  previewFiltersData,
}: Props) {
  const { isAdvancedView, showCatalogGrid } = useCatalogPageContext();
  const { showSummary } = useCatalogSummaryContext();

  const totalResult = siteCatalogProducts.siteCatalogFilters?.totalMatches || 0;
  const hasResults = totalResult > 0;
  // TODO: use CatalogSummary `stage` to determine if Grid should be visible
  // page has no top picks and does not come from search OR `showCatalogGrid` is true
  // TODO: grid must be shown on first render for SEO reasons
  // `showCatalogGrid` is set within top picks
  const isGridVisible = (!showSummary && !showCatalogGrid) || showCatalogGrid;

  return (
    <ThemeProvider
      theme={{ ...defaultTheme, ...(isAdvancedView && headerAdvanced) }}
    >
      {showSummary && <CatalogSummary exploreMore={scrollToGrid} />}
      {isGridVisible && (
        <>
          <div css={styles.grid} ref={catalogGridRef}>
            <CatalogGrid
              hasResults={hasResults}
              previewFiltersData={previewFiltersData}
              onPreviewFilters={onPreviewFilters}
              siteCatalogProducts={siteCatalogProducts}
              hasTopPicks={showSummary}
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
