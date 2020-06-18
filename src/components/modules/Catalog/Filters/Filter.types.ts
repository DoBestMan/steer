export enum FilterContentTypes {
  CatalogFilterChecklist = 'CatalogFilterChecklist',
  CatalogFilterChecklistLarge = 'CatalogFilterChecklistLarge',
  CatalogFilterPopular = 'CatalogFilterPopular',
  CatalogFilterRange = 'CatalogFilterRange',
  CatalogFilterSort = 'CatalogFilterSort',
  CatalogFilterToggle = 'CatalogFilterToggle',
}

interface FilterGroup {
  id: string;
  items: FilterGroupItem[];
  title: string | null;
}

interface FilterGroupItem {
  count: number;
  description: string | null;
  flair: string | null;
  id: string;
  isSelected: boolean;
  title: string;
}

interface FilterSortItem {
  description: string | null;
  flair: string | null;
  id: string;
  title: string;
}

export interface CatalogFilterChecklist {
  filterGroups: FilterGroup[];
  label: string;
  tooltip: string | null;
  type: FilterContentTypes.CatalogFilterChecklist;
}

export interface CatalogFilterChecklistLarge {
  filterGroups: FilterGroup[];
  label: string;
  tooltip: string | null;
  type: FilterContentTypes.CatalogFilterChecklistLarge;
}

export interface CatalogFilterRange {
  currentMax: number | null;
  currentMin: number | null;
  id: string;
  label: string;
  maxValue: number;
  minValue: number;
  step: number;
  type: FilterContentTypes.CatalogFilterRange;
  unit: string;
}

export interface CatalogFilterSort {
  id: string;
  items: FilterSortItem[];
  label: string;
  type: FilterContentTypes.CatalogFilterSort;
}

export interface CatalogFilterToggle {
  label: string;
  type: FilterContentTypes.CatalogFilterToggle;
}

export type CatalogFilterPopular = {
  items: CatalogFilterTypes[];
  label: string;
  type: FilterContentTypes.CatalogFilterPopular;
};

export type CatalogFilterTypes =
  | CatalogFilterChecklist
  | CatalogFilterChecklistLarge
  | CatalogFilterRange
  | CatalogFilterToggle
  | CatalogFilterSort
  | CatalogFilterPopular;
