import { useEffect, useRef } from 'react';

import Dropdown from '~/components/global/Dropdown/Dropdown';
import {
  SiteCatalogFilterListPresentationStyleEnum,
  SiteCatalogFilterListTypeEnum,
} from '~/data/models/SiteCatalogFilterList';
import { SiteCatalogFilterToggleTypeEnum } from '~/data/models/SiteCatalogFilterToggle';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { ui } from '~/lib/utils/ui-dictionary';

import { CatalogFilterTypes, FilterContentTypes } from '../Filter.types';
import { useFiltersContext } from '../Filters.context';
import { getFilterLabel } from '../Filters.utils';
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
    filter.type === SiteCatalogFilterToggleTypeEnum.SiteCatalogFilterToggle ||
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
  const forceModal =
    filter.type === SiteCatalogFilterListTypeEnum.SiteCatalogFilterList &&
    filter.presentationStyle ===
      SiteCatalogFilterListPresentationStyleEnum.Large;
  const actionBar = hasActionBar
    ? {
        onClickPrimary: applyFilters,
        onClickSecondary: createResetFiltersHandler(filter),
        primaryLabel: ui('catalog.filters.apply'),
        secondaryLabel: ui('catalog.filters.reset'),
      }
    : null;

  return (
    <Dropdown
      actionBar={actionBar}
      contentLabel={label}
      forceModal={forceModal}
      isOpen={isOpen}
      onClose={onClose}
    >
      {mapTypeToContent[filter.type](childProps)}
    </Dropdown>
  );
}
