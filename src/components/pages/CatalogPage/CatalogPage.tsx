import { ThemeProvider } from 'emotion-theming';

import Feedback from '~/components/global/Feedback/Feedback';
import { useCatalogPageContext } from '~/context/CatalogPage.context';
import { CatalogSummaryContextProvider } from '~/context/CatalogSummary.context';
import { SiteCatalogFilters } from '~/data/models/SiteCatalogFilters';
import { SiteCatalogProducts } from '~/data/models/SiteCatalogProducts';
import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';
import { SiteQueryParams } from '~/data/models/SiteQueryParams';

import CatalogGrid from './CatalogGrid/CatalogGrid';
import styles from './CatalogPage.styles';
import { defaultTheme, headerAdvanced } from './CatalogPage.theme';
import CatalogSummary from './CatalogSummary/CatalogSummary';

interface Props {
  catalogGridRef: React.Ref<HTMLDivElement>;
  comesFromSearch: boolean;
  handleUpdateSummary: (siteQueryParams: SiteQueryParams) => void;
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
  handleUpdateSummary,
  hasLocalData,
  hasTopPicks,
  siteCatalogProducts,
  siteCatalogSummary,
  onPreviewFilters,
  previewFiltersData,
}: Props) {
  const { isAdvancedView, showCatalogGrid } = useCatalogPageContext();

  const totalResult =
    siteCatalogSummary.siteCatalogSummaryMeta?.totalResults || 0;
  const hasResults = totalResult > 0;
  return (
    <ThemeProvider
      theme={{ ...defaultTheme, ...(isAdvancedView && headerAdvanced) }}
    >
      {hasTopPicks && (
        <CatalogSummaryContextProvider
          comesFromSearch={comesFromSearch}
          handleUpdateSummary={handleUpdateSummary}
          hasLocalData={hasLocalData}
          siteCatalogSummary={siteCatalogSummary}
        >
          <CatalogSummary exploreMore={scrollToGrid} />
        </CatalogSummaryContextProvider>
      )}
      {/* Render when there's result, and not coming from search */}
      {hasResults && showCatalogGrid && (
        <>
          <div css={styles.grid} ref={catalogGridRef}>
            <CatalogGrid
              previewFiltersData={previewFiltersData}
              onPreviewFilters={onPreviewFilters}
              siteCatalogProducts={siteCatalogProducts}
              hasTopPicks={hasTopPicks}
              siteCatalogSummary={siteCatalogSummary}
            />
          </div>
          <Feedback />
        </>
      )}
    </ThemeProvider>
  );
}

export default CatalogPage;
