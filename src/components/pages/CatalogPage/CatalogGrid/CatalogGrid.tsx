import { useEffect, useRef, useState } from 'react';

import { DATA_COMPONENT_LABEL } from '~/components/modules/Catalog/Header.constants';
import HeaderContainer from '~/components/modules/Catalog/Header.container';
import Recirculation from '~/components/modules/Catalog/Recirculation/Recirculation';
import { useCatalogPageContext } from '~/context/CatalogPage.context';
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
import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';
import { getScroll, subscribeScroll } from '~/lib/helpers/scroll';
import { map } from '~/lib/utils/interpolation';

import CatalogProductGrid from '../CatalogProductGrid/CatalogProductGrid';
import CatalogProductGroups from '../CatalogProductGroups/CatalogProductGroups';
import useExperimentSkipCurationView from './experiments/useExperimentSkipCurationView';
import NoResultsGrid from './NoResultsGrid';

interface Props {
  fetchNewProducts: (page: number) => Promise<SiteCatalogProducts>;
  hasResults: boolean;
  hasTopPicks: boolean;
  onPreviewFilters: (filters?: Record<string, string>) => Promise<void>;
  previewFiltersData: { filters: SiteCatalogFilters; totalMatches: number };
  siteCatalogProducts: SiteCatalogProducts;
  siteCatalogSummary?: SiteCatalogSummary;
}

function CatalogGrid({
  hasTopPicks,
  hasResults,
  siteCatalogSummary,
  siteCatalogProducts,
  onPreviewFilters,
  previewFiltersData,
  fetchNewProducts,
}: Props) {
  const { isLoading, handleUpdateResults } = useCatalogPageContext();
  const catalogGrid = useRef<HTMLDivElement | null>(null);

  // Uses a state instead of ref to avoid forwarding refs
  const [
    catalogGridHeaderContainer,
    setCatalogGridHeaderContainer,
  ] = useState<HTMLDivElement | null>(null);

  const [catalogGridOffsetTop, setCatalogGridOffsetTop] = useState(0);

  // Experiment
  useExperimentSkipCurationView({
    isLoading,
    skipCurationView: () => {
      handleUpdateResults({ skipGroups: 'true' }, true);
    },
  });

  // Animation based on scroll
  // Step #1: Get catalogGrid offsetTop on resize
  useEffect(() => {
    if (!catalogGrid || !catalogGrid.current || !hasTopPicks) {
      return;
    }

    // Target directly using "data-component"
    setCatalogGridHeaderContainer(
      catalogGrid.current.querySelector(
        `*[data-component="${DATA_COMPONENT_LABEL}"]`,
      ) as HTMLDivElement,
    );

    const resize = () => {
      if (!catalogGrid || !catalogGrid.current) {
        return;
      }
      setCatalogGridOffsetTop(catalogGrid.current.offsetTop);
    };
    resize();

    window.addEventListener('resize', resize, false);

    return () => {
      window.removeEventListener('resize', resize, false);
    };
  }, [catalogGrid, hasTopPicks]);

  // Animation based on scroll
  // Step #2: Apply alpha
  useEffect(() => {
    if (!catalogGridHeaderContainer || !hasTopPicks) {
      return;
    }

    const scroll = () => {
      if (!catalogGridHeaderContainer) {
        return;
      }

      const y = getScroll().y;
      const alpha = map(y, 0, catalogGridOffsetTop * 0.5, 0, 1);

      // Directly changing the style to avoid re-render loop
      catalogGridHeaderContainer.style.opacity = String(alpha);
    };
    const subscription = subscribeScroll(scroll);

    return () => {
      subscription();
    };
  }, [catalogGridHeaderContainer, catalogGridOffsetTop, hasTopPicks]);

  const isGroupedProducts =
    siteCatalogProducts.siteCatalogProductsResultList[0]?.type ===
    SiteCatalogProductGroupItemEnum.SiteCatalogProductGroupItem;
  return (
    <div ref={catalogGrid}>
      <HeaderContainer
        previewFiltersData={previewFiltersData}
        onPreviewFilters={onPreviewFilters}
        sizeList={siteCatalogSummary?.siteCatalogSummaryMeta?.sizeList}
        hasTopPicks={hasTopPicks}
        siteCatalogProducts={siteCatalogProducts}
      />
      {!hasResults && <NoResultsGrid />}
      {hasResults && (
        <>
          {isGroupedProducts ? (
            <>
              <CatalogProductGroups
                isLoading={isLoading}
                productGroupList={siteCatalogProducts.siteCatalogProductsResultList.filter(
                  (result): result is SiteCatalogProductGroupItem =>
                    result.type ===
                    SiteCatalogProductGroupItemEnum.SiteCatalogProductGroupItem,
                )}
              />
              {siteCatalogSummary?.siteCatalogSummaryRecirculation && (
                <Recirculation
                  handleUpdateResults={handleUpdateResults}
                  {...siteCatalogSummary.siteCatalogSummaryRecirculation}
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
        </>
      )}
    </div>
  );
}

export default CatalogGrid;
