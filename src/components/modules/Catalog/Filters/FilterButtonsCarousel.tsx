import { useTheme } from 'emotion-theming';
import { ReactElement } from 'react';

import FilterButton from '~/components/global/Button/FilterButton';
import FilterButtonToggle from '~/components/global/Button/FilterButtonToggle';
import FiltersCarousel from '~/components/global/FiltersCarousel/FiltersCarousel';
import styles from '~/components/global/FiltersCarousel/FiltersCarousel.styles';
import { useCatalogPageContext } from '~/context/CatalogPage.context';
import { ui } from '~/lib/utils/ui-dictionary';

import { CatalogFilterTypes, FilterContentTypes } from './Filter.types';
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
  const isPopularDropdownOpen = selectingFilter === POPULAR_ID;
  const isPopularActive = popularFilters.some((filter) => {
    if (filter.type === FilterContentTypes.SiteCatalogFilterToggle) {
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
            isPopularDropdownOpen && styles.disableEvents,
          ]}
          isDisabled={isLoading}
          label={popularLabel}
          isDropdownOpen={isPopularDropdownOpen}
          isActive={isPopularActive}
          onClick={createOpenFilterHandler(POPULAR_ID)}
          theme={header.buttonTheme}
          aria-expanded={isPopularDropdownOpen}
        />
        {
          (filters.map((filter, idx) => {
            const label = getFilterLabel(filter);
            const isActive = hasActiveValue(filter, activeFilters);
            const isDropdownOpen = selectingFilter === idx + 1;
            return filter.type !==
              FilterContentTypes.SiteCatalogFilterToggle ? (
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
                onClick={createToggleFilterHandler(filter.item.value)}
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
