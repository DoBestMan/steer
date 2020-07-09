import { useTheme } from 'emotion-theming';
import { MouseEvent, ReactElement } from 'react';

import FilterButton from '~/components/global/Button/FilterButton';
import FilterButtonToggle from '~/components/global/Button/FilterButtonToggle';
import FiltersCarousel from '~/components/global/FiltersCarousel/FiltersCarousel';
import styles from '~/components/global/FiltersCarousel/FiltersCarousel.styles';
import { useCatalogPageContext } from '~/context/CatalogPage.context';
import { SiteCatalogFilterToggleTypeEnum } from '~/data/models/SiteCatalogFilterToggle';
import { ui } from '~/lib/utils/ui-dictionary';

import { CatalogFilterTypes } from './Filter.types';
import FilterPopups from './FilterPopups';
import { useFiltersContext } from './Filters.context';
import { getFilterLabel, hasActiveValue } from './Filters.utils';

export const POPULAR_ID = 'popular';

interface Props {
  filters: CatalogFilterTypes[];
  popularFilters: CatalogFilterTypes[];
}

export default function FilterButtonsCarousel({
  filters,
  popularFilters,
}: Props) {
  const popularLabel = ui('catalog.filters.popularFilters');
  const {
    activeFilters,
    createOpenFilterHandler,
    createToggleFilterHandler,
    selectingFilter,
  } = useFiltersContext();
  const { isLoading } = useCatalogPageContext();
  const { header } = useTheme();
  function onPopularFilterClick(e: MouseEvent) {
    createOpenFilterHandler(POPULAR_ID)(e);
  }

  const isPopularActive = popularFilters.some((filter) => {
    if ('item' in filter) {
      return hasActiveValue(filter.item, activeFilters);
    }
    return false;
  });

  return (
    <>
      <FiltersCarousel activeFilter={selectingFilter}>
        <FilterButton
          isVisible={!!popularFilters.length}
          css={[
            styles.filterButton,
            !popularFilters.length && styles.filterHide,
          ]}
          isDisabled={isLoading}
          label={popularLabel}
          isDropdownOpen={selectingFilter === POPULAR_ID}
          isActive={isPopularActive}
          onClick={onPopularFilterClick}
          theme={header.buttonTheme}
          aria-expanded={selectingFilter === POPULAR_ID}
        />
        {
          (filters.map((filter, idx) => {
            const label = getFilterLabel(filter);
            const isActive = hasActiveValue(filter, activeFilters);
            const isDropdownOpen = selectingFilter === idx + 1;
            return filter.type !==
              SiteCatalogFilterToggleTypeEnum.SiteCatalogFilterToggle ? (
              // filter with dropdown
              <FilterButton
                css={[
                  styles.filterButton,
                  isDropdownOpen && styles.disableEvents,
                ]}
                key={idx}
                label={label}
                isDropdownOpen={isDropdownOpen}
                isDisabled={isLoading}
                isActive={isActive}
                onClick={createOpenFilterHandler(idx + 1)}
                theme={header.buttonTheme}
                aria-expanded={isDropdownOpen}
              />
            ) : (
              <FilterButtonToggle
                isDisabled={isLoading}
                css={styles.filterButton}
                key={idx}
                isActive={isActive}
                onClick={createToggleFilterHandler({
                  value: filter.item.value,
                })}
                theme={header.buttonTheme}
              >
                {label}
              </FilterButtonToggle>
            );
          }) as unknown) as ReactElement
        }
      </FiltersCarousel>
      <FilterPopups popularFilters={popularFilters} filters={filters} />
    </>
  );
}
