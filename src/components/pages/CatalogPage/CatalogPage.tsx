import { ThemeProvider } from 'emotion-theming';
import { useEffect } from 'react';

import { NAV_THEME } from '~/components/modules/Nav/Nav.theme';
import { useCatalogPageContext } from '~/context/CatalogPage.context';
import { useCatalogSummaryContext } from '~/context/CatalogSummary.context';
import { useNavContext } from '~/context/Nav.context';
import { SiteCatalogFilters } from '~/data/models/SiteCatalogFilters';
import { SiteCatalogProducts } from '~/data/models/SiteCatalogProducts';
import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';

import CatalogGrid from './CatalogGrid/CatalogGrid';
import CatalogLoading from './CatalogLoading/CatalogLoading';
import styles from './CatalogPage.styles';
import { defaultTheme, headerAdvanced } from './CatalogPage.theme';
import CatalogSummary from './CatalogSummary/CatalogSummary';
import { STAGES } from './CatalogSummary/CatalogSummary.constants';

interface Props {
  catalogGridRef: React.Ref<HTMLDivElement>;
  fetchNewProducts: (page: number) => Promise<SiteCatalogProducts | null>;
  onPreviewFilters: (filters?: Record<string, string>) => Promise<void>;
  previewFiltersData: { filters: SiteCatalogFilters; totalMatches: number };
  scrollToGrid: () => void;
  siteCatalogProducts: SiteCatalogProducts | null;
  siteCatalogSummary: SiteCatalogSummary;
}

function CatalogPage({
  scrollToGrid,
  catalogGridRef,
  siteCatalogProducts,
  siteCatalogSummary,
  onPreviewFilters,
  previewFiltersData,
  fetchNewProducts,
}: Props) {
  const { setNavTheme, theme: navTheme } = useNavContext();
  const { isAdvancedView } = useCatalogPageContext();
  const { contentStage, showSummary, stage } = useCatalogSummaryContext();

  const totalResult =
    siteCatalogProducts?.listResultMetadata.pagination?.total || 0;
  const hasResults = totalResult > 0;

  const showLoadingIndicator = stage === STAGES.LOADING;

  /**
   * Grid should be visible when `contentStage` is set to `RESULTS`
   * - on first render, for SEO purposes
   * - once user transitions into Top Picks from the loading interstitial
   */
  const showGrid = contentStage === STAGES.RESULTS;

  useEffect(() => {
    // When the Catalog Summary is hidden, update Nav theme to `ALTERNATE`
    // for display on an orange background.
    const newTheme = showSummary ? NAV_THEME.DEFAULT : NAV_THEME.ALTERNATE;

    if (newTheme !== navTheme) {
      setNavTheme(newTheme);
    }
    // This hook should not be called when `navTheme` is updated elsewhere
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setNavTheme, showSummary]);

  return (
    <ThemeProvider
      theme={{ ...defaultTheme, ...(isAdvancedView && headerAdvanced) }}
    >
      {showSummary && <CatalogSummary exploreMore={scrollToGrid} />}
      {showGrid && siteCatalogProducts && previewFiltersData && (
        <>
          <div css={styles.grid} ref={catalogGridRef}>
            <CatalogGrid
              hasResults={hasResults}
              previewFiltersData={previewFiltersData}
              onPreviewFilters={onPreviewFilters}
              siteCatalogProducts={siteCatalogProducts}
              hasTopPicks={showSummary}
              siteCatalogSummary={siteCatalogSummary}
              fetchNewProducts={fetchNewProducts}
            />
          </div>
        </>
      )}
      {showLoadingIndicator && <CatalogLoading />}
    </ThemeProvider>
  );
}

export default CatalogPage;
