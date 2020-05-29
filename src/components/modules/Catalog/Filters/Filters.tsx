import { useState } from 'react';

import FilterButton from '~/components/global/Button/FilterButton';
import FilterButtonToggle from '~/components/global/Button/FilterButtonToggle';
import { BUTTON_THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import hStyles from '../Header.styles';
import { FilterContentTypes } from './Filter.types';
import mockFilters from './Filters.mocks';
import styles from './Filters.styles';
import FilterPopup from './Popup/FilterPopup';

interface Props {
  activeFilters: string[];
  isAdvancedView?: boolean;
  toggleFilter: (filter: string) => void;
}

export default function Filters({
  activeFilters,
  isAdvancedView,
  toggleFilter,
}: Props) {
  const [selectingFilter, setSelectingFilter] = useState('');
  function clearSelectingFilter() {
    setSelectingFilter('');
  }
  function selectFilterDropdown(label: string) {
    return () => {
      setSelectingFilter(label);
    };
  }
  function onFilterClick(filter: string) {
    return () => {
      toggleFilter(filter);
    };
  }
  return (
    <>
      <p css={[styles.filterLabel, isAdvancedView && hStyles.textAdvanced]}>
        {ui('catalog.header.filterLabel')}:
      </p>
      <div css={styles.listContainer}>
        <div css={[styles.filterList, selectingFilter && styles.disableScroll]}>
          {mockFilters.map(({ label, ...filter }) => {
            const isActive = activeFilters.includes(label);
            return filter.type !== FilterContentTypes.CatalogFilterToggle ? (
              // filter with dropdown
              <FilterButton
                css={styles.button}
                key={label}
                label={label}
                isDropdownOpen={label === selectingFilter}
                isActive={isActive}
                onClick={selectFilterDropdown(label)}
                theme={isAdvancedView ? BUTTON_THEME.DARK : BUTTON_THEME.ORANGE}
                aria-expanded={label === selectingFilter}
              >
                <FilterPopup
                  isOpen={label === selectingFilter}
                  onClose={clearSelectingFilter}
                  onSelectFilter={onFilterClick(label)}
                  filter={{ ...filter, label }}
                />
              </FilterButton>
            ) : (
              <FilterButtonToggle
                css={styles.button}
                key={label}
                isActive={isActive}
                onClick={onFilterClick(label)}
                theme={isAdvancedView ? BUTTON_THEME.DARK : BUTTON_THEME.ORANGE}
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
