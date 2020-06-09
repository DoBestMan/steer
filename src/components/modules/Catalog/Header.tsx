import { ReactNode, useState } from 'react';

import Filters from './Filters/Filters';
import { filterRange, filterSort } from './Filters/Filters.mocks';
import SubFilters from './Filters/SubFilters/SubFilters';
import styles from './Header.styles';
import HeaderInfo from './HeaderInfo/HeaderInfo';

interface Props {
  activeFilters?: string[];
  isAdvancedView?: boolean;
  isInternal?: boolean;
  location: string;
  onToggle: () => void;
  rearTireSize?: string;
  tireSize: string;
  title: string | ReactNode;
  toggleFilter: (filter: string) => void;
}

export default function Header({
  activeFilters = [],
  isAdvancedView = false,
  toggleFilter,
  isInternal = false,
  ...rest
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

  const commonProps = {
    activeFilters,
    onClose: clearSelectingFilter,
    onOpen: selectFilterDropdown,
    selectingFilter,
    toggleFilter: onFilterClick,
  };
  return (
    <>
      <div css={[styles.root, isAdvancedView && styles.rootAdvanced]}>
        <HeaderInfo {...{ isInternal }} {...rest} />
        <Filters {...commonProps} isAdvancedView={isAdvancedView} />
      </div>
      <SubFilters
        resultsCount={232}
        priceFilter={filterRange}
        sortFilter={filterSort}
        {...commonProps}
      />
    </>
  );
}
