import TitleCheckbox from '~/components/global/Checkbox/TitleCheckbox';
import TitleRadio from '~/components/global/Radio/TitleRadio';
import {
  SiteCatalogFilterGroup,
  SiteCatalogFilterGroupGroupTypeEnum,
} from '~/data/models/SiteCatalogFilterGroup';
import { SiteCatalogFilterItemStateEnum } from '~/data/models/SiteCatalogFilterItem';
import {
  SiteCatalogFilterList,
  SiteCatalogFilterListPresentationStyleEnum,
} from '~/data/models/SiteCatalogFilterList';
import { useBreakpoints } from '~/hooks/useBreakpoints';

import { hasActiveValue, strictEqualsValue } from '../Filters.utils';
import { ChildProps } from '../Popup/FilterPopup.utils';
import styles from './FilterChecklist.styles';
import largeStyles from './FilterChecklistLarge.styles';

interface GroupProps {
  filtersToApply: Record<string, string>;
  group: SiteCatalogFilterGroup;
  handleChange: (
    value: Record<string, string>,
    overwrite?: boolean,
  ) => () => void;
}
const mapGroupTypeToInput: Record<
  SiteCatalogFilterGroupGroupTypeEnum,
  (props: GroupProps) => JSX.Element[]
> = {
  [SiteCatalogFilterGroupGroupTypeEnum.Checklist]({
    group,
    filtersToApply,
    handleChange,
  }: GroupProps) {
    return group.items.map((item, idx) => (
      <div css={styles.container} key={idx}>
        <TitleCheckbox
          key={idx}
          label={item.title}
          description={item.description}
          count={item.count}
          flair={item.flair}
          isDisabled={item.state === SiteCatalogFilterItemStateEnum.Disabled}
          handleChange={handleChange(item.value)}
          defaultChecked={hasActiveValue(item, filtersToApply)}
        />
      </div>
    ));
  },
  [SiteCatalogFilterGroupGroupTypeEnum.Radio]({
    group,
    handleChange,
    filtersToApply,
  }: GroupProps) {
    return group.items.map((item, idx) => (
      <div css={styles.container} key={idx}>
        <TitleRadio
          name={`group-${idx}`}
          key={idx}
          label={item.title}
          description={item.description}
          count={item.count}
          flair={item.flair}
          isDisabled={item.state === SiteCatalogFilterItemStateEnum.Disabled}
          onChange={handleChange(item.value, true)}
          value={item.title}
          activeValue={
            strictEqualsValue(item.value, filtersToApply)
              ? item.title
              : undefined
          }
        />
      </div>
    ));
  },
};

export default function FilterChecklist({
  filterGroups,
  filtersToApply,
  header,
  onChange,
  presentationStyle,
}: SiteCatalogFilterList & Pick<ChildProps, 'onChange' | 'filtersToApply'>) {
  const label = header?.title;
  const { greaterThan } = useBreakpoints();
  const lgStyles =
    greaterThan.M &&
    presentationStyle === SiteCatalogFilterListPresentationStyleEnum.Large
      ? largeStyles
      : styles;

  function handleChange(value: Record<string, string>, overwrite?: boolean) {
    return onChange({ value, overwrite });
  }

  return (
    <div css={styles.root}>
      <div css={[styles.header, styles.labelContainer]}>
        <h2 css={lgStyles.title}>{label}</h2>
        {header?.infoLink && (
          <p css={[styles.infoLink, styles.infoLinkTitle]}>
            {header.infoLink.label}
          </p>
        )}
      </div>
      {filterGroups?.map((group: SiteCatalogFilterGroup, idx) => (
        <div css={lgStyles.group} key={idx}>
          {group.header && (
            <div css={styles.labelContainer}>
              <h3 css={lgStyles.groupTitle}>{group.header.title}</h3>
              {group.header.infoLink && (
                <p css={styles.infoLink}>{group.header.infoLink.label}</p>
              )}
            </div>
          )}
          {mapGroupTypeToInput[group.groupType]({
            group,
            handleChange,
            filtersToApply,
          })}
        </div>
      ))}
    </div>
  );
}
