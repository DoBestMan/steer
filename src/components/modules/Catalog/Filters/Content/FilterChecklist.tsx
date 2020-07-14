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
import FilterHeader from './FilterHeader';

interface GroupProps {
  filtersToApply: Record<string, string>;
  group: SiteCatalogFilterGroup;
  handleChange: (
    value: Record<string, string>,
    overwrite?: boolean,
  ) => () => void;
  isPreviewLoading: boolean;
}
const mapGroupTypeToInput: Record<
  SiteCatalogFilterGroupGroupTypeEnum,
  (props: GroupProps) => JSX.Element[]
> = {
  [SiteCatalogFilterGroupGroupTypeEnum.Checklist]({
    filtersToApply,
    group,
    handleChange,
    isPreviewLoading,
  }: GroupProps) {
    return group.items.map((item, idx) => (
      <div css={styles.container} key={idx}>
        <TitleCheckbox
          label={item.title}
          description={item.description}
          count={item.count}
          flair={item.flair}
          isDisabled={
            item.state === SiteCatalogFilterItemStateEnum.Disabled ||
            isPreviewLoading
          }
          handleChange={handleChange(item.value)}
          defaultChecked={hasActiveValue(item, filtersToApply)}
        />
      </div>
    ));
  },
  [SiteCatalogFilterGroupGroupTypeEnum.Radio]({
    filtersToApply,
    group,
    handleChange,
    isPreviewLoading,
  }: GroupProps) {
    return group.items.map((item, idx) => (
      <div css={styles.container} key={idx}>
        <TitleRadio
          name={`group-${idx}`}
          label={item.title}
          description={item.description}
          count={item.count}
          flair={item.flair}
          isDisabled={
            item.state === SiteCatalogFilterItemStateEnum.Disabled ||
            isPreviewLoading
          }
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
  isLarge,
  isPreviewLoading,
  onChange,
  openStaticModal,
  presentationStyle,
}: SiteCatalogFilterList &
  Pick<
    ChildProps,
    | 'isPreviewLoading'
    | 'isLarge'
    | 'onChange'
    | 'filtersToApply'
    | 'openStaticModal'
  >) {
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
      <FilterHeader
        headerStyles={[styles.header, styles.labelContainer]}
        header={header}
        title={<h2 css={lgStyles.title}>{header?.title}</h2>}
        isLarge={isLarge}
        openStaticModal={openStaticModal}
      />
      {filterGroups?.map((group: SiteCatalogFilterGroup, idx) => (
        <div css={lgStyles.group} key={idx}>
          <FilterHeader
            headerStyles={styles.labelContainer}
            header={group.header}
            title={<h3 css={lgStyles.groupTitle}>{group.header?.title}</h3>}
            isGroupHeader
            isLarge={isLarge}
            openStaticModal={openStaticModal}
          />
          {mapGroupTypeToInput[group.groupType]({
            group,
            handleChange,
            filtersToApply,
            isPreviewLoading,
          })}
        </div>
      ))}
    </div>
  );
}
