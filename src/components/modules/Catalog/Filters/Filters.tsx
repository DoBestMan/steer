import FilterButton from '~/components/global/Button/FilterButton';
import FilterButtonToggle from '~/components/global/Button/FilterButtonToggle';
import { BUTTON_THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import hStyles from '../Header.styles';
import { FilterContentTypes } from './Filter.types';
import { FiltersContextProps } from './Filters.context';
import mockFilters from './Filters.mocks';
import styles from './Filters.styles';
import FilterPopup from './Popup/FilterPopup';

interface Props extends Pick<FiltersContextProps, 'createToggleFilterHandler'> {
  activeFilters: FiltersContextProps['activeFilters'];
  createToggleFilterHandler: FiltersContextProps['createToggleFilterHandler'];
  isAdvancedView?: boolean;
  onClose: FiltersContextProps['clearSelectingFilter'];
  onOpen: FiltersContextProps['createOpenFilterHandler'];
  selectingFilter: FiltersContextProps['selectingFilter'];
}

export default function Filters({
  activeFilters,
  createToggleFilterHandler,
  isAdvancedView,
  onClose,
  onOpen,
  selectingFilter,
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
            const isActive = !!activeFilters[label];
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
                  filter={{ ...filter, label }}
                />
              </FilterButton>
            ) : (
              <FilterButtonToggle
                css={styles.button}
                key={label}
                isActive={isActive}
                onClick={createToggleFilterHandler(label, !isActive)}
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
