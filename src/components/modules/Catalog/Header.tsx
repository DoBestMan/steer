import { useTheme } from 'emotion-theming';
import { ReactNode } from 'react';

import { useBreakpoints } from '~/hooks/useBreakpoints';
import { ui } from '~/lib/utils/ui-dictionary';

import FilterButtonsCarousel from './Filters/FilterButtonsCarousel';
import mockFilters, { filterRange, filterSort } from './Filters/Filters.mocks';
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
  sizeList?: string[];
  title: string | ReactNode;
}

export default function Header({
  hasTopPicks,
  isAdvancedView = false,
  isInternal = false,
  resultsCount,
  ...rest
}: Props) {
  const { header } = useTheme();
  const { greaterThan, isLoading } = useBreakpoints();
  const groupedFilters = greaterThan.M && getGroupedFilters(mockFilters);
  const filtersToMap = groupedFilters
    ? groupedFilters.otherFilters
    : mockFilters;

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
        priceFilter={filterRange}
        sortFilter={filterSort}
      />
    </>
  );
}
