import { ReactNode, useState } from 'react';

import FilterButton from '~/components/global/Button/FilterButton';
import { BUTTON_THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import { mockFilters } from './Catalog.mocks';
import FilterDropdown from './Dropdown';
import styles from './Filters.styles';
import hStyles from './Header.styles';

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
  const filterLabel = isAdvancedView
    ? ui('catalog.header.filterLabelAdvanced')
    : ui('catalog.header.filterLabel');
  return (
    <div css={styles.root}>
      <p css={[styles.filterLabel, isAdvancedView && hStyles.textAdvanced]}>
        {filterLabel}:
      </p>
      {children}
      <ul css={styles.filterList}>
        {/* schema will change */}
        {mockFilters.map(({ hasDropdown, label }) => (
          <div css={styles.button} key={label}>
            <FilterButton
              isActive={
                activeFilters.includes(label) || label === selectingFilter
              }
              hasDropDown={hasDropdown}
              onClick={
                hasDropdown ? selectFilterDropdown(label) : onClick(label)
              }
              theme={isAdvancedView ? BUTTON_THEME.DARK : BUTTON_THEME.ORANGE}
              aria-expanded={
                hasDropdown ? label === selectingFilter : undefined
              }
            >
              {label}
            </FilterButton>
            {hasDropdown && (
              <FilterDropdown
                label={label}
                isOpen={label === selectingFilter}
                onClose={clearSelectingFilter}
                onSelectFilter={onClick(label)}
              />
            )}
          </div>
        ))}
      </ul>
    </div>
  );
}
