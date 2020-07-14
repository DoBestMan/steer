import TitleRadio from '~/components/global/Radio/TitleRadio';
import TitleSelectorLabel from '~/components/global/TitleSelectorLabel/TitleSelectorLabel';
import { ui } from '~/lib/utils/ui-dictionary';

import { SiteCatalogFilterSort } from '../Filter.types';
import { useFiltersContext } from '../Filters.context';
import { strictEqualsValue } from '../Filters.utils';
import { ChildProps } from '../Popup/FilterPopup.utils';
import styles from './FilterSort.styles';

export default function FilterSort({
  filtersToApply,
  isLarge,
  items,
}: SiteCatalogFilterSort & Pick<ChildProps, 'filtersToApply' | 'isLarge'>) {
  const {
    createToggleFilterHandler,
    clearSelectingFilter,
  } = useFiltersContext();
  function updateValue(value: Record<string, string>) {
    return () => {
      createToggleFilterHandler(value)();
      clearSelectingFilter();
    };
  }

  return (
    <div>
      <h3 css={styles.title}>{ui('catalog.filters.sortBy')}</h3>
      <ul>
        {items.map(({ title, description, value }, idx) => {
          const onUpdate = updateValue(value);
          const isSelected = strictEqualsValue(value, filtersToApply);
          return (
            <li css={styles.listItem} key={idx}>
              {isLarge ? (
                <button onClick={onUpdate} css={isSelected && styles.selected}>
                  <TitleSelectorLabel description={description} label={title} />
                </button>
              ) : (
                <TitleRadio
                  name="sort"
                  onChange={onUpdate}
                  value={title}
                  description={description}
                  label={title}
                  activeValue={isSelected ? title : undefined}
                  css={styles.radio}
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
