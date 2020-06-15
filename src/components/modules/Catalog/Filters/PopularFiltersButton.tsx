import FilterButton from '~/components/global/Button/FilterButton';
import { BUTTON_THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import { CatalogFilterTypes, FilterContentTypes } from './Filter.types';
import { FiltersContextProps } from './Filters.context';
import styles from './Filters.styles';
import FilterPopup from './Popup/FilterPopup';

interface Props
  extends Pick<FiltersContextProps, 'activeFilters' | 'selectingFilter'> {
  filters: CatalogFilterTypes[];
  isAdvancedView?: boolean;
  onClose: FiltersContextProps['clearSelectingFilter'];
  onOpen: FiltersContextProps['createOpenFilterHandler'];
}

export default function PopularFilters({
  activeFilters,
  filters,
  isAdvancedView,
  onClose,
  onOpen,
  selectingFilter,
}: Props) {
  const label = ui('catalog.filters.popularFilters');
  return (
    <FilterButton
      css={styles.button}
      label={label}
      isDropdownOpen={label === selectingFilter}
      isActive={
        !!(activeFilters[label] && Object.keys(activeFilters[label]).length)
      }
      onClick={onOpen(label)}
      theme={isAdvancedView ? BUTTON_THEME.DARK : BUTTON_THEME.ORANGE}
      aria-expanded={label === selectingFilter}
    >
      <FilterPopup
        isOpen={label === selectingFilter}
        onClose={onClose}
        filter={{
          label,
          type: FilterContentTypes.CatalogFilterPopular,
          items: filters,
        }}
      />
    </FilterButton>
  );
}
