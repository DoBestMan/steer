import { useEffect, useRef } from 'react';

import { useBreakpoints } from '~/hooks/useBreakpoints';
import { TIME } from '~/lib/constants';

import { CatalogFilterTypes, FilterContentTypes } from '../Filter.types';
import { useFiltersContext } from '../Filters.context';
import FilterDropdown from './Dropdown';
import FilterModal from './FilterModal';
import { mapTypeToContent } from './FilterPopup.utils';

interface Props {
  filter: CatalogFilterTypes;
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterPopup({ filter, isOpen, onClose }: Props) {
  const { greaterThan } = useBreakpoints();
  const isLarge = greaterThan.M;
  const {
    applyFilters,
    cancelApplyFilters,
    createResetFiltersHandler,
    createUpdateFilterGroup,
    filtersToApply,
  } = useFiltersContext();
  const hasActionBar = filter.type !== FilterContentTypes.CatalogFilterSort;

  const prevIsLarge = useRef(isLarge);
  const prevIsOpen = useRef(isOpen);
  useEffect(() => {
    // closes popular filter dropdown if open while resizing browser
    if (
      isOpen &&
      !prevIsLarge.current &&
      isLarge &&
      filter.type === FilterContentTypes.CatalogFilterPopular
    ) {
      onClose();
    }
    prevIsLarge.current = isLarge;

    // returns filtersToApply to original state if popup closes without applying
    if (prevIsOpen.current && !isOpen) {
      setTimeout(() => cancelApplyFilters(), TIME.MS350);
    }
    prevIsOpen.current = isOpen;
  }, [cancelApplyFilters, isOpen, onClose, filter.type, isLarge]);

  if (filter.type === FilterContentTypes.CatalogFilterToggle) {
    return null;
  }

  const childProps = {
    applyFilters,
    filter,
    filtersToApply,
    isLarge,
    onChange: createUpdateFilterGroup,
  };

  if (
    filter.type !== FilterContentTypes.CatalogFilterChecklistLarge &&
    isLarge
  ) {
    return (
      <FilterDropdown
        isOpen={isOpen}
        hasActionBar={hasActionBar}
        onApplyFilters={applyFilters}
        onResetFilters={createResetFiltersHandler(filter.label)}
        onClose={onClose}
      >
        {mapTypeToContent[filter.type](childProps)}
      </FilterDropdown>
    );
  }

  return (
    <FilterModal
      isOpen={isOpen}
      hasActionBar={hasActionBar}
      onApplyFilters={applyFilters}
      onResetFilters={createResetFiltersHandler(filter.label)}
      contentLabel={filter.label}
      onClose={onClose}
    >
      {mapTypeToContent[filter.type](childProps)}
    </FilterModal>
  );
}
