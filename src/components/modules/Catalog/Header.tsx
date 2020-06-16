import { useTheme } from 'emotion-theming';
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
  const { header } = useTheme();
  const {
    activeFilters,
    clearSelectingFilter,
    createOpenFilterHandler,
    createToggleFilterHandler,
    selectingFilter,
  } = useFiltersContext();

  const commonProps = {
    activeFilters,
    onClose: clearSelectingFilter,
    onOpen: createOpenFilterHandler,
    selectingFilter,
  };
  return (
    <>
      <div css={[styles.root, header.background]}>
        <HeaderInfo
          isInternal={isInternal}
          isAdvancedView={isAdvancedView}
          {...rest}
        />
        <Filters
          {...commonProps}
          createToggleFilterHandler={createToggleFilterHandler}
        />
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
