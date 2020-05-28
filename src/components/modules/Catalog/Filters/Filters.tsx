import { ReactNode, useState } from 'react';

import FilterButton from '~/components/global/Button/FilterButton';
import { BUTTON_THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import hStyles from '../Header.styles';
import { FilterContentTypes } from './Filter.types';
import FilterPopup from './FilterPopup';
import mockFilters from './Filters.mocks';
import styles from './Filters.styles';

interface Props {
  activeFilters: string[];
  children: ReactNode;
  isAdvancedView?: boolean;
  toggleFilter: (filter: string) => void;
}

export default function Filters({
  activeFilters,
  children,
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
  function onClick(filter: string) {
    return () => {
      toggleFilter(filter);
    };
  }
  return (
    <div css={styles.root}>
      <p css={[styles.filterLabel, isAdvancedView && hStyles.textAdvanced]}>
        {ui('catalog.header.filterLabel')}:
      </p>
      {children}
      <ul css={styles.filterList}>
        {/* schema will change */}
        {mockFilters.map((filter) => {
          const label = filter.label;
          const hasPopup =
            filter.type !== FilterContentTypes.CatalogFilterToggle;
          return (
            <div css={styles.button} key={label}>
              <FilterButton
                isActive={
                  activeFilters.includes(label) || label === selectingFilter
                }
                hasDropDown={hasPopup}
                onClick={
                  hasPopup ? selectFilterDropdown(label) : onClick(label)
                }
                theme={isAdvancedView ? BUTTON_THEME.DARK : BUTTON_THEME.ORANGE}
                aria-expanded={hasPopup ? label === selectingFilter : undefined}
              >
                {label}
              </FilterButton>
              {hasPopup && (
                <FilterPopup
                  isOpen={label === selectingFilter}
                  onClose={clearSelectingFilter}
                  onSelectFilter={onClick(label)}
                  filter={filter}
                />
              )}
            </div>
          );
        })}
      </ul>
    </div>
  );
}
