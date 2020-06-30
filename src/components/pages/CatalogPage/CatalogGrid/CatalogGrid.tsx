import { useEffect, useRef, useState } from 'react';

import { DATA_COMPONENT_LABEL } from '~/components/modules/Catalog/Header.constants';
import HeaderContainer from '~/components/modules/Catalog/Header.container';
import { useCatalogPageContext } from '~/context/CatalogPage.context';
import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';
import { getScroll, subscribeScroll } from '~/lib/helpers/scroll';
import { map } from '~/lib/utils/interpolation';

import CatalogProductGrid from '../CatalogProductGrid/CatalogProductGrid';
import CatalogProductGroups from '../CatalogProductGroups/CatalogProductGroups';
import {
  productGroupList,
  products,
} from '../CatalogProductGroups/CatalogProductGroups.mocks';

interface Props {
  handleUpdateResults?: (filters: Record<string, string>) => void;
  hasTopPicks: boolean;
  siteCatalogProducts: any;
  siteCatalogSummary?: SiteCatalogSummary;
}

function CatalogGrid({
  hasTopPicks,
  handleUpdateResults,
  siteCatalogSummary,
  siteCatalogProducts,
}: Props) {
  const { setIsAdvancedView, isAdvancedView } = useCatalogPageContext();
  const catalogGrid = useRef<HTMLDivElement | null>(null);

  // Uses a state instead of ref to avoid forwarding refs
  const [
    catalogGridHeaderContainer,
    setCatalogGridHeaderContainer,
  ] = useState<HTMLDivElement | null>(null);

  const [catalogGridOffsetTop, setCatalogGridOffsetTop] = useState(0);

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

  function toggleView() {
    setIsAdvancedView(!isAdvancedView);
  }

  // TODO: logic of grouped vs. grid views — for now we only use grid for advanced view
  const isGroupedProducts = !isAdvancedView;

  return (
    <div ref={catalogGrid}>
      <HeaderContainer
        handleUpdateResults={handleUpdateResults}
        sizeList={siteCatalogSummary?.siteCatalogSummaryMeta?.sizeList}
        hasTopPicks={hasTopPicks}
        toggleView={toggleView}
        siteCatalogFilters={siteCatalogProducts?.siteCatalogFilters}
        isAdvancedView={isAdvancedView}
      />
      {isGroupedProducts ? (
        <CatalogProductGroups productGroupList={productGroupList} />
      ) : (
        <CatalogProductGrid
          productList={products}
          isAdvancedView={isAdvancedView}
        />
      )}
    </div>
  );
}

export default CatalogGrid;
