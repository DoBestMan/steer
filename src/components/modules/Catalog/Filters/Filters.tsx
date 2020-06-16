import { useTheme } from 'emotion-theming';

import FilterButton from '~/components/global/Button/FilterButton';
import FilterButtonToggle from '~/components/global/Button/FilterButtonToggle';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { ui } from '~/lib/utils/ui-dictionary';

import { FilterContentTypes } from './Filter.types';
import { FiltersContextProps } from './Filters.context';
import mockFilters from './Filters.mocks';
import styles from './Filters.styles';
import { getGroupedFilters } from './Filters.utils';
import PopularFiltersButton from './PopularFiltersButton';
import FilterPopup from './Popup/FilterPopup';

interface Props
  extends Pick<
    FiltersContextProps,
    'activeFilters' | 'createToggleFilterHandler' | 'selectingFilter'
  > {
  onClose: FiltersContextProps['clearSelectingFilter'];
  onOpen: FiltersContextProps['createOpenFilterHandler'];
}

export default function Filters({
  activeFilters,
  createToggleFilterHandler,
  onClose,
  onOpen,
  selectingFilter,
}: Props) {
  const { header } = useTheme();
  const { greaterThan } = useBreakpoints();
  const groupedFilters = greaterThan.M && getGroupedFilters(mockFilters);
  const filtersToMap = groupedFilters
    ? groupedFilters.otherFilters
    : mockFilters;

  return (
    <>
      <p css={[styles.filterLabel, header.text]}>
        {ui('catalog.header.filterLabel')}:
      </p>
      <div
        css={[styles.listContainer, selectingFilter && styles.disableScroll]}
      >
        <div css={styles.filterList}>
          {groupedFilters && (
            <PopularFiltersButton
              activeFilters={activeFilters}
              filters={groupedFilters.popularFilters}
              onClose={onClose}
              onOpen={onOpen}
              selectingFilter={selectingFilter}
            />
          )}
          {filtersToMap.map(({ label, ...filter }) => {
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

            return filter.type !== FilterContentTypes.CatalogFilterToggle ? (
              // filter with dropdown
              <FilterButton
                css={styles.button}
                key={label}
                label={label}
                isDropdownOpen={label === selectingFilter}
                isActive={isDropdownActive}
                onClick={onOpen(label)}
                theme={header.buttonTheme}
                aria-expanded={label === selectingFilter}
              >
                <FilterPopup
                  isOpen={label === selectingFilter}
                  onClose={onClose}
                  filter={{ ...filter, label }}
                />
              </FilterButton>
            ) : (
              <FilterButtonToggle
                css={styles.button}
                key={label}
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
          })}
        </div>
      </div>
    </>
  );
}
