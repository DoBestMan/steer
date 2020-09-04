import { useTheme } from 'emotion-theming';
import { ReactElement, useEffect, useRef } from 'react';

import FilterButton from '~/components/global/Button/FilterButton';
import FilterButtonToggle from '~/components/global/Button/FilterButtonToggle';
import FiltersCarousel from '~/components/global/FiltersCarousel/FiltersCarousel';
import styles from '~/components/global/FiltersCarousel/FiltersCarousel.styles';
import { useCatalogProductsContext } from '~/context/CatalogProducts.context';
import { SPACING } from '~/lib/constants';
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
  const filtersRef = useRef<HTMLParagraphElement | null>(null);

  const popularLabel = ui('catalog.filters.popularFilters');
  const {
    activeFilters,
    createOpenFilterHandler,
    createToggleFilterHandler,
    selectingFilter,
  } = useFiltersContext();
  const { isLoading } = useCatalogProductsContext();
  const { header } = useTheme();
  const isPopularDropdownOpen = selectingFilter === POPULAR_ID;
  const isPopularActive = popularFilters.some((filter) => {
    if (filter.type === FilterContentTypes.SiteCatalogFilterToggle) {
      return hasActiveValue(filter.item, activeFilters);
    }
    return false;
  });

  const prevSelectingFilter = useRef(selectingFilter);

  useEffect(() => {
    if (filtersRef.current && selectingFilter && !prevSelectingFilter.current) {
      window.scroll({
        top:
          filtersRef.current.getBoundingClientRect().top -
          document.body.getBoundingClientRect().top -
          SPACING.SIZE_30,
        behavior: 'smooth',
      });
    }
    prevSelectingFilter.current = selectingFilter;
  }, [selectingFilter]);

  return (
    <>
      <p ref={filtersRef} css={[styles.filterLabel, header.text]}>
        {ui('catalog.header.filterLabel')}:
      </p>
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
