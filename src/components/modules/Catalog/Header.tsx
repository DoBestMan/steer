import { useTheme } from 'emotion-theming';
import { ReactNode } from 'react';

import { useBreakpoints } from '~/hooks/useBreakpoints';
import { ui } from '~/lib/utils/ui-dictionary';

import { CatalogFilterTypes } from './Filters/Filter.types';
import FilterButtonsCarousel from './Filters/FilterButtonsCarousel';
import {
  filterSort,
  mockPriceFilter,
  mockSiteCatalogFilters,
} from './Filters/Filters.mocks';
import { getGroupedFilters } from './Filters/Filters.utils';
import SubFilters from './Filters/SubFilters/SubFilters';
import { DATA_COMPONENT_LABEL } from './Header.constants';
import styles from './Header.styles';
import HeaderInfo from './HeaderInfo/HeaderInfo';

interface Props {
  hasTopPicks: boolean;
  isAdvancedView?: boolean;
  isInternal?: boolean;
  location: string;
  onToggleView: () => void;
  resultsCount: number;
  siteCatalogFilters: any;
  sizeList?: string[];
  title: string | ReactNode;
}

export default function Header({
  hasTopPicks,
  isAdvancedView = false,
  isInternal = false,
  resultsCount,
  siteCatalogFilters,
  ...rest
}: Props) {
  const { header } = useTheme();
  const { greaterThan, isLoading } = useBreakpoints();
  // TODO: remove mock fallbacks
  const priceFilter =
    siteCatalogFilters?.filtersList.find(
      (f: CatalogFilterTypes) => 'id' in f && f.id === 'price',
    ) || mockPriceFilter;
  const filters =
    siteCatalogFilters?.filtersList.filter(
      (f: CatalogFilterTypes) => f !== priceFilter,
    ) || mockSiteCatalogFilters;
  const groupedFilters = greaterThan.M && getGroupedFilters(filters);
  const filtersToMap = groupedFilters ? groupedFilters.otherFilters : filters;

  return (
    <>
      <div css={[styles.root, !hasTopPicks && styles.navOffset]}>
        {/* For opacity animation only (see <CatalogGrid>) */}
        <div css={[styles.headerContainer, header.background]}></div>

        {/* "data-component" used in <CatalogGrid> */}
        <div data-component={DATA_COMPONENT_LABEL}>
          <HeaderInfo
            isInternal={isInternal}
            isAdvancedView={isAdvancedView}
            hasTopPicks={hasTopPicks}
            {...rest}
          />
          <p css={[styles.filterLabel, header.text]}>
            {ui('catalog.header.filterLabel')}:
          </p>
          {!isLoading && (
            <FilterButtonsCarousel
              popularFilters={
                groupedFilters ? groupedFilters.popularFilters : []
              }
              filters={filtersToMap}
            />
          )}
        </div>
      </div>
      <SubFilters
        resultsCount={resultsCount}
        priceFilter={priceFilter}
        // TODO: remove mock fallback
        sortList={siteCatalogFilters?.sortList || filterSort}
      />
    </>
  );
}
