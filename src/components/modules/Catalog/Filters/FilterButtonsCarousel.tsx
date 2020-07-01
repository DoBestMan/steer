import { useTheme } from 'emotion-theming';
import { MouseEvent, ReactElement } from 'react';

import FilterButton from '~/components/global/Button/FilterButton';
import FilterButtonToggle from '~/components/global/Button/FilterButtonToggle';
import Carousel from '~/components/global/Carousel/CarouselDynamic';
import { SiteCatalogFilterTypeEnum } from '~/data/models/SiteCatalogFilters';
import { ui } from '~/lib/utils/ui-dictionary';

import { CatalogFilterTypes } from './Filter.types';
import FilterPopups from './FilterPopups';
import { useFiltersContext } from './Filters.context';
import styles from './Filters.styles';
import { getFilterLabel, hasActiveValue } from './Filters.utils';

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
  const { header } = useTheme();
  function onFilterClick(e: MouseEvent) {
    createOpenFilterHandler(0)(e);
  }

  const isPopularActive = popularFilters.some((filter) => {
    if ('item' in filter) {
      return hasActiveValue(filter.item, activeFilters);
    }
    return false;
  });

  return (
    <div
      css={[
        styles.listContainer,
        selectingFilter !== null && styles.disableEvents,
      ]}
    >
      <Carousel slideClass="filter-button" freeScroll>
        <FilterButton
          isVisible={!!popularFilters.length}
          css={[
            styles.filterButton,
            !popularFilters.length && styles.filterHide,
          ]}
          label={popularLabel}
          isDropdownOpen={selectingFilter === 0}
          isActive={isPopularActive}
          onClick={onFilterClick}
          theme={header.buttonTheme}
          aria-expanded={selectingFilter === 0}
        />
        {
          (filters.map((filter, idx) => {
            const label = getFilterLabel(filter);
            const isActive = hasActiveValue(filter, activeFilters);
            const isDropdownOpen = selectingFilter === idx + 1;
            return filter.type !==
              SiteCatalogFilterTypeEnum.SiteCatalogFilterToggle ? (
              // filter with dropdown
              <FilterButton
                css={[
                  styles.filterButton,
                  isDropdownOpen && styles.disableEvents,
                ]}
                key={idx}
                label={label}
                isDropdownOpen={isDropdownOpen}
                isActive={isActive}
                onClick={createOpenFilterHandler(idx + 1)}
                theme={header.buttonTheme}
                aria-expanded={isDropdownOpen}
              />
            ) : (
              <FilterButtonToggle
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
      </Carousel>
      {/* TODO: integrate filters */}
      <FilterPopups popularFilters={popularFilters} filters={filters} />
    </div>
  );
}
