import { ThemeProvider } from 'emotion-theming';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { NAV_THEME } from '~/components/modules/Nav/Nav.theme';
import { useCatalogProductsContext } from '~/context/CatalogProducts.context';
import { useCatalogSummaryContext } from '~/context/CatalogSummary.context';
import { useFooterContext } from '~/context/Footer.context';
import { useNavContext } from '~/context/Nav.context';
import {
  SiteCatalogProductItem,
  SiteCatalogProductItemEnum,
} from '~/data/models/SiteCatalogProductItem';
import { LOCAL_STORAGE, PROPERTIES } from '~/lib/constants/localStorage';
import { isBrowser } from '~/lib/utils/browser';

import CatalogGrid from './CatalogGrid/CatalogGrid';
import CatalogLoading from './CatalogLoading/CatalogLoading';
import { scrollToId } from './CatalogPage.helpers';
import styles from './CatalogPage.styles';
import { defaultTheme, headerAdvanced } from './CatalogPage.theme';
import CatalogSummary from './CatalogSummary/CatalogSummary';
import { STAGES } from './CatalogSummary/CatalogSummary.constants';

interface Props {
  catalogGridRef: React.Ref<HTMLDivElement>;
  isSearchForTireSize?: boolean;
}

function CatalogPage({ catalogGridRef, isSearchForTireSize }: Props) {
  const { setNavTheme, theme: navTheme } = useNavContext();
  const {
    displayedProducts,
    fetchNewProducts,
    isAdvancedView,
    onPreviewFilters,
    previewFiltersData,
    setDisplayedProducts,
    setIsAdvancedView,
    scrollToGrid,
    siteCatalogProducts,
  } = useCatalogProductsContext();
  const { contentStage, showSummary, stage } = useCatalogSummaryContext();
  const { setIsFooterVisible } = useFooterContext();
  const { query } = useRouter();

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

  useEffect(() => {
    // SQA-499: display footer only in the Catalog results page, hide for all interstitial pages.
    if (stage === STAGES.RESULTS) {
      setIsFooterVisible(true);
    } else {
      setIsFooterVisible(false);
    }
    return () => {
      setIsFooterVisible(true);
    };
  }, [stage, setIsFooterVisible]);

  useEffect(() => {
    if (isBrowser()) {
      const handleSetAdvanceView =
        window.localStorage &&
        window.localStorage.getItem(LOCAL_STORAGE[PROPERTIES.ADVANCED_VIEW]) ===
          'true'
          ? async () => {
              const siteCatalogProducts = await fetchNewProducts(1, false);

              if (!siteCatalogProducts) {
                setDisplayedProducts(displayedProducts);
                return;
              }

              const { siteCatalogProductsResultList } = siteCatalogProducts;
              const updatedProducts = siteCatalogProductsResultList.filter(
                (result): result is SiteCatalogProductItem =>
                  result.type ===
                  SiteCatalogProductItemEnum.SiteCatalogProductItem,
              );

              setIsAdvancedView(true);
              setDisplayedProducts(updatedProducts);
            }
          : () => null;

      handleSetAdvanceView();
    }
    // This hook should not be called when `fetchNewProducts` and `displayedProducts` is called/set elsewhere
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    setIsAdvancedView,
    setDisplayedProducts,
    siteCatalogProducts,
    isAdvancedView,
  ]);

  useEffect(() => {
    scrollToId(scrollToGrid, hasResults);
  }, [hasResults, displayedProducts, scrollToGrid, siteCatalogProducts]);
  if (query.utm_source && isSearchForTireSize) {
    setTimeout(scrollToGrid, 100);
  }

  return (
    <ThemeProvider
      theme={{ ...defaultTheme, ...(isAdvancedView && headerAdvanced) }}
    >
      {showSummary && (
        <CatalogSummary
          exploreMore={scrollToGrid}
          totalTireCount={totalResult}
          isSearchForTireSize={!!isSearchForTireSize}
        />
      )}
      {showGrid && siteCatalogProducts && previewFiltersData && (
        <>
          <div css={styles.grid} ref={catalogGridRef}>
            <CatalogGrid
              hasResults={hasResults}
              previewFiltersData={previewFiltersData}
              onPreviewFilters={onPreviewFilters}
              hasTopPicks={showSummary}
              fetchNewProducts={fetchNewProducts}
              siteCatalogProducts={siteCatalogProducts}
            />
          </div>
        </>
      )}
      {showLoadingIndicator && <CatalogLoading />}
    </ThemeProvider>
  );
}

export default CatalogPage;
