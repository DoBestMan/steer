import { ThemeProvider } from '@emotion/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { useSearchModalContext } from '~/components/modules/Search/SearchModal.context';
import { useCatalogProductsContext } from '~/context/CatalogProducts.context';
import { useCatalogSummaryContext } from '~/context/CatalogSummary.context';
import { useFooterContext } from '~/context/Footer.context';
import { LOCAL_STORAGE, PROPERTIES } from '~/lib/constants/localStorage';
import { isBrowser } from '~/lib/utils/browser';

import CatalogGrid from './CatalogGrid/CatalogGrid';
import CatalogLoading from './CatalogLoading/CatalogLoading';
import { scrollToId } from './CatalogPage.helpers';
import styles from './CatalogPage.styles';
import { defaultTheme } from './CatalogPage.theme';
import CatalogSummary from './CatalogSummary/CatalogSummary';
import { STAGES } from './CatalogSummary/CatalogSummary.constants';

interface Props {
  catalogGridRef: React.Ref<HTMLDivElement>;
  isSearchForTireSize?: boolean;
}

function CatalogPage({ catalogGridRef, isSearchForTireSize }: Props) {
  const {
    isLoaded,
    displayedProducts,
    fetchNewProducts,
    onPreviewFilters,
    previewFiltersData,
    scrollToGrid,
    siteCatalogProducts,
  } = useCatalogProductsContext();
  const { contentStage, showSummary, stage } = useCatalogSummaryContext();
  const { fromSearch, setFromSearch } = useSearchModalContext();
  const { setIsFooterVisible } = useFooterContext();
  const { query } = useRouter();

  const totalResult =
    siteCatalogProducts?.listResultMetadata.pagination?.total || 0;
  const hasResults = totalResult > 0;

  const showLoadingIndicator =
    stage === STAGES.LOADING || stage == STAGES.DATA_MOMENT || !isLoaded;

  /**
   * Grid should be visible when `contentStage` is set to `RESULTS`
   * - on first render, for SEO purposes
   * - once user transitions into Top Picks from the loading interstitial
   */
  const showGrid = contentStage === STAGES.RESULTS;

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
    if (!isBrowser() || !fromSearch) {
      return;
    }

    window.localStorage &&
      window.localStorage.removeItem(LOCAL_STORAGE[PROPERTIES.ADVANCED_VIEW]);
    setFromSearch(false);
  }, [fromSearch, setFromSearch]);

  useEffect(() => {
    scrollToId(scrollToGrid, hasResults);
  }, [hasResults, displayedProducts, scrollToGrid, siteCatalogProducts]);
  if (query.utm_source && isSearchForTireSize) {
    setTimeout(scrollToGrid, 100);
  }

  return (
    <ThemeProvider theme={{ ...defaultTheme }}>
      {showSummary && !siteCatalogProducts && <CatalogSummary />}
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
      {showLoadingIndicator && (
        <div
          css={[stage === STAGES.RESULTS && !isLoaded && styles.loaderWrapper]}
        >
          <CatalogLoading />
        </div>
      )}
    </ThemeProvider>
  );
}

export default CatalogPage;
