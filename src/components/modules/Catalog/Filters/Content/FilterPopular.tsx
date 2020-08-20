import { FilterContentTypes, SiteCatalogFilterPopular } from '../Filter.types';
import { ChildProps } from '../Popup/FilterPopup.utils';
import FilterCheckbox from './FilterCheckbox';
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
          if (filter.type !== FilterContentTypes.SiteCatalogFilterToggle) {
            return null;
          }
          return (
            <div css={styles.container} key={idx}>
              <FilterCheckbox
                filtersToApply={filtersToApply}
                isLoading={isPreviewLoading}
                item={filter.item}
                handleChange={handleChange(filter.item.value)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
