import Checkbox from '~/components/global/Checkbox/Checkbox';
import { ui } from '~/lib/utils/ui-dictionary';

import { CatalogFilterPopular } from '../Filter.types';
import { ChildProps } from '../Popup/FilterPopup.utils';
import styles from './FilterChecklist.styles';

export default function FilterPopular({
  filtersToApply,
  items,
  label,
  onChange,
}: CatalogFilterPopular & Pick<ChildProps, 'onChange' | 'filtersToApply'>) {
  const popularFilters = filtersToApply[ui('catalog.filters.popularFilters')];
  function handleChange(id: string) {
    return (value: boolean) => onChange({ group: label, id, value })();
  }

  return (
    <div css={styles.root}>
      <div css={styles.group}>
        {items.map(({ label }, idx) => (
          <div css={styles.container} key={idx}>
            <Checkbox
              onChange={handleChange(label)}
              defaultChecked={!!(popularFilters && popularFilters[label])}
            >
              <span css={styles.checkboxLabel}>
                <span css={styles.containerLabel}>
                  <p css={styles.label}>{label}</p>
                </span>
              </span>
            </Checkbox>
          </div>
        ))}
      </div>
    </div>
  );
}
