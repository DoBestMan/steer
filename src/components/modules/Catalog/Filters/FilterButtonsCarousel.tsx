import { useTheme } from 'emotion-theming';
import { MouseEvent, ReactElement } from 'react';

import FilterButton from '~/components/global/Button/FilterButton';
import FilterButtonToggle from '~/components/global/Button/FilterButtonToggle';
import Carousel from '~/components/global/Carousel/CarouselDynamic';
import { ui } from '~/lib/utils/ui-dictionary';

import { CatalogFilterTypes, FilterContentTypes } from './Filter.types';
import FilterPopups from './FilterPopups';
import { useFiltersContext } from './Filters.context';
import styles from './Filters.styles';

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
    createOpenFilterHandler(popularLabel)(e);
  }

  return (
    <div css={[styles.listContainer, selectingFilter && styles.disableEvents]}>
      <Carousel wrapperClass="filters-wrapper" freeScroll>
        <FilterButton
          isVisible={!!popularFilters.length}
          css={[
            styles.filterButton,
            !popularFilters.length && styles.filterHide,
          ]}
          label={popularLabel}
          isDropdownOpen={popularLabel === selectingFilter}
          isActive={
            !!(
              activeFilters[popularLabel] &&
              Object.keys(activeFilters[popularLabel]).length
            )
          }
          onClick={onFilterClick}
          theme={header.buttonTheme}
          aria-expanded={popularLabel === selectingFilter}
        />
        {
          (filters.map(({ label, ...filter }, idx) => {
            const isDropdownActive = !!(
              activeFilters[label] && Object.keys(activeFilters[label]).length
            );
            const popularFilters =
              activeFilters[ui('catalog.filters.popularFilters')];
            const isToggleActive = !!(
              typeof popularFilters === 'object' &&
              label in popularFilters &&
              popularFilters[label]
            );
            const isDropdownOpen = label === selectingFilter;

            return filter.type !== FilterContentTypes.CatalogFilterToggle ? (
              // filter with dropdown
              <FilterButton
                css={[
                  styles.filterButton,
                  isDropdownOpen && styles.disableEvents,
                ]}
                key={idx}
                label={label}
                isDropdownOpen={isDropdownOpen}
                isActive={isDropdownActive}
                onClick={createOpenFilterHandler(label)}
                theme={header.buttonTheme}
                aria-expanded={isDropdownOpen}
              />
            ) : (
              <FilterButtonToggle
                css={styles.filterButton}
                key={idx}
                isActive={isToggleActive}
                onClick={createToggleFilterHandler({
                  group: ui('catalog.filters.popularFilters'),
                  id: label,
                  value: !isToggleActive,
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
