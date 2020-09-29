import { CatalogFilterTypes, FilterContentTypes } from './Filter.types';
import { POPULAR_ID } from './FilterButtonsCarousel';
import { useFiltersContext } from './Filters.context';
import FilterPopup from './Popup/FilterPopup';

interface Props {
  filters: CatalogFilterTypes[];
  popularFilters: CatalogFilterTypes[];
}

export default function FilterPopups({ filters, popularFilters }: Props) {
  const { clearSelectingFilter, selectingFilter } = useFiltersContext();

  return (
    <>
      {!!popularFilters.length && (
        <FilterPopup
          isOpen={selectingFilter === POPULAR_ID}
          onClose={clearSelectingFilter}
          filter={{
            type: FilterContentTypes.SiteCatalogFilterPopular,
            items: popularFilters,
          }}
        />
      )}
      {filters.map((filter, idx) => {
        if (
          filter.type === FilterContentTypes.SiteCatalogFilterToggle ||
          filter.type === FilterContentTypes.SiteCatalogFilterPopular
        ) {
          return null;
        }
        return (
          <FilterPopup
            key={idx}
            isOpen={selectingFilter === idx + 1}
            onClose={clearSelectingFilter}
            filter={filter}
          />
        );
      })}
    </>
  );
}
