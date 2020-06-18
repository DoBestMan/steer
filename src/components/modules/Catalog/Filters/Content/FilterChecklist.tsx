import Checkbox from '~/components/global/Checkbox/Checkbox';
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
  filtersToApply,
  label,
  onChange,
  tooltip,
  type,
}: (CatalogFilterChecklist | CatalogFilterChecklistLarge) &
  Pick<ChildProps, 'onChange' | 'filtersToApply'>) {
  const { greaterThan } = useBreakpoints();
  const filterGroup = filtersToApply[label];
  const lgStyles =
    greaterThan.M && type === FilterContentTypes.CatalogFilterChecklistLarge
      ? largeStyles
      : styles;

  function handleChange(id: string) {
    return (value: boolean) => onChange({ group: label, id, value })();
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
          {items.map(({ count, description, id, isSelected, flair, title }) => (
            <div css={styles.container} key={id}>
              <Checkbox
                onChange={handleChange(id)}
                defaultChecked={filterGroup ? !!filterGroup[id] : isSelected}
              >
                <span css={styles.checkboxLabel}>
                  <span css={styles.containerLabel}>
                    <p css={lgStyles.label}>{title}</p>
                    <p css={styles.count}>({count})</p>
                    {flair && <p css={styles.flair}>{flair}</p>}
                  </span>
                  <p css={styles.description}>{description}</p>
                </span>
              </Checkbox>
            </div>
          ))}
        </div>
      ))}
      {greaterThan.M && tooltip && <p css={styles.tooltip}>{tooltip}</p>}
    </div>
  );
}
