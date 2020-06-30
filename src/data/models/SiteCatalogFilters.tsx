export interface SiteCatalogFilters {
  filtersList: Array<SiteCatalogFilter>;
  sortList: Array<SiteCatalogSortListItem>;
  totalMatches: number;
}

export type SiteCatalogFilter =
  | SiteCatalogFilterList
  | SiteCatalogFilterRange
  | SiteCatalogFilterToggle;

export enum SiteCatalogFilterTypeEnum {
  SiteCatalogFilterList = 'SiteCatalogFilterList',
  SiteCatalogFilterRange = 'SiteCatalogFilterRange',
  SiteCatalogFilterToggle = 'SiteCatalogFilterToggle',
}

export interface SiteCatalogFilterHeader {
  title: string;
  tooltip: SiteCatalogFilterHeaderTooltip | null;
}

export interface SiteCatalogFilterHeaderTooltip {
  contentId: string;
  label: string;
}

export interface SiteCatalogFilterItem {
  count?: number;
  description: string | null;
  flair: string | null;
  state: SiteCatalogFilterState;
  title: string;
  value: Record<string, string>;
}

export enum SiteCatalogFilterState {
  Disabled = 'Disabled',
  Normal = 'Normal',
  Selected = 'Selected',
}

/* list */
export interface SiteCatalogFilterList {
  filterGroups: Array<SiteCatalogFilterGroup>;
  header: SiteCatalogFilterHeader | null;
  presentationStyle: SiteCatalogFilterListStyle;
  type: SiteCatalogFilterTypeEnum.SiteCatalogFilterList;
}

export enum SiteCatalogFilterListStyle {
  Large = 'Large',
  Normal = 'Normal',
}

export interface SiteCatalogFilterGroup {
  groupType: SiteCatalogFilterGroupType;
  header: SiteCatalogFilterHeader | null;
  items: Array<SiteCatalogFilterItem>;
}

export enum SiteCatalogFilterGroupType {
  Checklist = 'Checklist',
  Radio = 'Radio',
}

/* range */
export interface SiteCatalogFilterRange {
  currentMaxValue: number | null;
  currentMinValue: number | null;
  header: SiteCatalogFilterHeader | null;
  id: string;
  maxValue: number;
  minValue: number;
  step: number;
  type: SiteCatalogFilterTypeEnum.SiteCatalogFilterRange;
  unit: SiteCatalogFilterRangeUnitEnum;
}

export enum SiteCatalogFilterRangeUnitEnum {
  UnitMiles = 'UnitMiles',
  UnitUSD = 'UnitUSD',
}

/* toggle */
export interface SiteCatalogFilterToggle {
  item: SiteCatalogFilterItem;
  type: SiteCatalogFilterTypeEnum.SiteCatalogFilterToggle;
}

/* sort-list */
export interface SiteCatalogSortListItem {
  description: string | null;
  state: SiteCatalogFilterState;
  title: string;
  value: Record<string, string>;
}
