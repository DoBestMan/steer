import { CatalogFilterTypes, FilterContentTypes } from '../Filter.types';
import { useFiltersContext } from '../Filters.context';
import FilterDropdown from './Dropdown';
import FilterModal from './FilterModal';
import useFilterPopup from './FilterPopup.hooks';
import { mapTypeToContent } from './FilterPopup.utils';

interface Props {
  filter: CatalogFilterTypes;
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterPopup({ filter, ...props }: Props) {
  const { createApplyFiltersHandler } = useFiltersContext();
  const hasActionBar = filter.type !== FilterContentTypes.CatalogFilterSort;
  const { createResetFiltersHandler, ...childProps } = useFilterPopup({
    createApplyFiltersHandler,
  });

  if (filter.type === FilterContentTypes.CatalogFilterToggle) {
    return null;
  }

  if (
    filter.type !== FilterContentTypes.CatalogFilterChecklistLarge &&
    childProps.isLarge
  ) {
    return (
      <FilterDropdown
        hasActionBar={hasActionBar}
        onApplyFilters={childProps.applyFilter}
        onResetFilters={createResetFiltersHandler(filter.label)}
        {...props}
      >
        {mapTypeToContent[filter.type]({ filter, ...childProps })}
      </FilterDropdown>
    );
  }

  return (
    <FilterModal
      hasActionBar={hasActionBar}
      onApplyFilters={childProps.applyFilter}
      onResetFilters={createResetFiltersHandler(filter.label)}
      contentLabel={filter.label}
      {...props}
    >
      {mapTypeToContent[filter.type]({ filter, ...childProps })}
    </FilterModal>
  );
}
