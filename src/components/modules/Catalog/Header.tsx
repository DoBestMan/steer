import { useTheme } from 'emotion-theming';
import { ReactNode } from 'react';

import { useBreakpoints } from '~/hooks/useBreakpoints';
import { ui } from '~/lib/utils/ui-dictionary';

import FilterButtonsCarousel from './Filters/FilterButtonsCarousel';
import mockFilters, { filterRange, filterSort } from './Filters/Filters.mocks';
import { getGroupedFilters } from './Filters/Filters.utils';
import SubFilters from './Filters/SubFilters/SubFilters';
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
      <div
        css={[styles.root, header.background, !hasTopPicks && styles.navOffset]}
      >
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
            popularFilters={groupedFilters ? groupedFilters.popularFilters : []}
            filters={filtersToMap}
          />
        )}
      </div>
      <SubFilters
        resultsCount={resultsCount}
        priceFilter={filterRange}
        sortFilter={filterSort}
      />
    </>
  );
}
