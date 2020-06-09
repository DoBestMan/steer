import FilterButton from '~/components/global/Button/FilterButton';
import FilterButtonToggle from '~/components/global/Button/FilterButtonToggle';
import { BUTTON_THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import hStyles from '../Header.styles';
import { FilterContentTypes } from './Filter.types';
import mockFilters from './Filters.mocks';
import styles from './Filters.styles';
import FilterPopup from './Popup/FilterPopup';

interface Props {
  activeFilters: string[];
  isAdvancedView?: boolean;
  onClose: () => void;
  onOpen: (filter: string) => () => void;
  selectingFilter: string;
  toggleFilter: (filter: string) => () => void;
}

export default function Filters({
  activeFilters,
  isAdvancedView,
  selectingFilter,
  toggleFilter,
  onOpen,
  onClose,
}: Props) {
  return (
    <>
      <p css={[styles.filterLabel, isAdvancedView && hStyles.textAdvanced]}>
        {ui('catalog.header.filterLabel')}:
      </p>
      <div
        css={[styles.listContainer, selectingFilter && styles.disableScroll]}
      >
        <div css={styles.filterList}>
          {mockFilters.map(({ label, ...filter }) => {
            const isActive = activeFilters.includes(label);
            return filter.type !== FilterContentTypes.CatalogFilterToggle ? (
              // filter with dropdown
              <FilterButton
                css={styles.button}
                key={label}
                label={label}
                isDropdownOpen={label === selectingFilter}
                isActive={isActive}
                onClick={onOpen(label)}
                theme={isAdvancedView ? BUTTON_THEME.DARK : BUTTON_THEME.ORANGE}
                aria-expanded={label === selectingFilter}
              >
                <FilterPopup
                  isOpen={label === selectingFilter}
                  onClose={onClose}
                  onSelectFilter={toggleFilter(label)}
                  filter={{ ...filter, label }}
                />
              </FilterButton>
            ) : (
              <FilterButtonToggle
                css={styles.button}
                key={label}
                isActive={isActive}
                onClick={toggleFilter(label)}
                theme={isAdvancedView ? BUTTON_THEME.DARK : BUTTON_THEME.ORANGE}
              >
                {label}
              </FilterButtonToggle>
            );
          })}
        </div>
      </div>
    </>
  );
}
