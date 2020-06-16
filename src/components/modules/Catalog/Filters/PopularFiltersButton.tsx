import { useTheme } from 'emotion-theming';

import FilterButton from '~/components/global/Button/FilterButton';
import { ui } from '~/lib/utils/ui-dictionary';

import { CatalogFilterTypes, FilterContentTypes } from './Filter.types';
import { FiltersContextProps } from './Filters.context';
import styles from './Filters.styles';
import FilterPopup from './Popup/FilterPopup';

interface Props
  extends Pick<FiltersContextProps, 'activeFilters' | 'selectingFilter'> {
  filters: CatalogFilterTypes[];
  onClose: FiltersContextProps['clearSelectingFilter'];
  onOpen: FiltersContextProps['createOpenFilterHandler'];
}

export default function PopularFilters({
  activeFilters,
  filters,
  onClose,
  onOpen,
  selectingFilter,
}: Props) {
  const { header } = useTheme();
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
      theme={header.buttonTheme}
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
