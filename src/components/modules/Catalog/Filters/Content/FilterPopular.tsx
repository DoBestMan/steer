import TitleCheckbox from '~/components/global/Checkbox/TitleCheckbox';

import { SiteCatalogFilterPopular } from '../Filter.types';
import { hasActiveValue } from '../Filters.utils';
import { ChildProps } from '../Popup/FilterPopup.utils';
import styles from './FilterChecklist.styles';

export default function FilterPopular({
  filtersToApply,
  isPreviewLoading,
  items,
  onChange,
}: SiteCatalogFilterPopular &
  Pick<ChildProps, 'isPreviewLoading' | 'onChange' | 'filtersToApply'>) {
  function handleChange(value: Record<string, string>) {
    return onChange({ value });
  }

  return (
    <div css={styles.root}>
      <div css={styles.group}>
        {items.map((filter, idx) => {
          if (!('item' in filter)) {
            return null;
          }
          return (
            <div css={styles.container} key={idx}>
              <TitleCheckbox
                isDisabled={isPreviewLoading}
                label={filter.item.title}
                handleChange={handleChange(filter.item.value)}
                defaultChecked={hasActiveValue(filter.item, filtersToApply)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
