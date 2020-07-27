import { ThemeProvider, useTheme } from 'emotion-theming';

import Feedback from '~/components/global/Feedback/Feedback';
import Loading from '~/components/global/Loading/Loading';
import { useCatalogPageContext } from '~/context/CatalogPage.context';
import { useCatalogSummaryContext } from '~/context/CatalogSummary.context';
import { SiteCatalogFilters } from '~/data/models/SiteCatalogFilters';
import { SiteCatalogProducts } from '~/data/models/SiteCatalogProducts';
import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';

import CatalogGrid from './CatalogGrid/CatalogGrid';
import styles from './CatalogPage.styles';
import { defaultTheme, headerAdvanced } from './CatalogPage.theme';
import CatalogSummary from './CatalogSummary/CatalogSummary';
import { STAGES } from './CatalogSummary/CatalogSummary.constants';

function LoadingIndicator() {
  const { message } = useTheme();
  return (
    <div css={styles.loadingContainer}>
      <Loading theme={message.loadingTheme} />
    </div>
  );
}

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
  const { isAdvancedView } = useCatalogPageContext();
  const { contentStage, showSummary, stage } = useCatalogSummaryContext();

  const totalResult = siteCatalogProducts.siteCatalogFilters?.totalMatches || 0;
  const hasResults = totalResult > 0;

  const showLoadingIndicator = stage === STAGES.LOADING;

  /**
   * Grid should be visible when `contentStage` is set to `RESULTS`
   * - on first render, for SEO purposes
   * - once user transitions into Top Picks from the loading interstitial
   */
  const showGrid = contentStage === STAGES.RESULTS;

  return (
    <ThemeProvider
      theme={{ ...defaultTheme, ...(isAdvancedView && headerAdvanced) }}
    >
      {showSummary && <CatalogSummary exploreMore={scrollToGrid} />}
      {showGrid && (
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
      {showLoadingIndicator && <LoadingIndicator />}
    </ThemeProvider>
  );
}

export default CatalogPage;
