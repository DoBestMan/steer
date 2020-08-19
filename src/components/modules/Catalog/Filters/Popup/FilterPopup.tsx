import { useEffect, useRef } from 'react';

import Dropdown from '~/components/global/Dropdown/Dropdown';
import Loading from '~/components/global/Loading/Loading';
import { useCatalogProductsContext } from '~/context/CatalogProducts.context';
import { useModalContext } from '~/context/Modal.context';
import { SiteCatalogFilterListPresentationStyleEnum } from '~/data/models/SiteCatalogFilterList';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { THEME } from '~/lib/constants';
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
    isPreviewLoading,
    createResetFiltersHandler,
    createUpdateFilterGroup,
    filtersToApply,
    totalMatches,
  } = useFiltersContext();
  const { isLoading } = useCatalogProductsContext();
  const { openStaticModal, isModalOpen } = useModalContext();
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
    filter.type === FilterContentTypes.SiteCatalogFilterToggle ||
    !mapTypeToContent[filter.type]
  ) {
    return null;
  }

  const childProps = {
    filter,
    filtersToApply,
    isLarge,
    isPreviewLoading,
    onChange: createUpdateFilterGroup,
    openStaticModal,
  };

  const label = getFilterLabel(filter);
  const forceModal =
    filter.type === FilterContentTypes.SiteCatalogFilterList &&
    filter.presentationStyle ===
      SiteCatalogFilterListPresentationStyleEnum.Large;
  const actionBar = hasActionBar
    ? {
        isDisabled: isPreviewLoading,
        onClickPrimary: applyFilters,
        onClickSecondary: createResetFiltersHandler(filter),
        primaryLabel: isPreviewLoading ? (
          <Loading theme={THEME.DARK} />
        ) : (
          ui('catalog.filters.viewResults', { number: totalMatches })
        ),
        secondaryLabel: ui('catalog.filters.reset'),
      }
    : null;

  return (
    <Dropdown
      shouldActivateListeners={!isModalOpen}
      actionBar={actionBar}
      contentLabel={label}
      forceModal={forceModal}
      insideCarousel
      isOpen={isOpen}
      onClose={onClose}
    >
      {mapTypeToContent[filter.type](childProps)}
    </Dropdown>
  );
}
