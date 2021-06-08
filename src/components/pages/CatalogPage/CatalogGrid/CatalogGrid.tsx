import React, { useRef } from 'react';

import NotificationList from '~/components/global/NotificationBanner/NotificationList';
import HeaderContainer from '~/components/modules/Catalog/Header.container';
import Recirculation from '~/components/modules/Catalog/Recirculation/Recirculation';
import SeeAllTires from '~/components/modules/Catalog/Recirculation/SeeAllTires';
import { useCompareContext } from '~/components/modules/Compare/Compare.context';
import CompareDrawer from '~/components/modules/Compare/CompareDrawer/CompareDrawer';
import CompareModal from '~/components/modules/Compare/CompareModal/CompareModal';
import { useCatalogProductsContext } from '~/context/CatalogProducts.context';
import { useCatalogSummaryContext } from '~/context/CatalogSummary.context';
import { SiteCatalogFilters } from '~/data/models/SiteCatalogFilters';
import {
  SiteCatalogProductGroupItem,
  SiteCatalogProductGroupItemEnum,
} from '~/data/models/SiteCatalogProductGroupList';
import {
  SiteCatalogProductItem,
  SiteCatalogProductItemEnum,
} from '~/data/models/SiteCatalogProductItem';
import { SiteCatalogProducts } from '~/data/models/SiteCatalogProducts';
import { SiteNotificationTypes } from '~/data/models/SiteNotificationTypes';
import { ui } from '~/lib/utils/ui-dictionary';

import CatalogProductGrid from '../CatalogProductGrid/CatalogProductGrid';
import CatalogProductGroups from '../CatalogProductGroups/CatalogProductGroups';
import styles from './CatalogGrid.styles';
import useExperimentSkipCurationView from './experiments/useExperimentSkipCurationView';
import NoResultsGrid from './NoResultsGrid';

interface Props {
  fetchNewProducts: (
    page: number,
    skipGroups: boolean,
  ) => Promise<SiteCatalogProducts | null>;
  hasResults: boolean;
  hasTopPicks: boolean;
  onPreviewFilters: (filters?: Record<string, string>) => Promise<void>;
  previewFiltersData: { filters: SiteCatalogFilters; totalMatches: number };
  siteCatalogProducts: SiteCatalogProducts;
}

function CatalogGrid({
  hasResults,
  hasTopPicks,
  onPreviewFilters,
  previewFiltersData,
  fetchNewProducts,
  siteCatalogProducts,
}: Props) {
  const { siteCatalogSummary } = useCatalogSummaryContext();
  const {
    isLoading,
    handleUpdateResults,
    isAdvancedView,
  } = useCatalogProductsContext();
  const {
    productListToCompare,
    removeFromList,
    openCompareDrawer,
    setOpenCompareDrawer,
    handleCompare,
    setRemovingProductIndex,
    setShowDupAlert,
    showDupAlert,
    showCompareDrawer,
  } = useCompareContext();
  const catalogGrid = useRef<HTMLDivElement | null>(null);
  // Experiment
  useExperimentSkipCurationView({
    isLoading,
    skipCurationView: () => {
      handleUpdateResults({ skipGroups: 'true' }, true);
    },
  });

  const onCloseCompareDrawer = () => {
    setOpenCompareDrawer(false);
  };

  const onToggleCompareDrawer = () => {
    setOpenCompareDrawer((state) => !state);
  };

  const totalResults = siteCatalogSummary?.siteCatalogSummaryMeta?.totalResults;
  const isGroupedProducts =
    !isAdvancedView &&
    siteCatalogProducts?.siteCatalogProductsResultList[0]?.type ===
      SiteCatalogProductGroupItemEnum.SiteCatalogProductGroupItem;
  const totalGroupResult: number =
    siteCatalogProducts && siteCatalogProducts.listResultMetadata.pagination
      ? siteCatalogProducts.listResultMetadata.pagination.total
      : 0;
  const resultsPerPage: number =
    siteCatalogProducts &&
    siteCatalogProducts.listResultMetadata.pagination?.resultsPerPage
      ? siteCatalogProducts.listResultMetadata.pagination.resultsPerPage
      : 0;

  const showingResult = isGroupedProducts
    ? totalGroupResult <= resultsPerPage
      ? totalGroupResult
      : resultsPerPage
    : siteCatalogProducts.siteCatalogProductsResultList.filter(
        (result): result is SiteCatalogProductItem =>
          result.type === SiteCatalogProductItemEnum.SiteCatalogProductItem,
      ).length;

  return (
    <div ref={catalogGrid}>
      <HeaderContainer
        previewFiltersData={previewFiltersData}
        onPreviewFilters={onPreviewFilters}
        sizeList={siteCatalogSummary?.siteCatalogSummaryMeta?.sizeList}
        hasTopPicks={hasTopPicks}
        showingResult={showingResult}
        siteCatalogProducts={siteCatalogProducts}
      />
      <NotificationList
        customItemStyles={styles.notificationList}
        types={[SiteNotificationTypes.Shop]}
      />
      {!hasResults && <NoResultsGrid />}
      {hasResults && (
        <div css={styles.results}>
          {isGroupedProducts ? (
            <>
              <CatalogProductGroups
                isLoading={isLoading}
                hasTopPicks={hasTopPicks}
                productGroupList={siteCatalogProducts.siteCatalogProductsResultList.filter(
                  (result): result is SiteCatalogProductGroupItem =>
                    result.type ===
                    SiteCatalogProductGroupItemEnum.SiteCatalogProductGroupItem,
                )}
              />
              {siteCatalogSummary?.siteCatalogSummaryRecirculation ? (
                <Recirculation
                  handleUpdateResults={handleUpdateResults}
                  {...siteCatalogSummary.siteCatalogSummaryRecirculation}
                />
              ) : (
                <SeeAllTires
                  totalResults={totalResults}
                  handleUpdateResults={handleUpdateResults}
                />
              )}
            </>
          ) : (
            <CatalogProductGrid
              pagination={siteCatalogProducts.listResultMetadata.pagination}
              fetchNewProducts={fetchNewProducts}
              productList={siteCatalogProducts.siteCatalogProductsResultList.filter(
                (result): result is SiteCatalogProductItem =>
                  result.type ===
                  SiteCatalogProductItemEnum.SiteCatalogProductItem,
              )}
            />
          )}
          <CompareDrawer
            hide={showCompareDrawer}
            title={ui('catalog.compare.drawer.title')}
            subtitle={ui('catalog.compare.drawer.subtitle')}
            open={openCompareDrawer}
            onClose={onCloseCompareDrawer}
            onToggle={onToggleCompareDrawer}
            isDisabled={
              2 > productListToCompare.length || 5 < productListToCompare.length
            }
            productList={productListToCompare}
            onRemove={removeFromList}
            onAddTire={onCloseCompareDrawer}
            onCompare={handleCompare}
            setRemovingProductIndex={setRemovingProductIndex}
            showDupAlert={showDupAlert}
            setShowDupAlert={setShowDupAlert}
          />
          <CompareModal />
        </div>
      )}
    </div>
  );
}

export default CatalogGrid;
