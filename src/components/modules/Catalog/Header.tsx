import { ReactNode } from 'react';

import Filters from './Filters/Filters';
import { useFiltersContext } from './Filters/Filters.context';
import { filterRange, filterSort } from './Filters/Filters.mocks';
import SubFilters from './Filters/SubFilters/SubFilters';
import styles from './Header.styles';
import HeaderInfo from './HeaderInfo/HeaderInfo';

interface Props {
  isAdvancedView?: boolean;
  isInternal?: boolean;
  location: string;
  onToggleView: () => void;
  rearTireSize?: string;
  resultsCount: number;
  tireSize: string;
  title: string | ReactNode;
}

export default function Header({
  isAdvancedView = false,
  isInternal = false,
  resultsCount,
  ...rest
}: Props) {
  const {
    activeFilters,
    clearSelectingFilter,
    createOpenFilterHandler,
    selectingFilter,
    createToggleFilterHandler,
  } = useFiltersContext();

  const commonProps = {
    activeFilters,
    createToggleFilterHandler,
    onClose: clearSelectingFilter,
    onOpen: createOpenFilterHandler,
    selectingFilter,
  };
  return (
    <>
      <div css={[styles.root, isAdvancedView && styles.rootAdvanced]}>
        <HeaderInfo
          isInternal={isInternal}
          isAdvancedView={isAdvancedView}
          {...rest}
        />
        <Filters {...commonProps} isAdvancedView={isAdvancedView} />
      </div>
      <SubFilters
        resultsCount={resultsCount}
        priceFilter={filterRange}
        sortFilter={filterSort}
        {...commonProps}
      />
    </>
  );
}
