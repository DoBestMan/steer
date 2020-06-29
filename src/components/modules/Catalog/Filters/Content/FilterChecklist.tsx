import TitleCheckbox from '~/components/global/Checkbox/TitleCheckbox';
import { useBreakpoints } from '~/hooks/useBreakpoints';

import {
  CatalogFilterChecklist,
  CatalogFilterChecklistLarge,
  FilterContentTypes,
} from '../Filter.types';
import { ChildProps } from '../Popup/FilterPopup.utils';
import styles from './FilterChecklist.styles';
import largeStyles from './FilterChecklistLarge.styles';

export default function FilterChecklist({
  filterGroups,
  label,
  onChange,
  tooltip,
  type,
}: (CatalogFilterChecklist | CatalogFilterChecklistLarge) &
  Pick<ChildProps, 'onChange' | 'filtersToApply'>) {
  const { greaterThan } = useBreakpoints();
  const lgStyles =
    greaterThan.M && type === FilterContentTypes.CatalogFilterChecklistLarge
      ? largeStyles
      : styles;

  function handleChange(id: string) {
    return () => onChange({ group: label, id, value: '' })();
  }
  return (
    <div css={styles.root}>
      <div css={styles.labelContainer}>
        <h2 css={lgStyles.title}>{label}</h2>
        {!greaterThan.M && tooltip && <p css={styles.tooltip}>{tooltip}</p>}
      </div>
      {filterGroups?.map(({ id, items, title }) => (
        <div css={lgStyles.group} key={id}>
          <h3 css={lgStyles.groupTitle}>{title}</h3>
          {items.map(({ count, description, id, flair, title }) => (
            <div css={styles.container} key={id}>
              <TitleCheckbox
                label={title}
                description={description}
                count={count}
                flair={flair}
                handleChange={handleChange('')}
              />
            </div>
          ))}
        </div>
      ))}
      {greaterThan.M && tooltip && <p css={styles.tooltip}>{tooltip}</p>}
    </div>
  );
}
