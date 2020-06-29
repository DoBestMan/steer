import TitleCheckbox from '~/components/global/Checkbox/TitleCheckbox';
import { CatalogFilterPopular } from '~/components/modules/Catalog/Filters/Filter.types';
import { ChildProps } from '~/components/modules/Catalog/Filters/Popup/FilterPopup.utils';

import styles from './FilterChecklist.styles';

export default function FilterPopular({
  items,
  label,
  onChange,
}: CatalogFilterPopular & Pick<ChildProps, 'onChange' | 'filtersToApply'>) {
  function handleChange(id: string) {
    return (value: boolean) => onChange({ group: label, id, value })();
  }

  return (
    <div css={styles.root}>
      <div css={styles.group}>
        {items.map(({ label }, idx) => (
          <div css={styles.container} key={idx}>
            <TitleCheckbox label={label} handleChange={handleChange('')} />
          </div>
        ))}
      </div>
    </div>
  );
}
