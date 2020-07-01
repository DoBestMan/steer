import { useEffect, useRef } from 'react';

import {
  SiteCatalogFilterListStyle,
  SiteCatalogFilterTypeEnum,
} from '~/data/models/SiteCatalogFilters';
import { useBreakpoints } from '~/hooks/useBreakpoints';

import { CatalogFilterTypes, FilterContentTypes } from '../Filter.types';
import { useFiltersContext } from '../Filters.context';
import { getFilterLabel } from '../Filters.utils';
import FilterDropdown from './Dropdown';
import FilterModal from './FilterModal';
import { mapTypeToContent } from './FilterPopup.utils';

interface Props {
  filter: CatalogFilterTypes;
  hasActionBar?: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterPopup({
  filter,
  hasActionBar = true,
  isOpen,
  onClose,
}: Props) {
  const { greaterThan } = useBreakpoints();
  const isLarge = greaterThan.M;
  const {
    applyFilters,
    clearFiltersToApply,
    isLoading,
    createResetFiltersHandler,
    createUpdateFilterGroup,
    filtersToApply,
  } = useFiltersContext();
  const prevIsLarge = useRef(isLarge);
  const prevIsOpen = useRef(isOpen);
  useEffect(() => {
    // closes popular filter dropdown if open while resizing browser
    if (
      isOpen &&
      !prevIsLarge.current &&
      isLarge &&
      filter.type === FilterContentTypes.SiteCatalogFilterPopular
    ) {
      onClose();
    }
    prevIsLarge.current = isLarge;
    // returns filtersToApply to original state if popup closes without applying
    if (prevIsOpen.current && !isOpen && !isLoading) {
      clearFiltersToApply();
    }
    prevIsOpen.current = isOpen;
  }, [clearFiltersToApply, isOpen, onClose, filter, isLoading, isLarge]);

  if (
    filter.type === SiteCatalogFilterTypeEnum.SiteCatalogFilterToggle ||
    !mapTypeToContent[filter.type]
  ) {
    return null;
  }

  const childProps = {
    filter,
    filtersToApply,
    isLarge,
    onChange: createUpdateFilterGroup,
  };

  const label = getFilterLabel(filter);
  if (
    !(
      filter.type === SiteCatalogFilterTypeEnum.SiteCatalogFilterList &&
      filter.presentationStyle === SiteCatalogFilterListStyle.Large
    ) &&
    isLarge
  ) {
    return (
      <FilterDropdown
        isOpen={isOpen}
        hasActionBar={hasActionBar}
        onApplyFilters={applyFilters}
        onResetFilters={createResetFiltersHandler(filter)}
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
      onResetFilters={createResetFiltersHandler(filter)}
      contentLabel={label}
      onClose={onClose}
    >
      {mapTypeToContent[filter.type](childProps)}
    </FilterModal>
  );
}
